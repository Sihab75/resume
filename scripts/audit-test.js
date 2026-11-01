import fs from 'fs';
import path from 'path';

async function auditTest() {
  console.log('=== STARTING AUDIT TEST ===');
  let failures = 0;

  // 1. Check HTTP Server on port 4173
  try {
    const res = await fetch('http://localhost:4173/');
    if (res.status === 200) {
      console.log('✔ Server check: Port 4173 returned 200 OK');
    } else {
      console.error('✖ Server check failed: status', res.status);
      failures++;
    }
    const html = await res.text();
    if (html.includes('Md. Korimul Jaman') && html.includes('Green University of Bangladesh')) {
      console.log('✔ HTML content check: Name & University present');
    } else {
      console.error('✖ HTML missing core identity info');
      failures++;
    }

    if (html.includes('<title>Md. Korimul Jaman | CSE Student & Aspiring Software Engineer</title>')) {
      console.log('✔ SEO Title check: Correct professional title');
    } else {
      console.error('✖ SEO Title missing or incorrect');
      failures++;
    }

    if (html.includes('rel="canonical" href="https://korimul-portfolio.vercel.app/"')) {
      console.log('✔ Canonical URL check: Verified');
    } else {
      console.error('✖ Canonical URL check failed');
      failures++;
    }

    const distJs = fs.readdirSync(path.join('dist', 'assets')).filter(f => f.endsWith('.js'));
    const hasMain = distJs.some(f => fs.readFileSync(path.join('dist', 'assets', f), 'utf-8').includes('main-content'));
    if (hasMain) {
      console.log('✔ Accessibility: Main content landmark verified in client bundle');
    } else {
      console.error('✖ Main landmark missing');
      failures++;
    }
  } catch (e) {
    console.error('✖ Server error:', e.message);
    failures++;
  }

  // 2. Check PDF Resume endpoint
  try {
    const pdfRes = await fetch('http://localhost:4173/Md_Korimul_Jaman_Resume.pdf');
    if (pdfRes.status === 200 && pdfRes.headers.get('content-type')?.includes('pdf')) {
      const buffer = await pdfRes.arrayBuffer();
      const header = Buffer.from(buffer.slice(0, 5)).toString();
      if (header.startsWith('%PDF-')) {
        console.log(`✔ PDF Resume check: Valid PDF structure (${buffer.byteLength} bytes)`);
      } else {
        console.error('✖ PDF Resume corrupted or wrong header:', header);
        failures++;
      }
    } else {
      console.error('✖ PDF Resume failed HTTP check:', pdfRes.status);
      failures++;
    }
  } catch (e) {
    console.error('✖ PDF check error:', e.message);
    failures++;
  }

  // 3. Check Robots & Sitemap
  try {
    const robRes = await fetch('http://localhost:4173/robots.txt');
    if (robRes.status === 200 && (await robRes.text()).includes('User-agent')) {
      console.log('✔ Robots.txt check: 200 OK');
    } else {
      console.error('✖ Robots.txt missing or failed');
      failures++;
    }

    const smRes = await fetch('http://localhost:4173/sitemap.xml');
    if (smRes.status === 200 && (await smRes.text()).includes('urlset')) {
      console.log('✔ Sitemap.xml check: 200 OK');
    } else {
      console.error('✖ Sitemap.xml missing or failed');
      failures++;
    }
  } catch (e) {
    console.error('✖ Robots/Sitemap error:', e.message);
    failures++;
  }

  // 4. Check for any unverified or guessed emails in built assets
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(path.join(distDir, 'assets'));
    let foundGuessedEmail = false;
    for (const f of files) {
      const content = fs.readFileSync(path.join(distDir, 'assets', f), 'utf-8');
      if (content.includes('korimuljaman.cse@gmail.com')) {
        foundGuessedEmail = true;
      }
    }
    if (!foundGuessedEmail) {
      console.log('✔ Privacy check: No unverified or guessed email address found in dist assets');
    } else {
      console.error('✖ Privacy warning: Guessed email still found in bundle!');
      failures++;
    }
  }

  // 5. Compare with Live Deployment
  try {
    const liveRes = await fetch('https://korimul-portfolio.vercel.app/');
    if (liveRes.status === 200) {
      console.log('✔ Live Website check: https://korimul-portfolio.vercel.app/ is healthy and live (200 OK)');
    } else {
      console.warn('⚠ Live Website check: status', liveRes.status);
    }
  } catch (e) {
    console.warn('⚠ Live Website network warning:', e.message);
  }

  console.log(`=== AUDIT TEST COMPLETED: ${failures === 0 ? 'ALL PASSED' : failures + ' FAILED'} ===`);
}

auditTest();
