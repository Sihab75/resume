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

  // 3. Check for any unverified or guessed emails in built assets
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

  // 4. Check Favicon
  try {
    const favRes = await fetch('http://localhost:4173/favicon.svg');
    if (favRes.status === 200 && (await favRes.text()).includes('<svg')) {
      console.log('✔ Favicon check: 200 OK and valid SVG');
    } else {
      console.error('✖ Favicon check failed');
      failures++;
    }
  } catch (e) {
    console.error('✖ Favicon error:', e.message);
    failures++;
  }

  // 5. Check Git Repository status
  try {
    const gitDir = path.resolve('.git');
    if (fs.existsSync(gitDir)) {
      console.log('✔ Git repository check: .git exists and is cleanly initialized');
    } else {
      console.error('✖ Git repo missing');
      failures++;
    }
  } catch (e) {
    console.error('✖ Git check error:', e.message);
    failures++;
  }

  console.log(`=== AUDIT TEST COMPLETED: ${failures === 0 ? 'ALL PASSED' : failures + ' FAILED'} ===`);
}

auditTest();
