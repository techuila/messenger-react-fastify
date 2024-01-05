import { serial, text, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const attachment = pgTable('attachment', {
  id: serial('id'),
  hashId: text('hash').notNull(),
  name: varchar('name').notNull(),
  size: varchar('size').notNull(),
  type: varchar('type').notNull(),
  path: varchar('path').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
