'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "guest") {
      router.replace("/"); // or /login
    }
  }, [status]);

  if (status === "loading") {
    return <div className="p-10">Loading...</div>;
  }

  if (status === "guest") {
    return null;
  }

  return <>{children}</>;
}