'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}