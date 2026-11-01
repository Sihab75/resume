import fs from 'node:fs';
import path from 'node:path';

console.log('=== VERIFYING MASTER PORTFOLIO AUDIT ===');
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✔ ${message}`);
    passed++;
  } else {
    console.error(`✖ FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify index.html anti-flash theme script
const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf-8');
assert(indexHtml.includes('kj-portfolio-theme') && indexHtml.includes('prefers-color-scheme: dark'), 'Anti-flash script present in <head>');
assert(indexHtml.includes('classList.add(\'dark\')') || indexHtml.includes('classList.toggle("dark"'), 'Anti-flash script sets .dark class synchronously');
assert(indexHtml.includes('rel="canonical" href="https://korimul-portfolio.vercel.app/"'), 'Canonical tag set to production URL');

// 2. Verify dist CSS contains Tailwind v4 class-based dark mode selector
const distDir = path.resolve('dist');
const cssFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.css'));
assert(cssFiles.length > 0, 'Compiled CSS bundle exists');
const bundledCss = cssFiles.map(f => fs.readFileSync(path.join(distDir, 'assets', f), 'utf-8')).join('\n');
const darkSelectors = (bundledCss.match(/:where\(\.dark[^\)]*\)/g) || []).length;
assert(darkSelectors >= 50, `Compiled CSS has ${darkSelectors} class-based dark mode selectors (>= 50 required)`);

// 3. Verify fonts & styles in CSS
assert(bundledCss.includes('font-sans') || bundledCss.includes('Inter') || bundledCss.includes('system-ui'), 'Sans font configured');
assert(bundledCss.includes('selection:bg-blue') || bundledCss.includes('bg-blue-600') || bundledCss.includes('#3b82f6'), 'Electric blue accents present in stylesheet');

// 4. Verify JavaScript bundle components
const jsFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.js'));
const bundledJs = jsFiles.map(f => fs.readFileSync(path.join(distDir, 'assets', f), 'utf-8')).join('\n');

// Skip link & landmarks
assert(bundledJs.includes('Skip to main content'), 'Accessible skip-to-content link present');
assert(bundledJs.includes('main-content'), 'Main landmark ID present');

// All 6 skill categories
assert(bundledJs.includes('Programming Languages'), 'Programming Languages category present');
assert(bundledJs.includes('Frontend Development'), 'Frontend Development category present');
assert(bundledJs.includes('Backend Development'), 'Backend Development category present');
assert(bundledJs.includes('Database'), 'Database category present');
assert(bundledJs.includes('Tools & Platforms'), 'Tools & Platforms category present');
assert(bundledJs.includes('Computer Science Fundamentals'), 'CS Fundamentals category present');

// Verified Projects
assert(bundledJs.includes('Smart Life Manager'), 'Project 1: Smart Life Manager present');
assert(bundledJs.includes('https://github.com/Sihab75/smart-life-manager'), 'Project 1: verified github URL present');
assert(bundledJs.includes('Huffman File Compressor'), 'Project 2: Huffman File Compressor present');
assert(bundledJs.includes('https://github.com/Sihab75/start'), 'Project 2: verified github URL present');
assert(bundledJs.includes('Algorithmic Problem Solving & STL'), 'Project 3: Algorithmic Problem Solving & STL present');
assert(bundledJs.includes('https://github.com/Sihab75/localRepo'), 'Project 3: verified github URL present');
assert(bundledJs.includes('Developer Portfolio & Resume Engine'), 'Project 4: Developer Portfolio & Resume Engine present');
assert(bundledJs.includes('https://github.com/Sihab75/resume'), 'Project 4: verified github URL present');

// Verified competitive stats
assert(bundledJs.includes('korimuljaman'), 'Codeforces handle verified');
assert(bundledJs.includes('693'), 'Codeforces rating verified');
assert(bundledJs.includes('sihab_75'), 'CodeChef handle verified');
assert(bundledJs.includes('1417'), 'CodeChef rating verified');

// Verified education
assert(bundledJs.includes('Green University of Bangladesh'), 'University verified');
assert(bundledJs.includes('251002084'), 'Student ID verified');
assert(bundledJs.includes('Batch 251'), 'Batch verified');

console.log(`\n=== RESULTS: ${passed} Passed, ${failed} Failed ===`);
if (failed > 0) process.exit(1);
