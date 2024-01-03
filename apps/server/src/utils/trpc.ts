import { initTRPC } from '@trpc/server'

export const t = initTRPC.create()

export const appRouter = t.router({
  getMessage: t.procedure.query(() => {
    return 'world'
  }),
})

export type AppRouter = typeof appRouter
