import { z } from 'zod'
export const env = (() => {
  const envSchema = z.object({
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  })

  return envSchema.parse(process.env)
})()
