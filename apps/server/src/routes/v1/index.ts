import { Hono } from 'hono';
import type { Bindings, Variables } from '@/types';
import pagesRouter from './pages';
import blocksRouter from './blocks';
import assetsRouter from './assets';
import settingsRouter from './settings';
import adminRouter from './admin';

const v1Router = new Hono<{ Bindings: Bindings, Variables: Variables }>();

v1Router.route('/pages', pagesRouter);
v1Router.route('/blocks', blocksRouter);
v1Router.route('/assets', assetsRouter);
v1Router.route('/settings', settingsRouter);
v1Router.route('/admin', adminRouter);

v1Router.get('/me', (c) => {
  const user = c.get('user');
  const session = c.get('session');
  if (!user) return c.json({ user: null, session: null });
  return c.json({ user, session });
});

export default v1Router;