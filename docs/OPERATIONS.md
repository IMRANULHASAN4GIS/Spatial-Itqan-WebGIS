# Operations

Monitor API availability, response latency, HTTP 401/403/429/500 rates,
PostgreSQL connections, database size and backup age.

Back up the database at least daily and retain a tested recovery chain suitable
for the organization's recovery-point objective. Test restoration quarterly.

Rotate the JWT secret through a planned maintenance window because rotation
invalidates existing sessions. Disable bootstrap administrator environment
variables after the initial account is created.

Do not log JWTs, passwords, uploaded GIS content or precise user locations.
Place infrastructure logs behind role-based access and an appropriate retention
policy.
