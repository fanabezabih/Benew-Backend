'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';

export default function DashboardPage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await userAPI.getDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (user) load();
    else setLoading(false);
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthGuard>
      <div className="p-10">
        <h1>Dashboard</h1>
        <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
      </div>
    </AuthGuard>
  );
}