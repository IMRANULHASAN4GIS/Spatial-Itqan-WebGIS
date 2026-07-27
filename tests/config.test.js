import test from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig } from '../server/config.js';

test('server configuration rejects short JWT secrets', () => {
  assert.throws(
    () =>
      loadConfig({
        NODE_ENV: 'test',
        JWT_SECRET: 'short',
        DATABASE_URL: 'postgres://example',
        APP_ORIGIN: 'https://example.com',
      }),
    /JWT_SECRET/
  );
});

test('server configuration accepts a production-style environment', () => {
  const config = loadConfig({
    NODE_ENV: 'production',
    PORT: '8080',
    JWT_SECRET: 'a-secure-secret-that-is-longer-than-32-characters',
    JWT_EXPIRES_IN: '4h',
    DATABASE_URL: 'postgres://example',
    DATABASE_SSL: 'true',
    APP_ORIGIN: 'https://gis.example.com',
  });
  assert.equal(config.PORT, 8080);
  assert.equal(config.databaseSsl, true);
});
