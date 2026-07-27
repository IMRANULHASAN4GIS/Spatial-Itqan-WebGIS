import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { loadConfig } from './config.js';
import { createDatabase } from './db.js';
import { createAuth } from './auth.js';
import { authRoutes } from './routes/auth-routes.js';
import { projectRoutes } from './routes/project-routes.js';

const config = loadConfig();
const db = createDatabase(config);
const auth = createAuth(config);
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://www.googletagmanager.com',
          'https://unpkg.com',
          'https://cdnjs.cloudflare.com',
          'https://cdn.jsdelivr.net',
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://unpkg.com',
          'https://cdnjs.cloudflare.com',
        ],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        connectSrc: ["'self'", 'https:'],
        workerSrc: ["'self'", 'blob:'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(
  cors({ origin: config.APP_ORIGIN, credentials: false, methods: ['GET', 'POST', 'PUT', 'DELETE'] })
);
app.use(express.json({ limit: '25mb', type: ['application/json', 'application/geo+json'] }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 500, standardHeaders: 'draft-8' }));
app.use(
  '/api/auth/login',
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, skipSuccessfulRequests: true })
);

app.get('/api/health', async (_req, res, next) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', time: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});
app.use('/api/auth', authRoutes({ db, auth }));
app.use('/api/projects', projectRoutes({ db, auth }));
app.use(
  express.static('.', { extensions: ['html'], maxAge: config.NODE_ENV === 'production' ? '1h' : 0 })
);

app.use((error, _req, res, _next) => {
  if (error instanceof ZodError)
    return res.status(400).json({ error: 'Invalid request', issues: error.issues });
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
});

async function bootstrapAdmin() {
  if (!config.BOOTSTRAP_ADMIN_EMAIL || !config.BOOTSTRAP_ADMIN_PASSWORD) return;
  const passwordHash = await bcrypt.hash(config.BOOTSTRAP_ADMIN_PASSWORD, 12);
  await db.query(
    `INSERT INTO app_user(email,password_hash,role)
     VALUES($1,$2,'admin') ON CONFLICT(lower(email)) DO NOTHING`,
    [config.BOOTSTRAP_ADMIN_EMAIL, passwordHash]
  );
}

await bootstrapAdmin();
const server = app.listen(config.PORT, () => {
  console.warn(`Spatial Itqan API listening on port ${config.PORT}`);
});

async function shutdown() {
  server.close(async () => {
    await db.close();
    process.exit(0);
  });
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
