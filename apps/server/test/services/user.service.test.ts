import { DbTestHelper } from '../helper'
import { describe, test } from 'node:test'
import * as assert from 'node:assert'

import { UserService } from '~/core/services/users.service'
import { UserRepository } from '~/infrastructure/repositories/user.repository'
import { client } from '~/infrastructure/database'

const dbTestHelper = new DbTestHelper()
const userRepository = new UserRepository()
const userService = new UserService(userRepository)

describe('User Service Test', async () => {
  await dbTestHelper.setUp()

  describe('createUserIfDoesntExist', async () => {
    const user_info = {
      sub: '123',
      name: 'Test User',
      picture: 'https://test.com',
      email: 'test@test.com',
    }

    await test('should create a user', async () => {
      const user = await userService.createUserIfDoesntExist({
        sub: user_info.sub,
        name: user_info.name,
        photoUrl: user_info.picture,
        email: user_info.email,
      })

      const { picture, ...rest } = user_info
      const { sub, name, photoUrl, email } = user
      assert.deepEqual({ sub, name, photoUrl, email }, { ...rest, photoUrl: picture })
    })

    await test('should find and return a user', async () => {
      const user = await userService.createUserIfDoesntExist({
        sub: user_info.sub,
        name: user_info.name,
        photoUrl: user_info.picture,
        email: user_info.email,
      })

      const { picture, ...rest } = user_info
      const { sub, name, photoUrl, email } = user
      assert.deepEqual({ sub, name, photoUrl, email }, { ...rest, photoUrl: picture })
    })

    client.end()
  })
})
