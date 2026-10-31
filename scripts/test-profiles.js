async function testProfiles() {
  console.log('--- Checking Codeforces ---');
  try {
    const res = await fetch('https://codeforces.com/api/user.info?handles=korimuljaman');
    const data = await res.json();
    console.log('Codeforces result:', data.status, data.result?.[0]?.handle, 'Rating:', data.result?.[0]?.rating);
  } catch (e) {
    console.log('Codeforces error:', e.message);
  }

  console.log('--- Checking GitHub ---');
  try {
    const res = await fetch('https://api.github.com/users/Sihab75');
    const data = await res.json();
    console.log('GitHub user:', data.login, 'Name:', data.name, 'Public repos:', data.public_repos);
  } catch (e) {
    console.log('GitHub error:', e.message);
  }

  console.log('--- Checking GitHub Repos ---');
  try {
    const res = await fetch('https://api.github.com/users/Sihab75/repos');
    const data = await res.json();
    console.log('GitHub Repos:', data.map(r => ({ name: r.name, lang: r.language, html_url: r.html_url })));
  } catch (e) {
    console.log('GitHub repos error:', e.message);
  }

  console.log('--- Checking CodeChef ---');
  try {
    const res = await fetch('https://www.codechef.com/users/sihab_75', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log('CodeChef status:', res.status);
  } catch (e) {
    console.log('CodeChef error:', e.message);
  }

  console.log('--- Checking LeetCode ---');
  try {
    const res = await fetch('https://leetcode.com/u/Korimul/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log('LeetCode profile status:', res.status);
  } catch (e) {
    console.log('LeetCode error:', e.message);
  }

  console.log('--- Checking AtCoder ---');
  try {
    const res = await fetch('https://atcoder.jp/users/korimuljaman', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log('AtCoder status:', res.status);
  } catch (e) {
    console.log('AtCoder error:', e.message);
  }
}

testProfiles();
