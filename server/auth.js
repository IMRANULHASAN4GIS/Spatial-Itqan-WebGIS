import jwt from 'jsonwebtoken';

export function createAuth(config) {
  function issue(user) {
    return jwt.sign({ sub: user.id, email: user.email, role: user.role }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
      issuer: 'spatial-itqan',
      audience: 'spatial-itqan-web',
    });
  }

  function requireUser(req, res, next) {
    const header = req.get('authorization') || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    try {
      req.user = jwt.verify(token, config.JWT_SECRET, {
        issuer: 'spatial-itqan',
        audience: 'spatial-itqan-web',
      });
      return next();
    } catch {
      return res.status(401).json({ error: 'Invalid or expired authentication token' });
    }
  }

  function requireRole(...roles) {
    return function roleMiddleware(req, res, next) {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Insufficient permission' });
      }
      return next();
    };
  }

  return { issue, requireUser, requireRole };
}
