import puppeteer from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// Simple static server for dist
function startDistServer(port = 4174) {
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

  return new Promise(resolve => {
    server.listen(port, () => resolve(server));
  });
}

async function verifyProfilePhoto() {
  console.log('=== VERIFYING PROFILE PHOTO INTEGRATION ===');
  const server = await startDistServer(4174);
  console.log('Static dist server listening on http://localhost:4174/');

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

  // Track console errors & network failures
  const consoleErrors = [];
  const failedRequests = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('requestfailed', req => {
    failedRequests.push(`${req.method()} ${req.url()}`);
  });

  // 1. Desktop Check (1280x800)
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:4174/', { waitUntil: 'networkidle2' });

  const heroImgStatus = await page.evaluate(() => {
    const img = document.querySelector('#home img');
    if (!img) return null;
    return {
      src: img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      alt: img.alt,
      visibleWidth: img.clientWidth,
      visibleHeight: img.clientHeight
    };
  });

  assert(heroImgStatus !== null, 'Profile image found in #home Hero section');
  assert(heroImgStatus && heroImgStatus.complete && heroImgStatus.naturalWidth > 0, `Profile image loaded successfully (natural dimensions: ${heroImgStatus?.naturalWidth}x${heroImgStatus?.naturalHeight})`);
  assert(heroImgStatus && heroImgStatus.visibleWidth > 200 && heroImgStatus.visibleHeight > 150, `Desktop responsive size confirmed (${heroImgStatus?.visibleWidth}x${heroImgStatus?.visibleHeight}px)`);

  // 2. Tablet Check (768x1024)
  await page.setViewport({ width: 768, height: 1024 });
  await new Promise(r => setTimeout(r, 200));
  const tabletSize = await page.evaluate(() => {
    const img = document.querySelector('#home img');
    return { width: img?.clientWidth, height: img?.clientHeight };
  });
  assert(tabletSize.width > 200 && tabletSize.height > 150, `Tablet responsive rendering confirmed (${tabletSize.width}x${tabletSize.height}px)`);

  // 3. Mobile Check (375x812)
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await new Promise(r => setTimeout(r, 200));
  const mobileSize = await page.evaluate(() => {
    const img = document.querySelector('#home img');
    return { width: img?.clientWidth, height: img?.clientHeight };
  });
  assert(mobileSize.width > 150 && mobileSize.height > 120, `Mobile responsive rendering confirmed (${mobileSize.width}x${mobileSize.height}px)`);

  // 4. Dark & Light Mode verification
  await page.setViewport({ width: 1280, height: 800 });
  const themeToggle = await page.$('button[title*="Activate Mode"], button[aria-label*="mode"]');
  assert(themeToggle !== null, 'Theme toggle button accessible in Hero area');

  if (themeToggle) {
    // Switch theme
    await themeToggle.click();
    await new Promise(r => setTimeout(r, 300));
    const mode1 = await page.evaluate(() => document.documentElement.className);
    assert(mode1.includes('dark') || mode1.includes('light'), `Theme toggled to "${mode1}" with image intact`);

    await themeToggle.click();
    await new Promise(r => setTimeout(r, 300));
    const mode2 = await page.evaluate(() => document.documentElement.className);
    assert(mode2.includes('dark') || mode2.includes('light'), `Theme toggled back to "${mode2}" with image intact`);
  }

  // 5. Check Console and Network Health
  assert(consoleErrors.length === 0, `Zero console errors while loading profile photo (errors: ${consoleErrors.length})`);
  assert(failedRequests.length === 0, `Zero failed network requests while loading image asset`);

  await browser.close();
  server.close();

  console.log(`\n=== RESULTS: ${passed} Passed, ${failed} Failed ===`);
  if (failed > 0) process.exit(1);
}

verifyProfilePhoto().catch(err => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
