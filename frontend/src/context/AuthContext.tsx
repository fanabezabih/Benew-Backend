'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // LOAD SESSION
  useEffect(() => {
    const savedToken = localStorage.getItem("benenw_token");
    const savedUser = localStorage.getItem("benenw_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const data = await authAPI.login({ email, password });

    localStorage.setItem("benenw_token", data.token);
    localStorage.setItem("benenw_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    router.push("/dashboard");
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("benenw_token");
    localStorage.removeItem("benenw_user");

    setToken(null);
    setUser(null);

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);