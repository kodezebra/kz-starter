import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const pages = sqliteTable('pages', {
  id: text('id').primaryKey(), // nanoid
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  parentId: text('parent_id').references((): any => pages.id, { onDelete: 'set null' }),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(false),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export const blocks = sqliteTable('blocks', {
  id: text('id').primaryKey(), // nanoid
  pageId: text('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  content: text('content').notNull(), // JSON string
  order: integer('order').notNull().default(0),
});

export type Page = typeof pages.$inferSelect;
export type Block = typeof blocks.$inferSelect;
