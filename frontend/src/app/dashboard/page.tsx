'use client';

import { useEffect, useState } from 'react';
import { userAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import AuthGuard from '@/components/AuthGuard';

export default function DashboardPage() {
  const { status } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function load() {
      const res = await userAPI.getDashboard();
      setData(res);
    }

    load();
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <AuthGuard>
      <div>
        <h1>Dashboard</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </AuthGuard>
  );
}