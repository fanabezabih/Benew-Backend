// src/components/sections/FinalCTA.tsx
'use client';

import { useModals } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

export default function FinalCTA() {
  const { openModal } = useModals();
  const { user } = useAuth();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta to-terracotta-dark" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="reveal">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-4">
              Ready to create your list?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              It's simple, free, and made for you.
            </p>
          </div>

          {/* Right Content */}
          <div className="reveal reveal-delay-1">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <button
                onClick={() => user ? window.location.href = '/dashboard' : openModal('signup')}
                className="w-full py-4 bg-terracotta hover:bg-terracotta-dark text-white text-lg font-semibold rounded-full transition-all hover:shadow-lg mb-4"
              >
                Create Your Gift List — Free
              </button>
              <div className="flex items-center justify-center gap-2 text-sm text-espresso/60">
                <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Join hundreds creating smarter gift lists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}