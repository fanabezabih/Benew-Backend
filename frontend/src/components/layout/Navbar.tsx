'use client'

import { useState, useEffect } from 'react'
import { useModals } from '@/context/ModalContext'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [lang, setLang] = useState('en')

  const { openModal } = useModals()
  const { user, logout } = useAuth()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <nav className="navbar relative z-50">
      <div className="container-main">
        <div className="grid lg:grid-cols-[1fr_1.05fr] h-20 items-center">

          {/* LEFT */}
          <div className="flex items-center gap-3 lg:translate-x-24 xl:translate-x-40 2xl:translate-x-56">
         <img
  src="/images/benenew.jpg"
  alt="Logo"
  className="h-16 w-auto cursor-pointer"
  onClick={() => (window.location.href = '/')}
/>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6 lg:translate-x-16 xl:translate-x-28">

            {!user ? (
              <>
                <button
                  onClick={() => openModal('search')}
                  className="hover:text-terracotta transition cursor-pointer"
                >
                  How it works
                </button>

                <button
                  onClick={() => openModal('search')}
                  className="hover:text-terracotta transition cursor-pointer"
                >
                  Find a List
                </button>

                <button
                  onClick={() => openModal('login')}
                  className="hover:text-terracotta transition cursor-pointer"
                >
                  Sign In
                </button>

                {/* BEFORE LOGIN */}
                <button
                  onClick={() => openModal('signup')}
                  className="bg-[#d96b3c] hover:bg-[#c85f34] text-white px-7 py-3 rounded-full transition cursor-pointer"
                >
                  Create My List
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => (window.location.href = '/dashboard')}
                  className="hover:text-terracotta transition cursor-pointer"
                >
                  My Lists
                </button>

                {/* AFTER LOGIN */}
                <button
                  onClick={() => openModal('create')}
                  className="hover:text-terracotta transition cursor-pointer"
                >
                  Create List
                </button>

                <div className="flex items-center gap-3">

                  {/* PROFILE */}
                  <div className="w-9 h-9 rounded-full bg-[#d96b3c] text-white flex items-center justify-center font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>

                  <button
                    onClick={logout}
                    className="hover:text-red-500 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {/* LANGUAGE */}
            <button
              onClick={() =>
                setLang(lang === 'en' ? 'am' : 'en')
              }
              className="font-semibold cursor-pointer"
            >
              {lang === 'en' ? 'አማ' : 'ENG'}
            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}