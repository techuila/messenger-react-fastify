/* c8 ignore next 999 */
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import { env } from '~/infrastructure/config/environment'
import { setAuthCookies } from '~/infrastructure/utils/http'
import { AuthService } from '~/core/services/auth.service'
import { UserService } from '~/core/services/users.service'
import { UserRepository } from '~/infrastructure/repositories/user.repository'
import { GithubAuthStrategy, GoogleAuthStrategy } from '~/infrastructure/http/strategies/auth.strategy'

export class AuthController {
  private authService: AuthService
  private userService: UserService
  private userRepository: UserRepository

  constructor(private readonly fastify: FastifyInstance) {
    this.userRepository = new UserRepository()
    this.userService = new UserService(this.userRepository)
    this.authService = new AuthService()
  }

  googleCallback = async (request: FastifyRequest, reply: FastifyReply) => {
    const { token } = await this.fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    const user_info = (await this.fastify.googleOAuth2.userinfo(token)) as Record<string, any>

    const user = await this.userService.createUserIfDoesntExist({
      sub: user_info.sub,
      name: user_info.name,
      photoUrl: user_info.picture,
      email: user_info.email,
    })

    // Set a cookie before redirecting
    setAuthCookies(reply, token, user)

    reply.redirect(env.APP_URL)
  }

  githubCallback = async (request: FastifyRequest, reply: FastifyReply) => {
    const { token } = await this.fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

    this.authService.setAuthOption(new GithubAuthStrategy())
    const user_info = await this.authService.getUserInfo(token.access_token)

    const user = await this.userService.createUserIfDoesntExist({
      sub: user_info.id,
      name: user_info.name,
      photoUrl: user_info.avatar_url,
      email: user_info.email || '',
    })

    // Set a cookie before redirecting
    setAuthCookies(reply, token, user)

    reply.redirect(env.APP_URL)
  }

  verifyToken = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = JSON.parse(request.cookies.tk || '{}')
    let isTokenValid = false

    // Only google has id_token property
    if (token.id_token) {
      this.authService.setAuthOption(new GoogleAuthStrategy())
      isTokenValid = await this.authService.verifyToken(token.id_token)
    } else {
      this.authService.setAuthOption(new GithubAuthStrategy())
      isTokenValid = await this.authService.verifyToken(token.access_token)
    }

    if (isTokenValid) {
      reply.status(200)
      return
    }

    reply.status(401)
  }
}
