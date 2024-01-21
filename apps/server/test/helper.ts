import * as moduleAlias from 'module-alias'
moduleAlias.addAlias('~', __dirname + '/../src')
// This file contains code that we reuse between our tests.
import * as helper from 'fastify-cli/helper.js'
import * as path from 'path'
import * as test from 'node:test'

import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate as _migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { Client } from 'pg'
import { z } from 'zod'

export const env = (() => {
  const envSchema = z.object({
    TEST_DATABASE_URL: z.string(),
    TEST_DATABASE_HOST: z.string(),
    TEST_DATABASE_USER: z.string(),
    TEST_DATABASE_PASSWORD: z.string().optional(),
    TEST_DATABASE_PORT: z.string(),
    TEST_DATABASE_NAME: z.string(),
    TEST_GOOGLE_ID_TOKEN: z.string(),
    TEST_GITHUB_ACCESS_TOKEN: z.string(),
    TEST_GITHUB_USER_SUB: z.string(),
  })

  return envSchema.parse(process.env)
})()

export type TestContext = {
  after: typeof test.after
}

const AppPath = path.join(__dirname, '..', 'app.ts')

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {}
}

// Automatically build and tear down our instance
async function build(t: TestContext) {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath]

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await helper.build(argv, await config())

  // Tear down our app after we are done
  t.after(() => void app.close())

  return app
}

export class DbTestHelper {
  private testDbName: string
  private client: any

  constructor() {
    this.testDbName = env.TEST_DATABASE_NAME
  }

  async setUp() {
    console.log('Setting up test database...')

    await this.clientConnect()

    const res = await this.client.query(
      `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${this.testDbName}'`,
    )

    if (res.rowCount === 0) {
      console.log(`${this.testDbName} database not found, creating it.`)
      await this.client.query(`CREATE DATABASE "${this.testDbName}";`)
      console.log(`created database ${this.testDbName}.`)
    } else {
      console.log(`${this.testDbName} database already exists. Dropping it and recreating it...`)
      await this.client.query(`DROP DATABASE "${this.testDbName}";`)
      await this.client.query(`CREATE DATABASE "${this.testDbName}";`)
    }
    await this.client.end()

    const testDbUrl = `${env.TEST_DATABASE_URL}/${this.testDbName}`
    const migrationClient = postgres(testDbUrl, { max: 1 })
    await _migrate(drizzle(migrationClient), {
      migrationsFolder: ['src', 'infrastructure', 'database', 'drizzle'].join('/'),
    })
    await migrationClient.end()
    console.log('Test database setup complete')
  }

  async clientConnect() {
    console.log('Connecting to test database...')
    this.client = new Client({
      host: env.TEST_DATABASE_HOST,
      user: env.TEST_DATABASE_USER,
      password: env.TEST_DATABASE_PASSWORD,
      port: Number(env.TEST_DATABASE_PORT),
    })
    await this.client.connect()
  }
}

export { config, build }
