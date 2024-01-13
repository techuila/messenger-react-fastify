import { FastifyPluginAsync } from 'fastify'
import { google } from 'googleapis'

const oauth: FastifyPluginAsync = async (fastify) => {
  fastify.get('/google/callback', async function (request, reply) {
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    // const oauth2 = google.oauth2('v2')
    // oauth2.userinfo.get({ auth: token } )

    console.log(this.googleOAuth2.userinfo(token))

    // if later you need to refresh the token you can use
    // const { token: newToken } = await this.getNewAccessTokenUsingRefreshToken(token)

    reply.send({
      access_token: token.access_token,
      user_info: await this.googleOAuth2.userinfo(token),
    })
  })
}

export default oauth
