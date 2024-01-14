import { z } from 'zod'
import { Status } from '~/core/entities/user'

export const UserSchema = z.object({
  id: z.number(),
  sub: z.string(),
  hashId: z.string(),
  name: z.string(),
  email: z.string().email(),
  photoUrl: z.string().url().nullable(),
  status: z.union([z.literal(Status.ONLINE), z.literal(Status.OFFLINE)]),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().default(new Date().toISOString()),
})
