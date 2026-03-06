import { Hono } from 'hono'
import { eq, asc, like } from 'drizzle-orm'
import type { Bindings, Variables } from '@/types'
import { getDb } from '@/db'
import { blocks } from '@/db/schema'
import { createId } from '@/lib/id'
import { extractAssetKeys, cleanupOrphanedAssets } from '@/utils/assets'

const blocksRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>()

// List all blocks for a page
blocksRouter.get('/page/:pageId', async (c) => {
  const db = getDb(c)
  const pageId = c.req.param('pageId')
  const data = await db.select().from(blocks).where(eq(blocks.pageId, pageId)).orderBy(asc(blocks.order)).execute()
  return c.json(data.map(b => ({ ...b, content: typeof b.content === 'string' ? JSON.parse(b.content) : b.content })))
})

// Replace all blocks for a page + Cleanup Orphans
blocksRouter.put('/page/:pageId', async (c) => {
  const db = getDb(c)
  const pageId = c.req.param('pageId')
  const newBlocks = await c.req.json<any[]>()
  
  // 1. Find potential orphans BEFORE updating
  const oldBlocks = await db.select().from(blocks).where(eq(blocks.pageId, pageId)).execute()
  const oldKeys = extractAssetKeys(oldBlocks)
  
  // 2. Perform the update
  await db.delete(blocks).where(eq(blocks.pageId, pageId)).execute()
  if (newBlocks.length > 0) {
    const blocksToInsert = newBlocks.map((b, i) => ({
      id: b.id?.length > 10 ? b.id : createId(),
      pageId,
      type: b.type,
      content: typeof b.content === 'string' ? b.content : JSON.stringify(b.content),
      order: i
    }))
    await db.insert(blocks).values(blocksToInsert).execute()
  }

  // 3. Background cleanup using the GENERIC utility
  const newKeys = extractAssetKeys(newBlocks)
  
  c.executionCtx.waitUntil(
    cleanupOrphanedAssets(c.env.ASSETS, oldKeys, newKeys, async (key) => {
      // Logic specific to this route: search the blocks table
      const [stillUsed] = await db.select().from(blocks).where(like(blocks.content, `%${key}%`)).limit(1).execute()
      return !!stillUsed
    })
  )
  
  return c.json({ success: true })
})

export default blocksRouter