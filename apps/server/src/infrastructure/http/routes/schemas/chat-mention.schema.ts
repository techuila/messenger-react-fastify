import { z } from 'zod'

export const ChatMentionSchema = z.object({
  id: z.number(),
  hashId: z.string(),
  chatId: z.number(),
  userId: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().default(new Date().toISOString()),
})
