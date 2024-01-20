import { publicProcedure, router } from '../../../utils/trpc'

export const appRouter = router({
  getMessage: publicProcedure.query(() => {
    // console.log('trpc cookies ========')
    // console.log(ctx?.req?.cookies)
    return 'world'
  }),
})

export type AppRouter = typeof appRouter
