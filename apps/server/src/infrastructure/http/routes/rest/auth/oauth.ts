import { FastifyPluginAsync } from 'fastify'
import { AuthController } from '~/infrastructure/http/controllers/auth.controller'

const oauth: FastifyPluginAsync = async (fastify) => {
  const authController = new AuthController(fastify)

  fastify.get('/google/callback', authController.googleCallback)

  fastify.get('/github/callback', authController.githubCallback)

  fastify.get('/verifyToken', authController.verifyToken)
}

export default oauth
