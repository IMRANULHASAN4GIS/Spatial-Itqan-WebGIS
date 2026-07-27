# Architecture

## Client

- `app.js` ? legacy GIS runtime and compatibility layer.
- `src/security/` ? restricted expression parsing.
- `src/storage/` ? durable IndexedDB project repository.
- `src/workers/` and `workers/` ? worker client and background computation.
- `src/ui/` ? task-oriented workspace controller.
- `mobile-pwa.js` ? device adaptation and PWA lifecycle.
- `service-worker.js` ? same-origin application-shell cache.

The modules expose intentionally small frozen APIs on `window` so the legacy
runtime can adopt them without global implementation details leaking between
subsystems.

## Service

The Express service is divided into configuration, authentication, database
and route modules. It supplies:

- signed JWT authentication;
- viewer/editor/admin roles;
- project ownership and membership;
- optimistic version checking;
- GeoJSON persistence and PostGIS geometry indexing;
- health checks, rate limits, validation and security headers.

## Data flow

1. GIS edits remain local and are checkpointed to IndexedDB.
2. The client exports a project document or sends it to `/api/projects`.
3. The API validates identity, authorization, document shape and version.
4. PostgreSQL stores project JSON; spatial layers additionally store indexed
   PostGIS geometry for future spatial querying.

## Remaining decomposition work

`app.js` still contains tightly coupled historical functionality. The safe
extraction order is map state, layer repository, import/export adapters,
editing commands, analysis commands and finally presentation. Each extraction
should add contract and browser tests before moving the next subsystem.
