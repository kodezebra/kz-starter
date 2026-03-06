import { Hono } from 'hono'
import type { Bindings, Variables } from '@/types'
import pagesRouter from './pages'
import blocksRouter from './blocks'
import assetsRouter from './assets'

const v1Router = new Hono<{ Bindings: Bindings, Variables: Variables }>()

v1Router.route('/pages', pagesRouter)
v1Router.route('/blocks', blocksRouter)
v1Router.route('/assets', assetsRouter)

export default v1Router