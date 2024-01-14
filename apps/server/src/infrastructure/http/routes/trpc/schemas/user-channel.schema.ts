import { z } from 'zod'
import { Status } from '~/core/entities/user-channel'

export const UserChannelSchema = z.object({
  id: z.number(),
  hashId: z.string(),
  userId: z.string(),
  channelId: z.string(),
  nickname: z.string().nullable(),
  status: z.union([z.literal(Status.JOINED), z.literal(Status.LEFT), z.literal(Status.KICKED)]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().default(new Date().toISOString()),
})
