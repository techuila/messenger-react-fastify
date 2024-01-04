import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'server/src/utils/trpc'

export const trpc = createTRPCReact<AppRouter>()

export type TRPCType = typeof trpc
