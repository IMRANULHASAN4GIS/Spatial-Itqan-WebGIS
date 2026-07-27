# Spatial Itqan WebGIS 1.1.0

Spatial Itqan is a responsive, installable GIS workstation with an optional
authenticated Node.js/PostGIS service for shared project persistence.

## Capabilities in version 1.1.0

- Mobile, tablet and desktop adaptation with installable PWA support.
- Seven professional GIS themes with consistent semantic states: Professional
  Navy, Survey White, Graphite GIS, Desert Survey, Graphite, Arctic and
  Midnight.
- A complete in-app documentation center covering every available interface
  control, with search, category navigation and a downloadable manual.
- A dedicated `documentation.html` software manual with independent navigation,
  worked examples, complete tool tables, troubleshooting and print/PDF support.
- Task workspaces for Data, Edit, Analyze and Present workflows.
- Restricted field-expression parser with no dynamic JavaScript execution.
- IndexedDB project and autosave persistence, with localStorage fallback.
- Esri-style neutral first launch with automatic last-map-view restoration on the same device.
- Basemap-aware digital overzoom to level 28 while respecting each provider's native tile resolution.
- Web Worker infrastructure for large feature summaries and coordinate QA.
- Authenticated Express API with roles, rate limiting and optimistic locking.
- PostgreSQL/PostGIS persistence with spatial indexes.
- Locked npm dependencies, ESLint, Prettier, automated tests and CI.
- Docker and Compose deployment templates.
- Security, deployment, architecture and operations documentation.

## Local client development

```bash
npm ci --ignore-scripts
npm run dev
```

Open the URL printed by Vite. PWA installation works on HTTPS or localhost.

## GitHub Pages

The included Pages workflow validates and deploys `dist/` whenever `main` is
updated. In repository Settings → Pages, select **GitHub Actions** as the source.

## Verification

```bash
npm run lint
npm test
npm run test:security
npm run build
npm run audit:prod
```

## Enterprise service

Copy `.env.example` to `.env`, replace every example secret and apply
`server/migrations/001_initial.sql` to a PostgreSQL database with PostGIS.
Then run:

```bash
npm run start:api
```

For an isolated deployment, use `compose.yml`; see `docs/DEPLOYMENT.md`.

## Current compatibility boundary

The mature GIS implementation remains in `app.js` to avoid breaking its many
interdependent tools. New security, storage, worker, workspace and server
responsibilities are separated into modules under `src/` and `server/`.
Further extraction of map/editing/import/export subsystems should be performed
incrementally with browser regression tests rather than as a mechanical split.
