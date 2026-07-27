import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const files = [
  'index.html',
  'documentation.html',
  'app.js',
  'mobile-pwa.js',
  'service-worker.js',
  'src/ui/documentation.js',
  'src/ui/documentation-page.js',
];

test('interface sources contain valid Unicode without mojibake markers', () => {
  for (const file of files) {
    const text = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.ok(!text.includes('\uFFFD'), `${file} contains a Unicode replacement character`);
    assert.doesNotMatch(text, /(?:Ã.|Â.|â€|â„|â†|â˜|âœ|ðŸ|ï¸)/, `${file} contains mojibake`);
  }
});

test('PWA entry points use the current cache-busting release identifier', () => {
  const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const worker = fs.readFileSync(new URL('../service-worker.js', import.meta.url), 'utf8');
  const mobile = fs.readFileSync(new URL('../mobile-pwa.js', import.meta.url), 'utf8');

  assert.match(index, /app\.js\?v=1\.1\.0-r8/);
  assert.match(worker, /spatial-itqan-shell-v1\.1\.0-r9/);
  assert.match(mobile, /service-worker\.js\?v=1\.1\.0-r9/);
});
