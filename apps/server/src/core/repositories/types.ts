import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

export type DrizzleORM = PostgresJsDatabase<Record<string, never>>
