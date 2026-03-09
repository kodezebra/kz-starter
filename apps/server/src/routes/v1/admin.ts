import { Hono } from 'hono';
import { getAuth } from '@/lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from '@/db/schema';
import type { Bindings } from '@/types';

const adminRouter = new Hono<{ Bindings: Bindings }>();

/**
 * POST /v1/admin/create-initial
 * 
 * Creates the initial admin user. Self-disables after first user is created.
 */
adminRouter.post('/create-initial', async (c) => {
  const env = c.env;
  const auth = getAuth(env);
  const db = drizzle(env.DB, { schema });

  // Check if any user already exists
  const existingUser = await db.query.user.findFirst();

  if (existingUser) {
    return c.json({ 
      error: 'Admin already exists',
      message: 'This endpoint is disabled after the first user is created'
    }, 403);
  }

  let body: { email: string; password: string; name: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400);
  }

  const { email, password, name } = body;

  if (!email || !password || !name) {
    return c.json({ error: 'Missing required fields: email, password, name' }, 400);
  }

  if (password.length < 8) {
    return c.json({ error: 'Password must be at least 8 characters' }, 400);
  }

  // Create user via better-auth server API
  const result = await auth.api.signUpEmail({
    body: { email, password, name },
  });

  if (!result.user) {
    return c.json({ error: 'Failed to create user' }, 500);
  }

  // Promote to admin role
  await db.update(schema.user)
    .set({ role: 'admin' })
    .where(eq(schema.user.email, email));

  return c.json({ 
    message: 'Admin user created successfully',
    user: {
      id: result.user.id,
      email: result.user.email,
      name: result.user.name,
      role: 'admin'
    }
  }, 201);
});

/**
 * GET /v1/admin/status
 * 
 * Check if admin has been created.
 */
adminRouter.get('/status', async (c) => {
  const env = c.env;
  const db = drizzle(env.DB, { schema });

  const admin = await db.query.user.findFirst({
    where: eq(schema.user.role, 'admin'),
  });

  return c.json({
    hasAdmin: !!admin
  });
});

export default adminRouter;
