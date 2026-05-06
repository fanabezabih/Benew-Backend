'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout, status } = useAuth();

  if (status === 'loading') return null;

  return (
    <header className="w-full bg-[#f7f2eb]">
      <div className="max-w-[1600px] mx-auto px-10 lg:px-20">
        <div className="flex items-center justify-between h-[88px]">

          <Link href="/">
            <img src="/images/benenew.jpg" className="h-20" />
          </Link>

          <nav className="flex items-center gap-8">

            {!user ? (
              <>
                <span>Not logged in</span>
              </>
            ) : (
              <>
                <Link href="/dashboard">Dashboard</Link>

                <span>{user.name}</span>

                <button onClick={logout}>
                  Logout
                </button>
              </>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
}