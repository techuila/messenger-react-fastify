import { FastifyPluginAsync, FastifyReply } from 'fastify'
import { Token } from '@fastify/oauth2'
import fetch from 'node-fetch'

import { env } from '~/infrastructure/config/environment'
import { User } from '~/core/entities/user'
import { UserService } from '~/core/services/users.service'
import { UserRepository } from '~/infrastructure/repositories/user.repository'

const oauth: FastifyPluginAsync = async (fastify) => {
  fastify.get('/google/callback', async function (request, reply): Promise<void> {
    const { token } = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user_info = (await this.googleOAuth2.userinfo(token)) as Record<string, any>

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    const user = await userService.createUserIfDoesntExist({
      sub: user_info.sub,
      name: user_info.name,
      photoUrl: user_info.picture,
      email: user_info.email,
    })

    // Set a cookie before redirecting
    setCookies(reply, token, user)

    reply.redirect(env.APP_URL)
  })

  fastify.get('/github/callback', async function (request, reply): Promise<void> {
    const { token } = await this.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    const user_info = await fetch('https://api.github.com/user', {
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

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)

    const user = await userService.createUserIfDoesntExist({
      sub: user_info.id,
      name: user_info.name,
      photoUrl: user_info.avatar_url,
      email: user_info.email || '',
    })

    // Set a cookie before redirecting
    setCookies(reply, token, user)

    reply.redirect(env.APP_URL)
  })
}

function setCookies(reply: FastifyReply, token: Token, user: User) {
  reply.setCookie('tk', JSON.stringify(token), { path: '/', httpOnly: true, secure: true })
  reply.setCookie('info', JSON.stringify(user), { path: '/', httpOnly: true, secure: true })
}

export default oauth
