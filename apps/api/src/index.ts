import { Hono } from 'hono'
import { cors } from 'hono/cors' // Import cors middleware
import type { Bindings, Variables } from '@/types'
import v1Router from './routes/v1'

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>()

// Apply CORS middleware to all routes
app.use(cors())

app.get('/', (c) => {
  return c.text('KZ CMS API')
})

app.route('/v1', v1Router)

export default app