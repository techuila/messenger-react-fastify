/* c8 ignore next 999 */
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate as _migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import { env } from '~/infrastructure/config/environment'
import { env as _env } from '~/../test/helper'

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

let DATABASE_URL = env.DATABASE_URL

if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = _env.TEST_DATABASE_URL + '/' + _env.TEST_DATABASE_NAME
}

export const client = postgres(DATABASE_URL)
export const db = drizzle(client)
