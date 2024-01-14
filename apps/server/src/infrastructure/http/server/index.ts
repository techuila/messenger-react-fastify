import { AutoloadPluginOptions } from '@fastify/autoload'
import { FastifyServerOptions } from 'fastify'
import AutoLoad from '@fastify/autoload'
import { join } from 'path'
import { FastifyPluginAsync } from 'fastify'
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
export const options: AppOptions = {}

export const createServer: (_: () => void) => FastifyPluginAsync<AppOptions> =
  (cb: () => void) =>
  async (fastify, opts): Promise<void> => {
    // Place here your custom code!
    cb()

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
      dir: join(__dirname, '..', 'plugins'),
      options: opts,
    })

    // This loads all plugins defined in routes/rest
    // define your routes/rest in one of these
    void fastify.register(AutoLoad, {
      dir: join(__dirname, '..', 'routes', 'rest'),
      dirNameRoutePrefix: true,
      options: opts,
    })

    // This loads all plugins defined in routes/trpc
    // define your routes/trpc in one of these
    void fastify.register(AutoLoad, {
      dir: join(__dirname, '..', 'routes', 'trpc'),
      options: opts,
    })
  }
