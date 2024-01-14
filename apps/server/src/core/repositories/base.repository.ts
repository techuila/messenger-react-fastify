import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core'
import { DrizzleORM } from './types'
import { eq, inArray } from 'drizzle-orm'

export abstract class BaseRepository<T extends { hashId: string }> {
  constructor(
    protected db: DrizzleORM,
    protected table: PgTableWithColumns<TableConfig>,
  ) {
    this.findOneByHashId = this.findOneByHashId.bind(this)
    this.findManyByHashId = this.findManyByHashId.bind(this)
    this.create = this.create.bind(this)
    this.updateByHashId = this.updateByHashId.bind(this)
    this.deleteByHashId = this.deleteByHashId.bind(this)
  }

  async findOneByHashId(hashId: string): Promise<T> {
    return (await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.hashId, hashId))
      .limit(1)) as Awaited<T>
  }

  async findManyByHashIds(hashIds: string[]): Promise<T[]> {
    return (await this.db
      .select()
      .from(this.table)
      .where(inArray(this.table.hashId, hashIds))) as Awaited<T[]>
  }

  async create(entity: T[] & T): Promise<T[]> {
    return (await this.db
      .insert(this.table)
      .values(entity)
      .returning()) as Awaited<T[]>
  }

  async updateByHashId(hashId: string, entity: T): Promise<T> {
    await this.db
      .update(this.table)
      .set(entity)
      .where(eq(this.table.hashId, hashId))

    return (await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.hashId, hashId))
      .limit(1)) as Awaited<T>
  }

  async deleteByHashId(hashId: string): Promise<T> {
    return (await this.db
      .delete(this.table)
      .where(eq(this.table.hashId, hashId))
      .returning({ deletedHashId: this.table.hashId })) as Awaited<T>
  }
}
