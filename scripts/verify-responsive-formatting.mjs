import puppeteer from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function startDistServer(port = 4175) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(path.resolve('dist'), req.url.split('?')[0]);
    if (req.url === '/' || !path.extname(filePath)) {
      filePath = path.join(path.resolve('dist'), 'index.html');
    }

    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  return new Promise(resolve => server.listen(port, () => resolve(server)));
}

async function verifyResponsiveFormatting() {
  console.log('=== STARTING RESPONSIVE FORMATTING & ALIGNMENT AUDIT ===');
  const server = await startDistServer(4175);
  console.log('Serving production dist on http://localhost:4175/');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✔ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] ${message}`);
      failed++;
    }
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: 8 });
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, options) {
      return getContext.call(
        this,
        type,
        type === 'webgl' ? { ...options, preserveDrawingBuffer: true } : options
      );
    };
  });

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900, isMobile: false },
    { name: 'Laptop', width: 1024, height: 900, isMobile: false },
    { name: 'Tablet', width: 768, height: 1024, isMobile: false },
    { name: 'Mobile', width: 375, height: 812, isMobile: true }
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing ${vp.name} (${vp.width}x${vp.height}) ---`);
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
    await page.goto('http://localhost:4175/', { waitUntil: 'networkidle2' });

    const waterLayer = await page.evaluate(() => {
      const canvas = document.querySelector('.water-distortion-canvas');
      if (!(canvas instanceof HTMLCanvasElement)) return null;
      return {
        mode: canvas.dataset.effect,
        pointerEvents: window.getComputedStyle(canvas).pointerEvents,
        position: window.getComputedStyle(canvas).position,
        zIndex: window.getComputedStyle(canvas).zIndex,
        ariaHidden: canvas.getAttribute('aria-hidden')
      };
    });
    assert(
      waterLayer !== null && waterLayer.pointerEvents === 'none' &&
        waterLayer.ariaHidden === 'true' && waterLayer.position === 'fixed' &&
        waterLayer.zIndex === '0',
      `${vp.name}: Full-screen water background stays beneath content and never blocks interaction`
    );
    const skillSizing = await page.evaluate(() => {
      const section = document.querySelector('#skills');
      if (!section) return null;
      const technologyCard = section.querySelector('.animate-marquee > div');
      const technologyName = technologyCard?.querySelector('span');
      const technologyCategory = technologyCard?.querySelectorAll('span')[1];
      const technologyIcon = technologyCard?.querySelector('svg');
      const categoryCards = Array.from(section.querySelectorAll(':scope > div > .grid > div'));
      const featuredCard = categoryCards[0];
      const categoryHeading = featuredCard?.querySelector('h3');
      const skillTag = featuredCard?.querySelector('span');
      const cardRect = technologyCard?.getBoundingClientRect();
      const iconRect = technologyIcon?.getBoundingClientRect();
      return {
        technologyCard: cardRect ? [cardRect.width, cardRect.height] : null,
        icon: iconRect ? [iconRect.width, iconRect.height] : null,
        nameFont: technologyName ? parseFloat(getComputedStyle(technologyName).fontSize) : null,
        categoryFont: technologyCategory ? parseFloat(getComputedStyle(technologyCategory).fontSize) : null,
        categoryTitleFont: categoryHeading ? parseFloat(getComputedStyle(categoryHeading).fontSize) : null,
        categoryCardHeights: categoryCards.slice(0, 3).map(card => card.getBoundingClientRect().height),
        tagFont: skillTag ? parseFloat(getComputedStyle(skillTag).fontSize) : null
      };
    });
    assert(
      skillSizing?.technologyCard?.[0] >= 190 && skillSizing.technologyCard[1] >= 154,
      `${vp.name}: Technology cards render at spacious, full component dimensions`
    );
    assert(
      skillSizing?.icon?.[0] >= 28 && skillSizing.icon[0] <= 34 &&
        skillSizing.icon[1] >= 28 && skillSizing.icon[1] <= 34,
      `${vp.name}: Technology icons render between 28px and 34px`
    );
    assert(
      skillSizing?.nameFont >= 16 && skillSizing.nameFont <= 18 &&
        skillSizing.categoryFont >= 13 && skillSizing.categoryFont <= 14,
      `${vp.name}: Technology names and category labels use the requested type scale`
    );
    assert(
      skillSizing?.categoryTitleFont >= 18 &&
        skillSizing.categoryCardHeights.length === 3 &&
        skillSizing.categoryCardHeights.every(height => height >= 260) &&
        skillSizing.tagFont >= 13,
      `${vp.name}: Featured skill categories and technology tags have room to read`
    );
    if (vp.width < 768) {
      assert(waterLayer?.mode === 'fallback', `${vp.name}: Low-power/mobile viewport uses the CSS fallback`);
    } else {
      assert(
        waterLayer?.mode === 'webgl' || waterLayer?.mode === 'fallback',
        `${vp.name}: WebGL initialized or a graceful fallback is active`
      );
    }
    if (vp.name === 'Desktop') {
      const firstFrame = await page.evaluate(() => {
        const canvas = document.querySelector('.water-distortion-canvas');
        if (!(canvas instanceof HTMLCanvasElement)) return null;
        const gl = canvas.getContext('webgl');
        if (!gl || canvas.dataset.effect !== 'webgl') return null;
        const program = gl.getParameter(gl.CURRENT_PROGRAM);
        return gl.getUniform(program, gl.getUniformLocation(program, 'uTime'));
      });
      await new Promise(resolve => setTimeout(resolve, 180));
      const stationaryFrame = await page.evaluate(() => {
        const canvas = document.querySelector('.water-distortion-canvas');
        const gl = canvas?.getContext('webgl');
        if (!gl || canvas.dataset.effect !== 'webgl') return null;
        const program = gl.getParameter(gl.CURRENT_PROGRAM);
        return gl.getUniform(program, gl.getUniformLocation(program, 'uTime'));
      });
      const causticPixels = await page.evaluate(() => {
        const canvas = document.querySelector('.water-distortion-canvas');
        const gl = canvas?.getContext('webgl');
        if (!gl || canvas.dataset.effect !== 'webgl') return null;
        const pixel = new Uint8Array(4);
        const samples = [];
        for (let y = 80; y < canvas.height; y += Math.max(1, Math.floor(canvas.height / 8))) {
          for (let x = 0; x < canvas.width; x += Math.max(1, Math.floor(canvas.width / 8))) {
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
            samples.push(Array.from(pixel.slice(0, 3)));
          }
        }
        const luminances = samples.map(([red, green, blue]) => red * 0.2126 + green * 0.7152 + blue * 0.0722);
        return Math.max(...luminances) - Math.min(...luminances);
      });
      assert(
        typeof firstFrame === 'number' && typeof stationaryFrame === 'number' &&
          stationaryFrame > firstFrame,
        'Desktop: Underwater shader continuously animates while the mouse is stationary'
      );
      assert(
        typeof causticPixels === 'number' && causticPixels > 20,
        'Desktop: Shader paints varying water light and caustics across the full canvas'
      );

      await page.mouse.move(vp.width / 2, vp.height / 2);
      await new Promise(resolve => setTimeout(resolve, 80));
      await page.mouse.move(vp.width / 2 + 60, vp.height / 2 + 30);
      await new Promise(resolve => setTimeout(resolve, 120));
      const rippleResult = await page.evaluate(() => {
        const canvas = document.querySelector('.water-distortion-canvas');
        if (!(canvas instanceof HTMLCanvasElement)) return null;
        const gl = canvas.getContext('webgl');
        if (!gl || canvas.dataset.effect !== 'webgl') {
          return { mode: canvas.dataset.effect };
        }

        const program = gl.getParameter(gl.CURRENT_PROGRAM);
        const rippleTimes = Array.from({ length: 4 }, (_, index) => {
          const ripple = gl.getUniform(program, gl.getUniformLocation(program, `uRipples[${index}]`));
          return ripple[2];
        });
        return {
          mode: canvas.dataset.effect,
          time: gl.getUniform(program, gl.getUniformLocation(program, 'uTime')),
          latestRippleTime: Math.max(...rippleTimes),
          error: gl.getError()
        };
      });
      console.log(`Desktop water renderer: ${rippleResult?.mode}`);
      assert(
        rippleResult?.mode === 'webgl' &&
          rippleResult.error === 0 &&
          rippleResult.latestRippleTime > 0 &&
          rippleResult.time - rippleResult.latestRippleTime < 2.8,
        'Desktop: Mouse movement adds a fresh wave into the continuously animated water'
      );
    }

    // 1. Check for horizontal overflow (must be 0 horizontal scroll)
    const hasHorizontalOverflow = await page.evaluate((expectedWidth) => {
      const docWidth = document.documentElement.scrollWidth;
      const bodyWidth = document.body.scrollWidth;
      return (docWidth > expectedWidth + 1) || (bodyWidth > expectedWidth + 1);
    }, vp.width);
    assert(!hasHorizontalOverflow, `${vp.name}: Zero horizontal overflow detected (document width fits within ${vp.width}px)`);

    // 2. Verify all sections rendered and properly bounded
    const sectionIds = ['home', 'skills', 'about', 'projects', 'services', 'education', 'competitive', 'resume', 'contact'];
    for (const id of sectionIds) {
      const sectionBounds = await page.evaluate((secId) => {
        const el = document.getElementById(secId);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { width: rect.width, left: rect.left };
      }, id);
      assert(sectionBounds !== null && sectionBounds.width <= vp.width + 1, `${vp.name}: Section #${id} fits within screen width`);
    }

    // 3. Verify Profile Photo dimensions and aspect ratio
    const imgData = await page.evaluate(() => {
      const img = document.querySelector('#home img');
      if (!img) return null;
      return {
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderedWidth: img.clientWidth,
        renderedHeight: img.clientHeight
      };
    });
    assert(imgData && imgData.complete && imgData.naturalWidth === 1024 && imgData.naturalHeight === 576, `${vp.name}: Profile photo loaded with native 1024x576 aspect ratio`);
    assert(imgData && imgData.renderedWidth > 100 && imgData.renderedHeight > 80, `${vp.name}: Profile photo rendered with balanced dimensions (${imgData?.renderedWidth}x${imgData?.renderedHeight}px)`);

    // 4. Test Card Height Consistency in Projects & Services on tablet/desktop
    if (vp.width >= 768) {
      const projectCardHeights = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('#projects .group.rounded-3xl'));
        return cards.slice(0, 2).map(c => c.clientHeight);
      });
      if (projectCardHeights.length >= 2) {
        const diff = Math.abs(projectCardHeights[0] - projectCardHeights[1]);
        assert(diff <= 4, `${vp.name}: Project cards in the same row have uniform height (heights: ${projectCardHeights.join(', ')}px, diff: ${diff}px)`);
      }
    }
  }

  // 5. Verify Modal Responsive Behavior on Mobile (375px)
  console.log('\n--- Testing Modal Dialog on Mobile (375px) ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('http://localhost:4175/', { waitUntil: 'networkidle2' });

  // Find and click Details button on first project card
  const allButtons = await page.$$('button');
  let detailsBtn = null;
  for (const b of allButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Details')) {
      detailsBtn = b;
      break;
    }
  }
  assert(detailsBtn !== null, 'Details button found on mobile');

  if (detailsBtn) {
    await detailsBtn.click();
    await new Promise(r => setTimeout(r, 500));
    const modalBounds = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      if (!dialog) return null;
      const card = dialog.querySelector('.relative.w-full') || dialog.firstElementChild;
      return {
        dialogVisible: !!dialog,
        cardWidth: card?.clientWidth,
        cardHeight: card?.clientHeight
      };
    });
    assert(modalBounds !== null && modalBounds.dialogVisible, 'Modal dialog opened cleanly on mobile');
    assert(modalBounds && modalBounds.cardWidth <= 375, `Modal card width (${modalBounds?.cardWidth}px) fits within 375px mobile viewport`);

    // Close modal dialog
    const closeBtn = await page.$('button[aria-label*="Close"]');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const isClosed = await page.evaluate(() => !document.querySelector('div[role="dialog"]'));
      assert(isClosed, 'Modal dialog closed cleanly on mobile');
    }
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.touchscreen.tap(180, 240);
  const mobileWaterFallback = await page.evaluate(() => {
    const canvas = document.querySelector('.water-distortion-canvas');
    return canvas ? {
      mode: canvas.dataset.effect,
      animation: getComputedStyle(canvas).animationName,
      background: getComputedStyle(canvas).backgroundImage,
      pointerEvents: getComputedStyle(canvas).pointerEvents
    } : null;
  });
  assert(
    mobileWaterFallback?.mode === 'fallback' &&
      mobileWaterFallback.animation === 'underwater-drift' &&
      mobileWaterFallback.background !== 'none' &&
      mobileWaterFallback.pointerEvents === 'none',
    'Mobile: Animated CSS underwater background remains lightweight and touch-safe'
  );

  // 6. Verify Theme Contrast in Both Modes
  console.log('\n--- Testing Theme Contrast & Persisted Styling ---');
  await page.setViewport({ width: 1280, height: 800 });
  const themeToggle = await page.$('button[title*="Activate Mode"], button[aria-label*="mode"]');
  if (themeToggle) {
    // Switch to dark
    await themeToggle.click();
    await new Promise(r => setTimeout(r, 300));
    const darkBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log('Dark mode body computed background:', darkBg);

    // Switch to light
    await themeToggle.click();
    await new Promise(r => setTimeout(r, 300));
    const lightBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log('Light mode body computed background:', lightBg);

    assert(darkBg !== lightBg, 'Dark and light modes render distinct computed background colors');
  }

  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.waitForFunction(
    () => document.querySelector('.water-distortion-canvas')?.dataset.effect === 'disabled'
  );
  const reducedMotionHidden = await page.evaluate(() => {
    const canvas = document.querySelector('.water-distortion-canvas');
    return canvas ? window.getComputedStyle(canvas).display === 'none' : false;
  });
  assert(reducedMotionHidden, 'Reduced-motion preference disables the water effect');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.waitForFunction(
    () => ['webgl', 'fallback'].includes(document.querySelector('.water-distortion-canvas')?.dataset.effect)
  );
  const restoredWaterMode = await page.$eval('.water-distortion-canvas', canvas => canvas.dataset.effect);
  assert(
    restoredWaterMode === 'webgl' || restoredWaterMode === 'fallback',
    'Water effect can be restored after reduced-motion is turned off'
  );

  await browser.close();
  server.close();

  console.log(`\n======================================================`);
  console.log(`TOTAL RESPONSIVE & ALIGNMENT TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log(`======================================================`);

  if (failed > 0) process.exit(1);
}

verifyResponsiveFormatting().catch(err => {
  console.error('Fatal responsive verification error:', err);
  process.exit(1);
});
