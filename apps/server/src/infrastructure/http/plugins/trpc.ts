import fp from 'fastify-plugin'
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify'
import { appRouter, type AppRouter } from '~/infrastructure/http/routes/trpc'
import { createContext } from '~/infrastructure/utils/context'

export default fp(
  async (fastify) => {
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
  },
  { dependencies: ['cors'] },
)
