import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export default fp(async (fastify) => {
  void fastify.register(cors, {
    hook: 'preHandler',
  })
})
