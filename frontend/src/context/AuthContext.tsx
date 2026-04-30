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
  const [authVersion, setAuthVersion] = useState(0); // Force re-render counter
  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      try {
        const savedToken = localStorage.getItem('benenw_token');
        const savedUser = localStorage.getItem('benenw_user');
        
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        localStorage.removeItem('benenw_token');
        localStorage.removeItem('benenw_user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const data = await authAPI.login({ email, password }) as { token: string; user: User };
      
      console.log('✅ Login response:', data);
      
      // Save to localStorage
      localStorage.setItem('benenw_token', data.token);
      localStorage.setItem('benenw_user', JSON.stringify(data.user));
      
      // Update state AND increment version to force re-render
      setToken(data.token);
      setUser(data.user);
      setAuthVersion(prev => prev + 1); // ✅ FORCE RE-RENDER
      
      console.log('✅ Auth state updated, user:', data.user.name);
      
      // Wait a moment then redirect
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (err: any) {
      console.error('❌ Login failed:', err);
      setError(err.message || 'Login failed');
      throw err;
    }
  };

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
    setToken(null);
    setUser(null);
    setAuthVersion(prev => prev + 1);
    localStorage.removeItem('benenw_token');
    localStorage.removeItem('benenw_user');
    window.location.href = '/';
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
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};