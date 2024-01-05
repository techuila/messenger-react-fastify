import { AutoloadPluginOptions } from '@fastify/autoload'
import { FastifyServerOptions } from 'fastify'
import AutoLoad from '@fastify/autoload'
import { join } from 'path'
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify'
import { FastifyPluginAsync } from 'fastify'
import { appRouter, type AppRouter } from '~/infrastructure/http/routes'
import { createContext } from '~/infrastructure/http/utils/context'
import cors from '@fastify/cors'

export interface AppOptions
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}
// Pass --options via CLI arguments in command to enable these options.
export const options: AppOptions = {}

export const createServer: (_: () => void) => FastifyPluginAsync<AppOptions> =
  (cb: () => void) =>
  async (fastify, opts): Promise<void> => {
    // Place here your custom code!
    cb()

    void fastify.register(cors, {
      hook: 'preHandler',
    })

    void fastify.register(fastifyTRPCPlugin, {
      prefix: '/trpc',
      trpcOptions: {
        router: appRouter,
        createContext,
        onError({ path, error }) {
          // report to error monitoring
          console.error(`[trpc] [${path}]: `, error)
        },
      } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
    })
    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
      dir: join(__dirname, '..', 'plugins'),
      options: opts,
    })

    // This loads all plugins defined in routes
    // define your routes in one of these
    void fastify.register(AutoLoad, {
      dir: join(__dirname, '..', 'routes'),
      options: opts,
    })
  }
