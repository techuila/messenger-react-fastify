import * as moduleAlias from 'module-alias'
moduleAlias.addAlias('~', __dirname + '/../src')
// This file contains code that we reuse between our tests.
import * as helper from 'fastify-cli/helper.js'
import * as path from 'path'
import * as test from 'node:test'
import { z } from 'zod'

export const env = (() => {
  const envSchema = z.object({
    SAMPLE_GOOGLE_ID_TOKEN: z.string(),
    SAMPLE_GITHUB_ACCESS_TOKEN: z.string(),
    SAMPLE_GITHUB_USER_SUB: z.string(),
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

export { config, build }
