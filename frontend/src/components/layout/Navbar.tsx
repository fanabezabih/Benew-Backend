'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useModals } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { openModal } = useModals();
  const { user, logout, status } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-ivory sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-terra-cotta rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-espresso">
              Bene<span className="text-terra-cotta">'nw</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/how-it-works" 
              className="text-espresso/80 hover:text-terra-cotta font-medium transition-colors"
            >
              How it works
            </Link>
            <button 
              onClick={() => openModal('search')}
              className="text-espresso/80 hover:text-terra-cotta font-medium transition-colors"
            >
              Find a List
            </button>
            
            {status === 'unauthenticated' && (
              <>
                <button 
                  onClick={() => openModal('login')}
                  className="text-espresso/80 hover:text-terra-cotta font-medium transition-colors"
                >
                  Sign in
                </button>
                <button 
                  onClick={() => openModal('signup')}
                  className="bg-terra-cotta hover:bg-terra-cotta-dark text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md"
                >
                  Create Your List
                </button>
              </>
            )}

            {status === 'authenticated' && user && (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-espresso/80 hover:text-terra-cotta font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="border border-terra-cotta text-terra-cotta hover:bg-terra-cotta hover:text-white px-6 py-2 rounded-full font-medium transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-espresso p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-ivory-dark">
            <div className="flex flex-col gap-3">
              <Link 
                href="/how-it-works" 
                className="text-espresso/80 hover:text-terra-cotta font-medium px-2 py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it works
              </Link>
              <button 
                onClick={() => {
                  openModal('search');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-espresso/80 hover:text-terra-cotta font-medium px-2 py-2 transition-colors"
              >
                Find a List
              </button>
              
              {status === 'unauthenticated' && (
                <>
                  <button 
                    onClick={() => {
                      openModal('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-espresso/80 hover:text-terra-cotta font-medium px-2 py-2 transition-colors"
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={() => {
                      openModal('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-terra-cotta hover:bg-terra-cotta-dark text-white px-4 py-2 rounded-full font-medium text-center"
                  >
                    Create Your List
                  </button>
                </>
              )}

              {status === 'authenticated' && user && (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-espresso/80 hover:text-terra-cotta font-medium px-2 py-2 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="border border-terra-cotta text-terra-cotta hover:bg-terra-cotta hover:text-white px-4 py-2 rounded-full font-medium text-center"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}