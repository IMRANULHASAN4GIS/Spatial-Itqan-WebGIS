import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const mobile = fs.readFileSync(new URL('../mobile-pwa.js', import.meta.url), 'utf8');

test('phone ribbon is constrained to one horizontally scrollable row', () => {
  assert.match(index, /body\.device-mobile \.experience-ribbon\{/);
  assert.match(index, /grid-auto-flow:column!important/);
  assert.match(index, /grid-template-rows:48px!important/);
  assert.match(index, /overflow-x:auto!important/);
  assert.match(index, /max-height:52px!important/);
});

test('phone map owns the remaining viewport and reacts to layout changes', () => {
  assert.match(index, /body\.device-mobile \.main\{/);
  assert.match(index, /flex:1 1 auto!important/);
  assert.match(index, /body\.device-mobile #map\{[^}]*height:100%!important/);
  assert.match(mobile, /ResizeObserver/);
  assert.match(mobile, /invalidateSize\(\{ pan: false \}\)/);
});

test('phone install control is compact and does not obscure the map', () => {
  assert.match(index, /body\.device-mobile \.pwa-install-button\{/);
  assert.match(index, /width:50px!important/);
  assert.match(index, /\.pwa-install-label\{display:none!important\}/);
});
