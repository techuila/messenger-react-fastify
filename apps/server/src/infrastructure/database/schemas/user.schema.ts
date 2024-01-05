import {
  serial,
  boolean,
  text,
  varchar,
  timestamp,
  pgTable,
} from 'drizzle-orm/pg-core'
import { Status } from '~/core/entities/user'

export const user = pgTable('user', {
  id: serial('id'),
  hashId: text('hash').notNull(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  photoUrl: varchar('photo_url'),
  token: text('token').notNull(),
  status: varchar('status', {
    enum: [Status.ONLINE, Status.OFFLINE],
  }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
