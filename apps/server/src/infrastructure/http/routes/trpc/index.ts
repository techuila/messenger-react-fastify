import { publicProcedure, router } from '~/infrastructure/utils/trpc'

export const appRouter = router({
  getMessage: publicProcedure.query(() => {
    return 'world'
  }),
})

export type AppRouter = typeof appRouter
