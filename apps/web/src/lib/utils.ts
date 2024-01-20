import { useContext } from 'react'
import { AuthContext } from '~/services/auth'

export const useAuth = () => useContext(AuthContext)

export async function authenticate() {
  const res = await fetch('http://localhost:3000/auth/verifyToken', { credentials: 'include' })
  if (res.ok && res.status === 200) return true
  return false
}
