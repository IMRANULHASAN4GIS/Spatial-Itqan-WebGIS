import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('application does not construct or evaluate JavaScript dynamically', () => {
  const application = fs.readFileSync(new URL('../../app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(application, /\bnew\s+Function\s*\(/);
  assert.doesNotMatch(application, /\beval\s*\(/);
  assert.doesNotMatch(application, /\bwith\s*\(/);
});

test('production dependencies are locked', () => {
  const lock = JSON.parse(
    fs.readFileSync(new URL('../../package-lock.json', import.meta.url), 'utf8')
  );
  assert.equal(lock.lockfileVersion, 3);
  assert.ok(lock.packages['node_modules/helmet']);
  assert.ok(lock.packages['node_modules/pg']);
});

test('release metadata is consistently versioned as 1.1.0', () => {
  const packageFile = JSON.parse(
    fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
  );
  const manifest = JSON.parse(
    fs.readFileSync(new URL('../../manifest.webmanifest', import.meta.url), 'utf8')
  );
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
  assert.equal(packageFile.version, '1.1.0');
  assert.match(manifest.description, /1\.1\.0/);
  assert.match(html, /name="application-version" content="1\.1\.0"/);
});
