// frontend/src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useModals } from '@/context/ModalContext';

// Define types for dashboard data
interface Contribution {
  id: string;
  amount: number;
  status: string;
}

interface Registry {
  id: string;
  title: string;
  occasion?: string;
  contributions: Contribution[];
}

interface DashboardStats {
  totalRegistries: number;
  totalRaised: number;
}

interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
  };
  stats: DashboardStats;
  registries: Registry[];
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { openModal } = useModals();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // ✅ FIX: Added 'as DashboardData' type assertion
        const data = await userAPI.getDashboard() as DashboardData;
        setDashboardData(data);
      } catch (err: any) {
        console.error('Failed to load dashboard:', err);
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadDashboard();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-espresso text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-cream">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-display font-semibold text-espresso">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-espresso/60 mt-2">
                Manage your gift registries and track contributions
              </p>
            </div>

            {/* Stats */}
            {dashboardData?.stats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                  <div className="text-3xl font-bold text-terracotta">
                    {dashboardData.stats.totalRegistries}
                  </div>
                  <div className="text-espresso/60 text-sm mt-1">
                    Total Registries
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
                  <div className="text-3xl font-bold text-gold">
                    {dashboardData.stats.totalRaised.toLocaleString()} ETB
                  </div>
                  <div className="text-espresso/60 text-sm mt-1">
                    Total Raised
                  </div>
                </div>
              </div>
            )}

            {/* Your Registries */}
            <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-semibold text-espresso">
                  Your Registries
                </h2>
                <button
                  onClick={() => openModal('create')}
                  className="bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
                >
                  + Create New
                </button>
              </div>

              {dashboardData?.registries && dashboardData.registries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.registries.map((registry) => {
                    // Calculate total raised for this registry
                    const totalRaised = registry.contributions
                      .filter((c) => c.status === 'completed')
                      .reduce((sum, c) => sum + c.amount, 0);

                    return (
                      <div
                        key={registry.id}
                        className="border border-[var(--border)] rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => router.push(`/registry/${registry.id}/dashboard`)}
                      >
                        <h3 className="font-semibold text-espresso mb-2">
                          {registry.title}
                        </h3>
                        <p className="text-espresso/60 text-sm mb-3">
                          {registry.occasion || 'No occasion'}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-espresso/60">
                            {registry.contributions.filter((c) => c.status === 'completed').length} contributions
                          </span>
                          <span className="text-gold font-semibold">
                            {totalRaised.toLocaleString()} ETB
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-espresso/60">
                  <p className="mb-4">No registries yet</p>
                  <button
                    onClick={() => openModal('create')}
                    className="text-terracotta font-semibold hover:underline"
                  >
                    Create your first registry →
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
}