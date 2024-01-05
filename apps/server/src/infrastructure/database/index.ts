import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate as _migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { environment } from '~/infrastructure/config/environment'

export const migrate = {
  async sync() {
    try {
      const migrationClient = postgres(environment.database.url, { max: 1 })
      await _migrate(drizzle(migrationClient), {
        migrationsFolder: 'drizzle',
      })

      await migrationClient.end()
    } catch (error) {
      console.error(error)
    }
  },
}
