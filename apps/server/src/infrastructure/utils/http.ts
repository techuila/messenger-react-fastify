import { Token } from '@fastify/oauth2'
import { FastifyReply } from 'fastify'
import { User } from '~/core/entities/user'

export function setAuthCookies(reply: FastifyReply, token: Token, user: User) {
  reply.setCookie('tk', JSON.stringify(token), { path: '/', httpOnly: true, secure: true, sameSite: 'lax' })
  reply.setCookie('info', JSON.stringify(user), { path: '/' })
}
