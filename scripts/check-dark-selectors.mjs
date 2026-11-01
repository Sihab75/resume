import fs from 'node:fs';

const cssFile = fs.readdirSync('dist/assets').find(f => f.startsWith('index-') && f.endsWith('.css'));
const css = fs.readFileSync('dist/assets/' + cssFile, 'utf8');

const darkSelectors = css.match(/:where\(\.dark[^{}]*\{/g) || [];
console.log('Total :where(.dark) selectors generated:', darkSelectors.length);
console.log('Sample selectors:');
darkSelectors.slice(0, 5).forEach(s => console.log(' ->', s.trim()));
