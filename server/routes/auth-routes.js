import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(8).max(256),
});

export function authRoutes({ db, auth }) {
  const router = Router();
  router.post('/login', async (req, res, next) => {
    try {
      const input = loginSchema.parse(req.body);
      const result = await db.query(
        'SELECT id, email, password_hash, role, disabled FROM app_user WHERE lower(email)=lower($1)',
        [input.email]
      );
      const user = result.rows[0];
      if (!user || user.disabled || !(await bcrypt.compare(input.password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      await db.query('UPDATE app_user SET last_login_at=now() WHERE id=$1', [user.id]);
      return res.json({
        token: auth.issue(user),
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch (error) {
      return next(error);
    }
  });
  router.get('/me', auth.requireUser, (req, res) => res.json({ user: req.user }));
  return router;
}
