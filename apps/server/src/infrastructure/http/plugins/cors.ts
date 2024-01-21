import fp from 'fastify-plugin'
import cors from '@fastify/cors'
import { env } from '~/infrastructure/config/environment'

export default fp(
  async (fastify) => {
    await fastify.register(cors, {
      hook: 'preHandler',
      origin: (origin, cb) => {
        // Allow requests from your React application's domain
        if (origin === env.APP_URL) {
          cb(null, true)
          return
        }

        // For requests without an origin (like HTTP/1.1 requests), allow
        if (!origin) {
          cb(null, true)
          return
        }

        // Otherwise, disallow
        cb(new Error('Not allowed'), false)
      },
      credentials: true,
    })
  },
  { name: 'cors' },
)
