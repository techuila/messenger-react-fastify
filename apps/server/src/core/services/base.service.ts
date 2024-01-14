import { BaseRepository } from '~/core/repositories/base.repository'
export abstract class BaseService<T extends { hashId: string }> {
  protected repositories: BaseRepository<T>[]

  // @NOTE: First index of the repositories is the main repository of the service
  constructor(...repositories: BaseRepository<T>[]) {
    this.repositories = repositories
    this.findOneByHashId = this.findOneByHashId.bind(this)
    this.findManyByHashIds = this.findManyByHashIds.bind(this)
    this.create = this.create.bind(this)
    this.updateByHashId = this.updateByHashId.bind(this)
    this.deleteByHashId = this.deleteByHashId.bind(this)
  }

  async findOneByHashId(hashId: string): Promise<T> {
    return await this.repositories[0].findOneByHashId(hashId)
  }

  async findManyByHashIds(hashIds: string[]): Promise<T[]> {
    return await this.repositories[0].findManyByHashIds(hashIds)
  }

  async create(entity: T[] & T): Promise<T[]> {
    return await this.repositories[0].create(entity)
  }

  async updateByHashId(hashId: string, entity: T): Promise<T> {
    return await this.repositories[0].updateByHashId(hashId, entity)
  }

  async deleteByHashId(hashId: string): Promise<T> {
    return await this.repositories[0].deleteByHashId(hashId)
  }
}
