import { User } from '~/core/entities/user'
import { IUserRepository } from '~/core/repositories/user.respository'

interface IUserService {
  createUserIfDoesntExist(user: User): Promise<User>
}

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUserIfDoesntExist(user: User): Promise<User> {
    const _user = await this.userRepository.findOneBySub(user.sub)

    if (!_user) return await this.userRepository.create(user)

    return _user
  }
}
