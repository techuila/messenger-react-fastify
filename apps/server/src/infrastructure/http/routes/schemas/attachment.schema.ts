import { z } from 'zod'

export const AttachmentSchema = z.object({
  id: z.string(),
  hashId: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  path: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().default(new Date().toISOString()),
})
