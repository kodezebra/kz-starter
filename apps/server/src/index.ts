import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Bindings, Variables } from '@/types';
import { getAuth } from '@/lib/auth';
import v1Router from './routes/v1';
import { renderPage } from './pages';

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

app.use(cors({
  origin: (origin) => origin,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// Better Auth middleware to inject user/session into context
app.use('*', async (c, next) => {
  if (c.req.path.startsWith('/api/auth/')) {
    return next();
  }
  const auth = getAuth(c.env);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (session) {
    c.set('user', session.user);
    c.set('session', session.session);
  }
  await next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  const auth = getAuth(c.env);
  return auth.handler(c.req.raw);
});

// Public pages (SSR)
app.get('/', (c) => renderPage(c, ''));
app.get('/:slug', (c) => renderPage(c, c.req.param('slug')));

app.route('/v1', v1Router);

export default app;