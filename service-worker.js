const CACHE_NAME = 'spatial-itqan-shell-v1.1.0-r7';
const APP_SHELL = [
  './',
  './index.html',
  './documentation.html',
  './app.js',
  './mobile-pwa.js',
  './src/security/restricted-expression.js',
  './src/storage/indexeddb-storage.js',
  './src/workers/geo-worker-client.js',
  './src/ui/workspace-controller.js',
  './src/api/client.js',
  './src/ui/documentation.js',
  './src/ui/documentation-page.js',
  './workers/geo-worker.js',
  './manifest.webmanifest',
  './icon.png',
  './vendor/shpwrite.js',
  './vendor/shp-write-LICENSE.txt'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      const refreshed = fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || refreshed;
    })
  );
});
