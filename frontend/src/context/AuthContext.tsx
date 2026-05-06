'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';

import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  status: "loading" | "authenticated" | "guest";
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "guest">("loading");

  // ✅ INIT AUTH (NON-BLOCKING)
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const savedToken = localStorage.getItem("benenw_token");
      const savedUser = localStorage.getItem("benenw_user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setStatus("authenticated");
      } else {
        setStatus("guest");
      }
    } catch (err) {
      console.log("Auth init error:", err);
      setStatus("guest");
    }
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    const data = await authAPI.login({ email, password });

    localStorage.setItem("benenw_token", data.token);
    localStorage.setItem("benenw_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
    setStatus("authenticated");

    router.push("/dashboard");
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("benenw_token");
    localStorage.removeItem("benenw_user");

    setToken(null);
    setUser(null);
    setStatus("guest");

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};