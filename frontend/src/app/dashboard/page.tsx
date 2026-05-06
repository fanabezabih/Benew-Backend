'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { userAPI } from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await userAPI.getDashboard();
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    if (isLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    load();
  }, [user, isLoading]);

  if (loading || isLoading) return <div>Loading...</div>;

  return (
    <AuthGuard>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AuthGuard>
  );
}