'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { authAPI } from '@/lib/api'

type User = {
  id: string
  name: string
  email: string
} | null

type AuthContextType = {
  user: User
  status: 'loading' | 'authenticated' | 'unauthenticated'
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [status, setStatus] =
    useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')

  const refreshUser = async () => {
    try {
      const res = await authAPI.me()
      setUser(res)
      setStatus('authenticated')
    } catch {
      setUser(null)
      setStatus('unauthenticated')
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authAPI.login(email, password)
    setUser(res.user)
    setStatus('authenticated')
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await authAPI.register(name, email, password)
    setUser(res.user)
    setStatus('authenticated')
  }

  const logout = async () => {
    await authAPI.logout()
    setUser(null)
    setStatus('unauthenticated')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}