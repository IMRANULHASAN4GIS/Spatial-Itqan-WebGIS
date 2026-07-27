import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('first launch is neutral and does not hard-code Al Ain as home', () => {
  assert.match(app, /var HOME=\{center:\[20,0\],zoom:2\}/);
  assert.doesNotMatch(app, /var HOME=\{center:\[24\.2075,55\.7447\]/);
});

test('map view persists locally and validates restored coordinates', () => {
  assert.match(app, /SpatialItqanLastMapViewV110/);
  assert.match(app, /loadSavedMapView\(\)/);
  assert.match(app, /map\.on\('moveend zoomend',saveCurrentMapView\)/);
  assert.match(app, /clearSavedMapView\(\)/);
});

test('map and bundled basemaps support native-resolution-aware overzoom', () => {
  assert.match(app, /var MAP_MAX_ZOOM=28/);
  assert.match(app, /maxZoom:MAP_MAX_ZOOM/);
  const nativeZoomDefinitions = app.match(/maxNativeZoom:\d+/g) || [];
  assert.ok(nativeZoomDefinitions.length >= 10);
});

test('factory reset is explicitly distinguished from normal reload', () => {
  assert.match(index, /Factory reset session/);
  assert.match(app, /saved map view/);
});
