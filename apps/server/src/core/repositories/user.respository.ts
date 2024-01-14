import { User } from '~/core/entities/user'

export interface IUserRepository {
  findOneBySub(sub: string): Promise<User>
  create(entity: User): Promise<User>
}
