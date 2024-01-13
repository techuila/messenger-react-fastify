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
      startRedirectPath: '/login/google',
      callbackUri: 'http://localhost:3000/login/google/callback',
      discovery: {
        issuer: 'https://accounts.google.com',
      },
      // check if your provider supports PKCE,
      // in case they do,
      // use of this parameter is highly encouraged
      // in order to prevent authorization code interception attacks
    })
  },
  {
    name: 'authorization',
  },
)

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace
  }
}
