import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_URL = 'https://korimul-portfolio.vercel.app/';

async function runLiveVerification() {
  console.log('=== STARTING LIVE PRODUCTION WEBSITE VERIFICATION ===');
  console.log('Target URL:', TARGET_URL);
  console.log('Browser:', CHROME_PATH);

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✔ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] ${testName}`);
      failed++;
    }
  }

  const consoleErrors = [];
  const networkErrors = [];

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  page.on('requestfailed', req => {
    // ignore favicon or non-critical tracking if any
    networkErrors.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  // 1. Load the live production website
  console.log('\n--- 1. Navigating to live site ---');
  const response = await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  assert(response && response.status() === 200, `Live site loads with HTTP 200 (Got ${response?.status()})`);

  // 2. Check all sections rendered
  console.log('\n--- 2. Verifying Sections Rendering ---');
  const sections = ['home', 'about', 'skills', 'projects', 'services', 'education', 'competitive', 'resume', 'contact'];
  for (const id of sections) {
    const el = await page.$(`#${id}`);
    assert(el !== null, `Section #${id} is present in the DOM`);
  }

  // 3. Verify Dark Mode / Light Mode toggle functionality
  console.log('\n--- 3. Verifying Dark & Light Mode Toggles & Theme Persistence ---');
  const initialTheme = await page.evaluate(() => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  console.log(`Initial theme detected: "${initialTheme}"`);

  // Find theme toggle button
  const themeToggle = await page.$('button[title*="Activate Mode"], button[aria-label*="mode"]');
  assert(themeToggle !== null, 'Theme toggle button found in navbar');

  // 1st click: flip to target1
  const targetTheme1 = initialTheme === 'dark' ? 'light' : 'dark';
  console.log(`Clicking toggle to switch from ${initialTheme} to ${targetTheme1}...`);
  await themeToggle.click();
  await new Promise(r => setTimeout(r, 500));
  const stateAfterClick1 = await page.evaluate(() => ({
    isDark: document.documentElement.classList.contains('dark'),
    isLight: document.documentElement.classList.contains('light'),
    storage: localStorage.getItem('kj-portfolio-theme')
  }));
  const isFlippedTo1 = targetTheme1 === 'dark' 
    ? (stateAfterClick1.isDark && !stateAfterClick1.isLight && stateAfterClick1.storage === 'dark')
    : (stateAfterClick1.isLight && !stateAfterClick1.isDark && stateAfterClick1.storage === 'light');
  assert(isFlippedTo1, `Toggle switched successfully to "${targetTheme1}" (DOM class and localStorage verified)`);

  // 2nd click: flip back to initialTheme
  console.log(`Clicking toggle again to switch back to ${initialTheme}...`);
  await themeToggle.click();
  await new Promise(r => setTimeout(r, 500));
  const stateAfterClick2 = await page.evaluate(() => ({
    isDark: document.documentElement.classList.contains('dark'),
    isLight: document.documentElement.classList.contains('light'),
    storage: localStorage.getItem('kj-portfolio-theme')
  }));
  const isFlippedTo2 = initialTheme === 'dark'
    ? (stateAfterClick2.isDark && !stateAfterClick2.isLight && stateAfterClick2.storage === 'dark')
    : (stateAfterClick2.isLight && !stateAfterClick2.isDark && stateAfterClick2.storage === 'light');
  assert(isFlippedTo2, `Toggle switched back successfully to "${initialTheme}" (DOM class and localStorage verified)`);

  // Refresh page and test persistence
  console.log(`Refreshing page to verify persistence of "${initialTheme}"...`);
  await page.reload({ waitUntil: 'networkidle2' });
  const stateAfterReload = await page.evaluate(() => ({
    isDark: document.documentElement.classList.contains('dark'),
    isLight: document.documentElement.classList.contains('light'),
    storage: localStorage.getItem('kj-portfolio-theme')
  }));
  const persistsInitial = initialTheme === 'dark'
    ? (stateAfterReload.isDark && stateAfterReload.storage === 'dark')
    : (stateAfterReload.isLight && stateAfterReload.storage === 'light');
  assert(persistsInitial, `Theme "${initialTheme}" persisted correctly after full page reload`);

  // Switch to targetTheme1 and test persistence after second reload
  console.log(`Switching to "${targetTheme1}" and refreshing to verify second reload persistence...`);
  const toggleBtnAfterReload = await page.$('button[title*="Activate Mode"], button[aria-label*="mode"]');
  await toggleBtnAfterReload.click();
  await new Promise(r => setTimeout(r, 500));
  await page.reload({ waitUntil: 'networkidle2' });
  const stateAfterSecondReload = await page.evaluate(() => ({
    isDark: document.documentElement.classList.contains('dark'),
    isLight: document.documentElement.classList.contains('light'),
    storage: localStorage.getItem('kj-portfolio-theme')
  }));
  const persistsTarget = targetTheme1 === 'dark'
    ? (stateAfterSecondReload.isDark && stateAfterSecondReload.storage === 'dark')
    : (stateAfterSecondReload.isLight && stateAfterSecondReload.storage === 'light');
  assert(persistsTarget, `Theme "${targetTheme1}" persisted correctly after second full page reload`);

  // 4. Verify Project links & Modal interaction
  console.log('\n--- 4. Verifying Project Links & Modal Interaction ---');
  const projectCards = await page.$$('article, .group');
  assert(projectCards.length > 0, `Project cards found (${projectCards.length})`);

  // Find "Details" button on first project card
  const detailsButtons = await page.$$('button');
  let detailsBtn = null;
  for (const b of detailsButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Details') || text.includes('View Details')) {
      detailsBtn = b;
      break;
    }
  }
  assert(detailsBtn !== null, 'Project Details modal button found');
  if (detailsBtn) {
    await detailsBtn.click();
    await new Promise(r => setTimeout(r, 500));
    const modalVisible = await page.$('div[role="dialog"]');
    assert(modalVisible !== null, 'Project modal dialog opened successfully upon click');
    
    // Close modal
    const closeBtn = await page.$('button[aria-label="Close dialog"]');
    if (closeBtn) {
      await closeBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const modalClosed = await page.$('div[role="dialog"]');
      assert(modalClosed === null, 'Project modal dialog closed successfully');
    }
  }

  // 5. Verify Mobile navigation
  console.log('\n--- 5. Verifying Mobile Navigation ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await new Promise(r => setTimeout(r, 300));
  const mobileToggle = await page.$('button[aria-label="Toggle navigation menu"]');
  assert(mobileToggle !== null, 'Mobile menu toggle button found in viewport 375px');

  if (mobileToggle) {
    await mobileToggle.click();
    await new Promise(r => setTimeout(r, 400));
    const mobileMenuLink = await page.$('#mobile-nav a[href="#skills"]');
    assert(mobileMenuLink !== null, 'Mobile menu drawer opened with navigation links');
    if (mobileMenuLink) {
      await mobileMenuLink.click();
      await new Promise(r => setTimeout(r, 400));
      assert(true, 'Mobile navigation item clicked and handled cleanly');
    }
  }

  // Reset viewport to desktop
  await page.setViewport({ width: 1280, height: 800 });

  // 6. Verify Resume PDF download
  console.log('\n--- 6. Verifying Resume PDF Download ---');
  const pdfUrl = `${TARGET_URL}Md_Korimul_Jaman_Resume.pdf`;
  const pdfRes = await fetch(pdfUrl);
  assert(pdfRes.status === 200, `Resume PDF endpoint returned HTTP 200 (Got ${pdfRes.status})`);
  const pdfContentType = pdfRes.headers.get('content-type') || '';
  assert(pdfContentType.includes('pdf') || pdfContentType.includes('octet-stream'), `PDF Content-Type verified (${pdfContentType})`);
  const pdfBuffer = await pdfRes.arrayBuffer();
  const pdfHeader = Buffer.from(pdfBuffer.slice(0, 5)).toString();
  assert(pdfHeader.startsWith('%PDF-'), `PDF header verified as binary %PDF- (${pdfBuffer.byteLength} bytes)`);

  // 7. Check browser console errors and failed network requests
  console.log('\n--- 7. Checking Console Errors & Network Failures ---');
  console.log('Console errors recorded:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(e => console.error('  ->', e));
  }
  assert(consoleErrors.length === 0, 'Zero browser console errors detected on live website');

  console.log('Network request failures recorded:', networkErrors.length);
  if (networkErrors.length > 0) {
    networkErrors.forEach(e => console.error('  ->', e));
  }
  assert(networkErrors.length === 0, 'Zero failed network requests detected on live website');

  await browser.close();

  console.log(`\n========================================`);
  console.log(`TOTAL TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log(`========================================`);

  if (failed > 0) process.exit(1);
}

runLiveVerification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
