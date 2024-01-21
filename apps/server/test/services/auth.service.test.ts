import { env } from '../helper'
import { test, describe } from 'node:test'
import * as assert from 'node:assert'

import { AuthService } from '~/core/services/auth.service'
import { GithubAuthStrategy, GoogleAuthStrategy } from '~/infrastructure/http/strategies/auth.strategy'

describe('Auth Service Test', async () => {
  describe('Google', async () => {
    const authService = new AuthService()
    authService.setAuthOption(new GoogleAuthStrategy())

    test('Google ID token should not be valid', async () => {
      const isValid = await authService.verifyToken(env.TEST_GOOGLE_ID_TOKEN)
      assert.equal(isValid, false)
    })
  })

  describe('Github', async () => {
    const authService = new AuthService()
    authService.setAuthOption(new GithubAuthStrategy())

    test('Github access token should be valid', async () => {
      const isValid = await authService.verifyToken(env.TEST_GITHUB_ACCESS_TOKEN)
      assert.equal(isValid, true)
    })

    test('Github access token should not be valid', async () => {
      const isValid = await authService.verifyToken('sadflkj')
      assert.equal(isValid, false)
    })

    test('getUserInfo should return user info', async () => {
      const userInfo = await authService.getUserInfo(env.TEST_GITHUB_ACCESS_TOKEN)
      assert.equal(userInfo.id, env.TEST_GITHUB_USER_SUB)
    })

    test('getUserInfo should return an error', async () => {
      assert.rejects(async () => {
        await authService.getUserInfo('sadflkj')
      }, Error)
    })
  })
})
