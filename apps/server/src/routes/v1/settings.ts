import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import type { Bindings, Variables } from '@/types';
import { getDb } from '@/db';
import { settings } from '@/db/schema';

const settingsRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>();

// Get site settings
settingsRouter.get('/', async (c) => {
  const db = getDb(c);
  let [data] = await db.select().from(settings).where(eq(settings.id, 'global')).execute();

  if (!data) {
    const defaultSettings = {
      id: 'global',
      siteName: 'My Site',
      siteDescription: '',
    };
    await db.insert(settings).values(defaultSettings).execute();
    data = defaultSettings as any;
  }

  return c.json(data);
});

// Update site settings
settingsRouter.put('/', async (c) => {
  const db = getDb(c);
  const body = await c.req.json();

  const updateData = {
    siteName: body.siteName,
    siteDescription: body.siteDescription,
    headerBlockId: body.headerBlockId,
    footerBlockId: body.footerBlockId,
  };

  await db.update(settings)
    .set(updateData)
    .where(eq(settings.id, 'global'))
    .execute();

  return c.json({ success: true });
});

export default settingsRouter;
