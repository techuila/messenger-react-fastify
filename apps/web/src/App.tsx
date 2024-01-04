import { QueryClientProvider } from '@tanstack/react-query'
import { useTRPCQueryClient } from './hooks/useTRPCQueryClient'
import { trpc } from '~/utils/trpc'
import Test from '~/pages/test'

function App() {
  const { queryClient, trpcClient } = useTRPCQueryClient(trpc)

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header className="App-header">
            test
            <Test />
          </header>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
