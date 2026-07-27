import { defineConfig } from 'vite';
import { cpSync, copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  root: '.',
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        documentation: 'documentation.html',
      },
    },
    copyPublicDir: false,
  },
  plugins: [
    {
      name: 'copy-spatial-itqan-runtime',
      closeBundle() {
        const output = resolve('dist');
        mkdirSync(output, { recursive: true });
        [
          'app.js',
          'mobile-pwa.js',
          'service-worker.js',
          'manifest.webmanifest',
          'icon.png',
        ].forEach((file) => {
          copyFileSync(resolve(file), resolve(output, file));
        });
        ['src', 'workers', 'vendor'].forEach((directory) => {
          cpSync(resolve(directory), resolve(output, directory), { recursive: true });
        });
      },
    },
  ],
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://unpkg.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com; img-src 'self' data: blob: https:; connect-src 'self' https:; worker-src 'self' blob:; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'",
    },
  },
});
