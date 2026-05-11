'use client';

import Link from 'next/link';
import { useModals } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { openModal } = useModals();
  const { user, logout, status } = useAuth();

  return (
    <header className="bg-[#f7f2eb]">
      <div className="flex justify-between p-4">

        <Link href="/">Bene'nw</Link>

        <nav className="flex gap-4">

          <button onClick={() => openModal('search')}>
            Search
          </button>

          {status === 'unauthenticated' && (
            <>
              <button onClick={() => openModal('login')}>
                Login
              </button>

              <button onClick={() => openModal('signup')}>
                Signup
              </button>
            </>
          )}

          {status === 'authenticated' && user && (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <button onClick={logout}>
                Logout
              </button>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}