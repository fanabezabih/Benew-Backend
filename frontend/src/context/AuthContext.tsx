'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { authAPI } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;

  status:
    | 'loading'
    | 'authenticated'
    | 'unauthenticated';

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [status, setStatus] = useState<
    'loading'
    | 'authenticated'
    | 'unauthenticated'
  >('loading');

  // ========================
  // CHECK AUTH
  // ========================
  useEffect(() => {

    const checkAuth = async () => {

      try {

        const data = await authAPI.me();

        setUser(data);

        setStatus('authenticated');

      } catch (err) {

        console.error(err);

        setUser(null);

        setStatus('unauthenticated');
      }
    };

    checkAuth();

  }, []);

  // ========================
  // LOGIN
  // ========================
  const login = async (
    email: string,
    password: string
  ) => {

    await authAPI.login(
      email,
      password
    );

    const userData =
      await authAPI.me();

    setUser(userData);

    setStatus('authenticated');
  };

  // ========================
  // REGISTER
  // ========================
  const register = async (
    name: string,
    email: string,
    password: string
  ) => {

    await authAPI.register(
      name,
      email,
      password
    );
  };

  // ========================
  // LOGOUT
  // ========================
  const logout = async () => {

    await authAPI.logout();

    setUser(null);

    setStatus('unauthenticated');
  };

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
  );
}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
}