# Production deployment

## Requirements

- Node.js 22 or the supplied container image
- PostgreSQL 16 with PostGIS 3.4
- HTTPS reverse proxy
- persistent database backups

## Container deployment

Create a `.env` file containing strong values:

```text
POSTGRES_PASSWORD=generated-database-password
JWT_SECRET=generated-random-secret-of-at-least-32-characters
APP_ORIGIN=https://gis.example.com
BOOTSTRAP_ADMIN_EMAIL=admin@example.com
BOOTSTRAP_ADMIN_PASSWORD=generated-one-time-admin-password
```

Start the services:

```bash
docker compose up --build -d
```

Terminate HTTPS at the ingress proxy and forward requests to port 8080. Do not
publish PostgreSQL to the public network.

## Upgrade procedure

1. Back up PostgreSQL and test restoration.
2. Run dependency audit and automated checks.
3. Apply new migrations in a staging database.
4. Build and smoke-test the client at desktop, tablet and phone sizes.
5. Deploy the API, verify `/api/health`, then deploy the client.
6. Change the service-worker cache version when application-shell files change.

## Offline limitations

The local application shell can open offline. CDN libraries and third-party
basemaps, imagery, routing, geocoding and weather remain network-dependent.
Confidential or disconnected deployments should mirror approved libraries and
provide organization-hosted tile and routing services.
