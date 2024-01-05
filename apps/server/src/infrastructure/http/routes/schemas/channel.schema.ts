import { z } from 'zod'

export const ChannelSchema = z.object({
  id: z.number(),
  hashId: z.string(),
  name: z.string(),
  photoUrl: z.string().url().nullable(),
  isDirectMessage: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().default(new Date().toISOString()),
})
