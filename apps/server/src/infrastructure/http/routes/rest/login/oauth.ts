import { FastifyPluginAsync } from 'fastify'

const oauth: FastifyPluginAsync = async (fastify) => {
  fastify.get('/google/callback', async function (request, reply) {
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    reply.send({
      access_token: token.access_token,
      user_info: await this.googleOAuth2.userinfo(token),
    })
  })
}

export default oauth
