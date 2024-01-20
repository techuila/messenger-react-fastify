import { createContext, useState } from 'react'
// import { trpc } from '~/lib/trpc'

export const AuthContext = createContext({})

type Props = {
  children?: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  const value = {
    isUserAuthenticated,
    updateUserAuthStatus: (status: boolean) => setIsUserAuthenticated(status),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
