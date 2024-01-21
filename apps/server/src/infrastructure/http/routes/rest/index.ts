import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async function (request, reply) {
    reply.send({ root: true })
  })
}

export default root
