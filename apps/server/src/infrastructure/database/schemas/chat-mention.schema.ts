import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const chatMention = pgTable('chat_mention', {
  id: serial('id'),
  hashId: text('hash').notNull(),
  chatId: text('chat_id').notNull(),
  userId: text('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
