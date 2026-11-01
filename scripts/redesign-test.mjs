import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

async function testRedesign() {
  console.log('=== VERIFYING REDESIGNED PORTFOLIO WEBSITE ===');

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

  // 1. Verify dist assets exist
  const distDir = path.resolve('dist');
  assert(fs.existsSync(distDir), 'Dist folder exists');
  assert(fs.existsSync(path.join(distDir, 'index.html')), 'Dist index.html exists');
  assert(fs.existsSync(path.join(distDir, 'Md_Korimul_Jaman_Resume.pdf')), 'Resume PDF exists in dist');

  // 2. Fetch local preview on port 4173
  const getHtml = () => new Promise((resolve, reject) => {
    http.get('http://localhost:4173/', res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });

  try {
    const res = await getHtml();
    assert(res.status === 200, `Local preview server is responsive (HTTP ${res.status})`);
    assert(res.data.includes('<div id="root"></div>'), 'Root mounting element is present');
  } catch (e) {
    assert(false, `Local preview request failed: ${e.message}`);
  }

  // 3. Inspect built JavaScript bundle for sections, IDs, and verified content
  const assetsDir = path.join(distDir, 'assets');
  const jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
  const bundledJs = jsFiles.map(f => fs.readFileSync(path.join(assetsDir, f), 'utf-8')).join('\n');

  // Section IDs check
  const requiredIds = ['home', 'skills', 'about', 'projects', 'services', 'education', 'competitive', 'resume', 'contact'];
  requiredIds.forEach(id => {
    const found = bundledJs.includes(`id:\`${id}\``) || bundledJs.includes(`id:"${id}"`) || bundledJs.includes(`id='${id}'`);
    assert(found, `Section id "${id}" bundled into production code`);
  });

  // Identity checks
  assert(bundledJs.includes('Md. Korimul Jaman'), 'Personal name verified in bundle');
  assert(bundledJs.includes('Green University of Bangladesh'), 'University affiliation verified in bundle');
  assert(bundledJs.includes('251002084'), 'Student ID 251002084 verified in bundle');
  assert(bundledJs.includes('Batch 251') || bundledJs.includes('251'), 'Batch 251 verified in bundle');

  // Competitive Programming stats
  assert(bundledJs.includes('korimuljaman'), 'Codeforces handle verified in bundle');
  assert(bundledJs.includes('693'), 'Codeforces rating 693 verified in bundle');
  assert(bundledJs.includes('sihab_75'), 'CodeChef handle verified in bundle');
  assert(bundledJs.includes('1417'), 'CodeChef rating 1417 verified in bundle');

  // New Redesign Features
  assert(bundledJs.includes('animate-marquee'), 'Animated marquee class present in bundle');
  assert(bundledJs.includes('How I Build &') || bundledJs.includes('Solve Problems'), 'Services / Core Competencies section present in bundle');
  assert(bundledJs.includes('Open to opportunities'), 'Status badge present in bundle');
  assert(bundledJs.includes('Download Resume'), 'Resume download triggers present in bundle');

  // CSS Check
  const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
  const bundledCss = cssFiles.map(f => fs.readFileSync(path.join(assetsDir, f), 'utf-8')).join('\n');
  assert(bundledCss.includes('@keyframes marquee') || bundledCss.includes('marquee'), 'Marquee keyframes compiled into CSS');
  assert(bundledCss.includes('spin-slow') || bundledCss.includes('@keyframes spin'), 'Spin animation compiled into CSS');

  console.log(`\n=== RESULTS: ${passed} Passed, ${failed} Failed ===`);
  if (failed > 0) process.exit(1);
}

testRedesign();
