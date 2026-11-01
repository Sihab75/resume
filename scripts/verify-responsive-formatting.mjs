import puppeteer from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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

  const viewports = [
    { name: 'Desktop', width: 1440, height: 900, isMobile: false },
    { name: 'Laptop', width: 1280, height: 800, isMobile: false },
    { name: 'Tablet', width: 768, height: 1024, isMobile: false },
    { name: 'Mobile', width: 375, height: 812, isMobile: true }
  ];

  for (const vp of viewports) {
    console.log(`\n--- Testing ${vp.name} (${vp.width}x${vp.height}) ---`);
    await page.setViewport({ width: vp.width, height: vp.height, isMobile: vp.isMobile });
    await page.goto('http://localhost:4175/', { waitUntil: 'networkidle2' });

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
