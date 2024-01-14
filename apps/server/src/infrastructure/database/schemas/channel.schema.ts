import { serial, text, varchar, boolean, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const channel = pgTable('channel', {
  id: serial('id'),
  hashId: text('hash').notNull(),
  name: varchar('name').notNull(),
  photoUrl: varchar('photo_url'),
  isDirectMessage: boolean('is_direct_message').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
