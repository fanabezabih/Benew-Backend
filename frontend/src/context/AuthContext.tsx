'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // ✅ Load session
 useEffect(() => {
  const savedToken = localStorage.getItem('benenw_token')
  const savedUser = localStorage.getItem('benenw_user')

  if (savedToken && savedUser) {
    setToken(savedToken)
    setUser(JSON.parse(savedUser))
  }

  setIsLoading(false)
}, [])

  // ✅ LOGIN (FIXED)
const login = async (email: string, password: string) => {
  try {
    setError(null)

    const data = await authAPI.login({ email, password })

    localStorage.setItem('benenw_token', data.token)
    localStorage.setItem('benenw_user', JSON.stringify(data.user))

    setToken(data.token)
    setUser(data.user)

  } catch (err: any) {
    setError(err.message || 'Login failed')
    throw err
  }
}

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      await authAPI.register({ name, email, password });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

 const logout = () => {
  setUser(null);
  setToken(null);

  localStorage.removeItem('benenw_token');
  localStorage.removeItem('benenw_user');

  router.push('/');
};

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};