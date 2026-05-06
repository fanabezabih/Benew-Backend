'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '@/lib/api';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await authAPI.me();
        setUser(data);
        setStatus('authenticated');
      } catch {
        setUser(null);
        setStatus('unauthenticated');
      }
    }

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await authAPI.login(email, password);
    const data = await authAPI.me();
    setUser(data);
    setStatus('authenticated');
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}