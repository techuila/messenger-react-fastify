import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core'

export const chat = pgTable('chat', {
  id: serial('id'),
  hashId: text('hash').notNull(),
  userChannelId: text('user_channel_id').notNull(),
  userId: text('user_id').notNull(),
  replyToChatId: text('reply_to_chat_id'),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
