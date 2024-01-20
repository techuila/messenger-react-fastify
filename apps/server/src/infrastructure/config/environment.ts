import { z } from 'zod'
export const env = (() => {
  const envSchema = z.object({
    APP_URL: z.string(),
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
  })

  return envSchema.parse(process.env)
})()
