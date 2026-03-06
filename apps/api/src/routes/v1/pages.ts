import { Hono } from 'hono'
import { eq, desc } from 'drizzle-orm'
import type { Bindings, Variables } from '@/types'
import { getDb } from '@/db'
import { pages } from '@/db/schema'
import { createId } from '@/lib/id'

const pagesRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>()

// List all pages
pagesRouter.get('/', async (c) => {
  const db = getDb(c)
  return c.json(await db.select().from(pages).orderBy(desc(pages.updatedAt)).execute())
})

// Get single page by ID or Slug
pagesRouter.get('/:idOrSlug', async (c) => {
  const db = getDb(c)
  const idOrSlug = c.req.param('idOrSlug')
  let [page] = await db.select().from(pages).where(eq(pages.id, idOrSlug)).execute()
  if (!page) [page] = await db.select().from(pages).where(eq(pages.slug, idOrSlug)).execute()
  if (!page) return c.notFound()
  return c.json(page)
})

// Create page (Metadata only)
pagesRouter.post('/', async (c) => {
  const db = getDb(c)
  const data = await c.req.json()
  const id = createId()
  await db.insert(pages).values({ ...data, id, updatedAt: new Date() }).execute()
  return c.json({ id }, 201)
})

// Update page (Metadata only)
pagesRouter.put('/:id', async (c) => {
  const db = getDb(c)
  const id = c.req.param('id')
  const data = await c.req.json()
  // Ensure we don't try to update id
  const { id: _, ...updates } = data
  await db.update(pages).set({ ...updates, updatedAt: new Date() }).where(eq(pages.id, id)).execute()
  return c.json({ success: true })
})

// Delete page
pagesRouter.delete('/:id', async (c) => {
  const db = getDb(c)
  const id = c.req.param('id')
  await db.delete(pages).where(eq(pages.id, id)).execute()
  return c.json({ success: true })
})

export default pagesRouter
