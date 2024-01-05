import { z } from 'zod'

export const ChatSchema = z.object({
  id: z.number(),
  hashId: z.string(),
  userChannelId: z.string(),
  userId: z.string(),
  replyToChatId: z.string().nullable(),
  content: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().default(new Date().toISOString()),
})
