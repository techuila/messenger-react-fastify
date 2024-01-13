import fp from 'fastify-plugin'
import oauthPlugin, { OAuth2Namespace } from '@fastify/oauth2'
import { env } from '~/infrastructure/config/environment'

export default fp(
  async (fastify) => {
    // @ts-expect-error: typings of @fastify/oauth2 needs to be updated for this case
    void fastify.register(oauthPlugin, {
      name: 'googleOAuth2',
      scope: ['profile', 'email'],
      credentials: {
        client: {
          id: env.GOOGLE_CLIENT_ID,
          secret: env.GOOGLE_CLIENT_SECRET,
        },
      },
      startRedirectPath: '/auth/google',
      callbackUri: 'http://localhost:3000/auth/google/callback',
      discovery: {
        issuer: 'https://accounts.google.com',
      },
    })

    void fastify.register(oauthPlugin, {
      name: 'githubOAuth2',
      scope: ['read:user', 'user:email'],
      credentials: {
        client: {
          id: env.GITHUB_CLIENT_ID,
          secret: env.GITHUB_CLIENT_SECRET,
        },
        auth: oauthPlugin.GITHUB_CONFIGURATION,
      },
      startRedirectPath: '/auth/github',
      callbackUri: 'http://localhost:3000/auth/github/callback',
    })
  },

  {
    name: 'authorization',
  },
)

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace
    githubOAuth2: OAuth2Namespace
  }
}
