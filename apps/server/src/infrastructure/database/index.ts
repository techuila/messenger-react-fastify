import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate as _migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { env } from '~/infrastructure/config/environment'

export const migrate = {
  async sync() {
    try {
      const migrationClient = postgres(env.DATABASE_URL, { max: 1 })
      await _migrate(drizzle(migrationClient), {
        migrationsFolder: ['src', 'infrastructure', 'database', 'drizzle'].join('/'),
      })

      await migrationClient.end()
    } catch (error) {
      console.error(error)
    }
  },
}

export const db = drizzle(postgres(env.DATABASE_URL))
