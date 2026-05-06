// src/components/layout/Navbar.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useModals } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { openModal } = useModals();

  const {
    user,
    logout,
    isLoading,
  } = useAuth();

  const router = useRouter();

  // Prevent navbar flicker before auth loads
  if (isLoading) return null;

  return (
    <header className="w-full bg-[#f7f2eb]">
      <div className="max-w-[1600px] mx-auto px-10 lg:px-20">

        <div className="flex items-center justify-between h-[88px]">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/benenew.jpg"
              alt="BeneNew"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* NAVIGATION */}
         {/* NAVIGATION */}
<nav className="flex items-center gap-12">

  <a
    href="#how-it-works"
    className="text-[#3b241c] hover:text-[#de6f3d] transition-colors duration-300 text-[17px] font-medium"
  >
    How it works
  </a>

  <button
    onClick={() => openModal('search')}
    className="text-[#3b241c] hover:text-[#de6f3d] transition-colors duration-300 text-[17px] font-medium"
  >
    Find a List
  </button>

  {/* NOT LOGGED IN */}
  {!user ? (
    <>
      <button
        onClick={() => openModal('login')}
        className="text-[#3b241c] hover:text-[#de6f3d] transition-colors duration-300 text-[17px] font-medium"
      >
        Sign in
      </button>

      <button
        onClick={() => openModal('signup')}
        className="bg-[#de6f3d] hover:bg-[#c95e32] text-white px-8 py-4 rounded-full font-semibold text-[17px] transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Create Your List
      </button>
    </>
  ) : (
    <>
      {/* DASHBOARD */}
      <a
        href="/dashboard"
        className="text-[#3b241c] hover:text-[#de6f3d] transition-colors duration-300 text-[17px] font-medium"
      >
        Dashboard
      </a>

      {/* PROFILE */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#de6f3d] text-white flex items-center justify-center font-semibold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <span className="text-[#3b241c] font-medium">
          {user.name}
        </span>
      </div>
    </>
  )}
</nav>
        </div>
      </div>
    </header>
  );
}