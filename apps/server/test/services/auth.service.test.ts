import { env } from '../helper'
import { test, describe } from 'node:test'
import * as assert from 'node:assert'
import { AuthService } from '~/core/services/auth.service'

const authService = new AuthService()
describe('Auth Service Test', async () => {
  test('Google ID token should be valid', async () => {
    const isValid = await authService.verifyGoogleIdToken(env.SAMPLE_GOOGLE_ID_TOKEN)
    assert.equal(isValid, true)
  })

  test('Github access token should be valid', async () => {
    const isValid = await authService.verifyGithubAccessToken(env.SAMPLE_GITHUB_ACCESS_TOKEN)
    assert.equal(isValid, true)
  })

  test('Github access token should not be valid', async () => {
    const isValid = await authService.verifyGithubAccessToken('sadflkj')
    assert.equal(isValid, false)
  })

  test('fetchUserInfoFromGithub should return user info', async () => {
    const userInfo = await authService.fetchUserInfoFromGithub(env.SAMPLE_GITHUB_ACCESS_TOKEN)
    assert.equal(userInfo.id, env.SAMPLE_GITHUB_USER_SUB)
  })

  test('fetchUserInfoFromGithub should return an error', async () => {
    assert.rejects(async () => {
      await authService.fetchUserInfoFromGithub('sadflkj')
    }, Error)
  })
})
