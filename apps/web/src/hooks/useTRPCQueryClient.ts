import { QueryClient } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import type { TRPCType } from '~/utils/trpc'

export function useTRPCQueryClient(trpc: TRPCType) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          // You can pass any HTTP headers you wish here
        }),
      ],
    }),
  )

  return { queryClient, trpcClient }
}
