import { serial, text, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { Status } from '~/core/entities/user-channel'

export const userChannel = pgTable('user_channel', {
  id: serial('id'),
  hashId: text('hash').notNull(),
  name: text('channel_id').notNull(),
  userId: text('user_id').notNull(),
  nickname: varchar('nickname'),
  status: varchar('status', {
    enum: [Status.JOINED, Status.LEFT, Status.KICKED],
  }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
