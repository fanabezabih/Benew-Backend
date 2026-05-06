'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
import { useModals } from '@/context/ModalContext';

export default function DashboardPage() {
  const { status } = useAuth();
  const router = useRouter();
  const { openModal } = useModals();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function load() {
      try {
        const data = await userAPI.getDashboard();
        setDashboardData(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [status]);

  // LOADING STATE
  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-cream">

        <Navbar />

        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">

            {/* BACK */}
            <Link href="/" className="text-terracotta font-medium">
              ← Back to Home
            </Link>

            {/* HEADER */}
            <h1 className="text-4xl font-bold mt-6">
              Welcome to your Dashboard
            </h1>

            {/* DATA */}
            <pre className="mt-6 bg-white p-4 rounded-xl">
              {JSON.stringify(dashboardData, null, 2)}
            </pre>

          </div>
        </main>

        <Footer />

      </div>
    </AuthGuard>
  );
}