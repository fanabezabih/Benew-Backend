'use client';

import Link from 'next/link';

import { useModals } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {

  const { openModal } = useModals();

  const {
    user,
    logout,
    status,
  } = useAuth();

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

          {/* NAV */}
          <nav className="flex items-center gap-12">

            <a
              href="#how-it-works"
              className="text-[#3b241c]"
            >
              How it works
            </a>

            <button
              onClick={() => openModal('search')}
              className="text-[#3b241c]"
            >
              Find a List
            </button>

            {/* LOADING */}
            {status === 'loading' ? null : (
              <>
                {/* NOT LOGGED IN */}
                {status === 'unauthenticated' && (
                  <>
                    <button
                      onClick={() => openModal('login')}
                      className="text-[#3b241c]"
                    >
                      Sign in
                    </button>

                    <button
                      onClick={() => openModal('signup')}
                      className="bg-[#de6f3d] text-white px-8 py-4 rounded-full"
                    >
                      Create Your List
                    </button>
                  </>
                )}

                {/* LOGGED IN */}
                {status === 'authenticated' && user && (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-[#3b241c]"
                    >
                      Dashboard
                    </Link>

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-[#de6f3d] text-white flex items-center justify-center">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>

                      <span>
                        {user.name}
                      </span>

                      <button
                        onClick={logout}
                        className="text-red-500"
                      >
                        Logout
                      </button>

                    </div>
                  </>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}