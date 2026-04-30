'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useModals } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { openModal } = useModals();
  const { user, logout, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug log
  useEffect(() => {
    console.log('🧭 Navbar - user:', user, 'isLoading:', isLoading, 'mounted:', mounted);
  }, [user, isLoading, mounted]);

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
    document.body.style.overflow = !isMobileOpen ? 'hidden' : '';
  };

  if (!mounted || isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-espresso">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-9 w-32 bg-espresso/20 rounded animate-pulse"></div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="h-8 w-20 bg-espresso/20 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-espresso/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-espresso">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/Benenew-01.png" alt="Bene'nw" className="h-9 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link href="#occasions" className="text-ivory/70 hover:text-ivory">Occasions</Link>
              <Link href="#how-it-works" className="text-ivory/70 hover:text-ivory">How It Works</Link>
              <Link href="#pricing" className="text-ivory/70 hover:text-ivory">Pricing</Link>
              <button onClick={() => openModal('search')} className="text-ivory/70 hover:text-ivory">Find a List</button>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <LanguageToggle />

              {user ? (
                // ✅ LOGGED IN - Should show this
                <>
                  <Link 
                    href="/dashboard" 
                    className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full"
                  >
                    <span>📊 My Dashboard</span>
                  </Link>
                  
                  <div className="flex items-center gap-3 pl-4 border-l border-ivory/20">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden xl:block">
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                    </div>
                  </div>
                  
                  <button onClick={logout} className="text-ivory/70 hover:text-white text-sm font-medium">
                    Logout
                  </button>
                </>
              ) : (
                // ❌ LOGGED OUT - Shows this when user is null
                <>
                  <button onClick={() => openModal('login')} className="text-sm font-medium text-ivory/70 hover:text-white">
                    Log in
                  </button>
                  <button onClick={() => openModal('signup')} className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full">
                    <span>Sign Up</span>
                  </button>
                </>
              )}
            </div>

            <button className="lg:hidden p-2 text-ivory/70" onClick={toggleMobile}>☰</button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-full h-screen bg-cream z-[100] transform transition-transform ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between mb-8">
            <img src="/images/Benenew-01.png" alt="Logo" className="h-10" />
            <button onClick={toggleMobile}>✕</button>
          </div>
          <div className="space-y-4">
            {user ? (
              <>
                <Link href="/dashboard" onClick={toggleMobile} className="block bg-terracotta text-white text-center py-3 rounded-full">
                  📊 My Dashboard
                </Link>
                <div className="p-4 bg-white rounded-xl text-center">
                  <p className="font-semibold">{user.name}</p>
                </div>
                <button onClick={() => { logout(); toggleMobile(); }} className="w-full py-3 border-2 border-espresso rounded-full">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { openModal('login'); toggleMobile(); }} className="w-full py-3 border-2 border-espresso rounded-full">
                  Log In
                </button>
                <button onClick={() => { openModal('signup'); toggleMobile(); }} className="w-full py-3 bg-terracotta text-white rounded-full">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}