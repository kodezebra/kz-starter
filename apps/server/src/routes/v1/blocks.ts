import { Hono } from 'hono';
import { eq, asc, like, inArray, isNull } from 'drizzle-orm';
import type { Bindings, Variables } from '@/types';
import { getDb } from '@/db';
import { blocks } from '@/db/schema';
import { createId } from '@/lib/id';
import { extractAssetKeys, cleanupOrphanedAssets } from '@/utils/assets';

const blocksRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>();

// List all blocks for a page
blocksRouter.get('/page/:pageId', async (c) => {
  const db = getDb(c);
  const pageId = c.req.param('pageId');

  let data;
  if (pageId === 'global') {
    data = await db.select().from(blocks).where(isNull(blocks.pageId)).orderBy(asc(blocks.order)).execute();
  } else {
    data = await db.select().from(blocks).where(eq(blocks.pageId, pageId)).orderBy(asc(blocks.order)).execute();
  }

  const mapped = data.map(b => {
    let content = b.content;
    if (typeof content === 'string') {
      try {
        content = JSON.parse(content);
      } catch (e) {
        console.warn(`[API] Failed to parse block content for id: ${b.id}`);
      }
    }
    return { ...b, content };
  });

  return c.json(mapped);
});

// Get specific blocks by IDs
blocksRouter.get('/batch', async (c) => {
  const db = getDb(c);
  const ids = c.req.query('ids')?.split(',') || [];
  if (ids.length === 0) return c.json([]);

  const data = await db.select().from(blocks).where(inArray(blocks.id, ids)).execute();

  const mapped = data.map(b => {
    let content = b.content;
    if (typeof content === 'string') {
      try {
        content = JSON.parse(content);
      } catch (e) {
        console.warn(`[API] Failed to parse block content for id: ${b.id}`);
      }
    }
    return { ...b, content };
  });

  return c.json(mapped);
});

// Replace all blocks for a page
blocksRouter.put('/page/:pageId', async (c) => {
  const db = getDb(c);
  const pageId = c.req.param('pageId');
  const newBlocks = await c.req.json<any[]>();

  const query = pageId === 'global' ? isNull(blocks.pageId) : eq(blocks.pageId, pageId);
  const oldBlocks = await db.select().from(blocks).where(query).execute();
  const oldKeys = extractAssetKeys(oldBlocks);

  await db.delete(blocks).where(query).execute();
  if (newBlocks.length > 0) {
    const blocksToInsert = newBlocks.map((b, i) => ({
      id: b.id?.length > 10 ? b.id : createId(),
      pageId: pageId === 'global' ? null : pageId,
      type: b.type,
      content: typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
      order: i
    }));
    await db.insert(blocks).values(blocksToInsert).execute();
  }

  const newKeys = extractAssetKeys(newBlocks);

  c.executionCtx.waitUntil(
    cleanupOrphanedAssets(c.env.ASSETS, oldKeys, newKeys, async (key) => {
      const [stillUsed] = await db.select().from(blocks).where(like(blocks.content, `%${key}%`)).limit(1).execute();
      return !!stillUsed;
    })
  );

  return c.json({ success: true });
});

export default blocksRouter;
