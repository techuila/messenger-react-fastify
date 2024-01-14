import { eq } from 'drizzle-orm'
import { IUserRepository } from '~/core/repositories/user.respository'
import { user } from '~/infrastructure/database/schemas/user.schema'
import { db } from '../database'
import { User } from '~/core/entities/user'
import { GenerateHashId } from '../utils/generate-hash'
import { HashId } from './types'

export class UserRepository implements IUserRepository {
  protected readonly db = db
  protected readonly table = user

  async findOneBySub(sub: string): Promise<User> {
    return (await this.db.select().from(this.table).where(eq(this.table.sub, sub)).limit(1))[0] as Awaited<User>
  }

  @GenerateHashId
  async create(_user: User): Promise<User> {
    return (
      await this.db
        .insert(this.table)
        .values(_user as User & HashId)
        .returning()
    )[0] as Awaited<User>
  }
}
