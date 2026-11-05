async function inspectCodeChef() {
  try {
    const res = await fetch('https://www.codechef.com/users/sihab_75', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const text = await res.text();
    const ratingMatch = text.match(/class="rating-number">([^<]+)<\/div>/);
    const divMatch = text.match(/\((Div\s*\d+)\)/);
    const starMatch = text.match(/class="rating-star"[^>]*>/g);
    console.log('CodeChef Rating:', ratingMatch ? ratingMatch[1].trim() : 'N/A');
    console.log('CodeChef Division:', divMatch ? divMatch[1] : 'N/A');
    console.log('CodeChef Stars:', starMatch ? starMatch.length : 'N/A');
  } catch (e) {
    console.error('Error fetching CodeChef:', e.message);
  }
}

inspectCodeChef();
