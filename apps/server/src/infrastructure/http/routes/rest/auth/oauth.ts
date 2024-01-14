import { FastifyPluginAsync } from 'fastify'
import fetch from 'node-fetch'

const oauth: FastifyPluginAsync = async (fastify) => {
  fastify.get('/google/callback', async function (request, reply) {
    const { token } =
      await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    const user_info = await this.githubOAuth2.userinfo(token)

    reply.send({
      access_token: token.access_token,
      user_info,
    })
  })

  fastify.get('/github/callback', async function (request, reply) {
    const { token } =
      await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token.access_token}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })

    reply.send({
      access_token: token.access_token,
      user_info: response,
    })
  })
}

export default oauth
