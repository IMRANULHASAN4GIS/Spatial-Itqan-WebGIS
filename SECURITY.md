# Security policy

## Supported release

Security fixes are provided for the latest `10.x` release. Earlier archives
should be considered unsupported.

## Reporting a vulnerability

Do not open a public issue containing exploit details, credentials or private
GIS data. Send the report to the security contact configured by the deploying
organization. Include the affected version, reproduction steps, impact and a
minimal non-sensitive test file when needed.

The deploying organization should acknowledge a report within two business
days, provide an initial assessment within five business days and coordinate
disclosure after a fix is available.

## Security properties

- Field expressions are parsed by an allowlisted calculator and are never
  executed as JavaScript.
- API passwords are stored as bcrypt hashes.
- API sessions use signed, expiring JWTs with issuer and audience validation.
- API routes enforce authentication and project ownership.
- Project updates use optimistic version checks to prevent silent overwrites.
- Request bodies and inputs are size-limited and schema-validated.
- Login and API endpoints are rate-limited.
- Helmet supplies security headers and a deployment CSP.
- Production dependencies are lock-file controlled and audited in CI.
- PostGIS queries use parameterized SQL.

## Deployment responsibilities

- Generate a random JWT secret of at least 32 characters.
- Terminate TLS at a trusted reverse proxy and redirect HTTP to HTTPS.
- Restrict PostgreSQL to the private application network.
- Replace bootstrap credentials after first login.
- Configure backups, log retention and monitoring.
- Review external basemap, routing, weather and imagery providers before use
  with confidential data.
- Remove Google Analytics if organizational privacy rules prohibit it.

The current browser UI still contains inline styling and initialization code.
Its CSP therefore allows inline script/style execution for compatibility.
Removing all inline code and eliminating that allowance remains a recommended
defense-in-depth follow-up.
