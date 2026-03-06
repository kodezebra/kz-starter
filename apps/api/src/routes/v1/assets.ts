import { Hono } from 'hono'
import type { Bindings, Variables } from '@/types'
import { createId } from '@/lib/id'

const assetsRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>()

// Upload a file
assetsRouter.post('/upload', async (c) => {
  const body = await c.req.parseBody()
  const file = body['file'] as File

  if (!file) {
    return c.json({ error: 'No file uploaded' }, 400)
  }

  const id = createId()
  const extension = file.name.split('.').pop()
  const key = `${id}.${extension}`

  await c.env.ASSETS.put(key, file.stream(), {
    httpMetadata: { contentType: file.type }
  })

  // Return the URL to access the file
  return c.json({ 
    url: `/v1/assets/${key}`,
    key 
  })
})

// Get a file
assetsRouter.get('/:key', async (c) => {
  const key = c.req.param('key')
  const object = await c.env.ASSETS.get(key)

  if (!object) {
    return c.notFound()
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)

  return c.body(object.body, 200, {
    'Content-Type': headers.get('Content-Type') || 'application/octet-stream',
    'Cache-Control': 'public, max-age=31536000',
  })
})

export default assetsRouter
