import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const blog = sqliteTable('blog', {
  id: integer('id').primaryKey(),
  langkey: text('langkey').notNull(),
  title: text('title').notNull(),
  is_publish: integer('is_publish').notNull(),
  publish_date: text('publish_date').notNull(),
  content_markdown: text('content_markdown').notNull(),
  title_display: text('title_display').notNull(),
  created_by: text('created_by').notNull(),
  category: text('category').notNull(),
  created_date: text('created_date').notNull(),
  thumbnail_src: text('thumbnail_src'),
});
