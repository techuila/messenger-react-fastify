import { env } from '~/infrastructure/config/environment'
import type { Config } from 'drizzle-kit'

const database_dir = ['src', 'infrastructure', 'database']

export default {
  schema: [...database_dir, 'schemas'].join('/'),
  out: [...database_dir, 'drizzle'].join('/'),
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config
