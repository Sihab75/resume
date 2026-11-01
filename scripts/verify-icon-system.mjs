import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const LOCAL_URL = 'http://localhost:4174';

async function runIconAudit() {
  console.log('=== STARTING ICON SYSTEM AUDIT & VERIFICATION ===');
  console.log('Launching Vite preview server on port 4174...');

  const preview = spawn('cmd.exe', ['/c', 'npx', 'vite', 'preview', '--port', '4174'], {
    stdio: 'pipe'
  });

  // wait 2 seconds for server to start
  await new Promise(r => setTimeout(r, 2000));

  let passed = 0;
  let failed = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`✔ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`✖ [FAIL] ${name}`);
      failed++;
    }
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto(LOCAL_URL, { waitUntil: 'networkidle0', timeout: 15000 });
    assert(true, 'Local preview loaded successfully');

    // 1. Audit total SVGs
    const totalSVGs = await page.$$eval('svg', svgs => svgs.length);
    console.log(`Total SVG icons found on page: ${totalSVGs}`);
    assert(totalSVGs >= 25, `Comprehensive SVG icon coverage (Found ${totalSVGs})`);

    // 2. Audit aria-hidden on decorative SVGs
    const svgsWithoutAria = await page.$$eval('svg:not([aria-hidden="true"])', svgs => svgs.length);
    console.log(`SVGs without aria-hidden="true": ${svgsWithoutAria}`);
    assert(svgsWithoutAria === 0, `All decorative SVGs have aria-hidden="true" (Found 0 violations)`);

    // 3. Verify brand icons in Hero profiles
    const heroProfileLinks = await page.$$eval('#home a[aria-label]', links => 
      links.map(l => ({ label: l.getAttribute('aria-label'), hasSvg: l.querySelector('svg') !== null }))
    );
    console.log('Hero profile links:', heroProfileLinks);
    assert(heroProfileLinks.some(l => l.label.includes('GitHub') && l.hasSvg), 'Hero has GitHub SVG icon');
    assert(heroProfileLinks.some(l => l.label.includes('LinkedIn') && l.hasSvg), 'Hero has LinkedIn SVG icon');
    assert(heroProfileLinks.some(l => l.label.includes('Codeforces') && l.hasSvg), 'Hero has Codeforces SVG icon');
    assert(heroProfileLinks.some(l => l.label.includes('CodeChef') && l.hasSvg), 'Hero has CodeChef SVG icon');
    assert(heroProfileLinks.some(l => l.label.includes('LeetCode') && l.hasSvg), 'Hero has LeetCode SVG icon');

    // 4. Verify Skills section category cards have icons
    const skillCategoryCardIcons = await page.$$eval('#skills .grid.grid-cols-1 > div', cards => {
      return cards.map(c => {
        const svg = c.querySelector('h3')?.parentElement?.querySelector('svg');
        return svg !== null;
      });
    });
    console.log('Skills category cards with icons:', skillCategoryCardIcons);
    assert(
      skillCategoryCardIcons.length === 6 && skillCategoryCardIcons.every(Boolean),
      'All 6 Skill Category cards have dedicated outline icons'
    );

    // 5. Verify Contact section cards symmetry
    const contactCardIcons = await page.$$eval('#contact .lg\\:col-span-5 > div', cards => {
      return cards.map(c => c.querySelector('svg') !== null);
    });
    console.log('Contact cards with icons:', contactCardIcons);
    assert(
      contactCardIcons.every(Boolean),
      'All Contact sidebar cards (Phone, Location, Profiles) have top icon badges'
    );

    // 6. Test Mobile Navigation drawer icons
    await page.setViewport({ width: 375, height: 667 });
    const mobileMenuBtn = await page.$('button[aria-controls="mobile-nav"]');
    assert(mobileMenuBtn !== null, 'Mobile menu toggle button exists');
    await mobileMenuBtn.click();
    await new Promise(r => setTimeout(r, 400));

    const mobileNavIcons = await page.$$eval('#mobile-nav a svg', svgs => svgs.length);
    console.log(`Mobile nav link icons found: ${mobileNavIcons}`);
    assert(mobileNavIcons === 8, `Mobile navigation drawer has icons for all 8 nav items (Found ${mobileNavIcons})`);

    // Close mobile menu before theme toggle test
    await mobileMenuBtn.click();
    await new Promise(r => setTimeout(r, 400));

    // Reset viewport to desktop
    await page.setViewport({ width: 1440, height: 900 });

    // Check theme toggle initially at 1440px BEFORE any viewport manipulation
    console.log('\n--- Testing Theme Toggle ---');
    const initialTheme = await page.evaluate(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    console.log(`Initial theme: ${initialTheme}`);
    
    const themeBtn = await page.$('button[title*="Activate Mode"], button[aria-label*="mode"]');
    assert(themeBtn !== null, 'Theme toggle button exists in navbar');
    await themeBtn.click();
    await new Promise(r => setTimeout(r, 500));

    const flippedTheme = await page.evaluate(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    console.log(`Theme after 1st click: ${flippedTheme}`);
    assert(flippedTheme !== initialTheme, `Theme toggled to ${flippedTheme}`);

    // Check SVG bounding boxes for all visible elements in new theme
    const collapsedDetails = await page.$$eval('svg', svgs => {
      return svgs.map(s => {
        const isVisible = s.checkVisibility ? s.checkVisibility() : (s.offsetParent !== null);
        const rect = s.getBoundingClientRect();
        return {
          isVisible,
          width: rect.width,
          height: rect.height,
          class: s.getAttribute('class') || '',
          parentTag: s.parentElement?.tagName || '',
          parentClass: s.parentElement?.getAttribute('class') || ''
        };
      }).filter(item => item.isVisible && (item.width === 0 || item.height === 0));
    });
    console.log('Collapsed visible icons:', collapsedDetails);
    assert(collapsedDetails.length === 0, `No visible 0x0 size icons found (Found ${collapsedDetails.length})`);

    // Toggle back
    await themeBtn.click();
    await new Promise(r => setTimeout(r, 500));
    const finalTheme = await page.evaluate(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    console.log(`Theme after 2nd click: ${finalTheme}`);
    assert(finalTheme === initialTheme, `Theme toggled back to ${initialTheme}`);

    assert(consoleErrors.length === 0, `0 console errors detected during full icon audit (Errors: ${consoleErrors.length})`);

    console.log(`\n=== ICON AUDIT COMPLETE: ${passed} PASSED, ${failed} FAILED ===`);
  } finally {
    if (browser) await browser.close();
    preview.kill();
  }
}

runIconAudit().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
