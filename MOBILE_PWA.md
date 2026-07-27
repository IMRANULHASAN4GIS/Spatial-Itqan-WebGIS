# Mobile and installable app support

Spatial Itqan now adapts to phone, tablet and desktop layouts and can be
installed as a Progressive Web App (PWA).

## Device adaptation

- Detects phone, tablet or desktop form factor.
- Detects the operating-system family, touch capability, screen resolution,
  viewport size and device pixel ratio.
- Responds to orientation changes and mobile browser viewport/keyboard changes.
- Uses larger touch targets and safe-area padding for notched devices.
- Presents the layer panel and attribute table as mobile bottom sheets.
- Preserves a full-width map and horizontally scrollable GIS tool ribbon.

The detected capabilities are exposed to integrations as
`window.SpatialItqanDevice`.

## Installation

The app must be hosted on HTTPS, or on localhost during development.

- **Android / desktop Chromium:** use the in-app **Install** button or the
  browser's **Install app** command.
- **iPhone / iPad:** open Safari's Share menu and choose
  **Add to Home Screen**.

Opening `index.html` directly with a `file://` URL cannot register a service
worker and therefore cannot provide normal PWA installation.

## Offline behavior

The service worker caches the local application shell. Previously viewed local
files can launch offline, but online basemaps, search, weather, routing, imagery
and CDN-hosted GIS libraries still require network availability. For a fully
offline deployment, bundle those third-party libraries and an offline basemap.

When deploying an updated release, change `CACHE_NAME` in `service-worker.js`
so installed clients receive a fresh app shell.
