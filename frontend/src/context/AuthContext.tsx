'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

import { authAPI } from '@/lib/api'

interface User {
  id?: string
  name?: string
  email?: string
}

interface AuthContextType {
  user: User | null

  status:
    | 'loading'
    | 'authenticated'
    | 'unauthenticated'

  login: (
    email: string,
    password: string
  ) => Promise<void>

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>

  logout: () => void
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  )

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] =
    useState<User | null>(null)

  const [status, setStatus] =
    useState<
      | 'loading'
      | 'authenticated'
      | 'unauthenticated'
    >('loading')

  // CHECK AUTH ON LOAD
  useEffect(() => {
    const token =
      localStorage.getItem('token')

    const storedUser =
      localStorage.getItem('user')

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))

      setStatus('authenticated')
    } else {
      setStatus('unauthenticated')
    }
  }, [])

  // LOGIN
  const login = async (
    email: string,
    password: string
  ) => {
    try {
      const response =
        await authAPI.login(
          email,
          password
        )

      const token =
        response.token ||
        response.accessToken

      const userData =
        response.user

      localStorage.setItem(
        'token',
        token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(userData)
      )

      setUser(userData)

      setStatus('authenticated')
    } catch (err) {
      console.error(err)

      setStatus('unauthenticated')

      throw err
    }
  }

  // REGISTER
  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await authAPI.register(
        name,
        email,
        password
      )
    } catch (err) {
      console.error(err)

      throw err
    }
  }

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token')

    localStorage.removeItem('user')

    setUser(null)

    setStatus('unauthenticated')

    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return context
}