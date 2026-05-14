'use client'

import { useState, useEffect } from 'react'
import { useModals } from '@/context/ModalContext'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const [lang, setLang] = useState('en')

  const { openModal } = useModals()
  const { user, status, logout } = useAuth()

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  if (status === 'loading') {
    return (
      <nav className="navbar">
        <div className="container-main h-20 flex items-center">
          Loading...
        </div>
      </nav>
    )
  }

return (
  <nav className="navbar relative z-50">
    <div className="container-main">
      <div className="grid lg:grid-cols-[1fr_1.05fr] h-20 items-center">

        {/* LEFT - LOGO (RESTORED ALIGNMENT WITH HERO GRID) */}
        <div className="flex items-center gap-3 lg:translate-x-24 xl:translate-x-40 2xl:translate-x-56">
          <img
            src="/images/benenew.jpg"
            alt="Logo"
            className="h-12 w-auto cursor-pointer"
            onClick={() => (window.location.href = '/')}
          />
        </div>

        {/* RIGHT - NAV (RESTORED SPACING + ALIGNMENT) */}
        <div className="flex items-center gap-6 lg:translate-x-16 xl:translate-x-28">

          {!user ? (
            <>
              <button onClick={() => openModal('search')}>
                How it works
              </button>

              <button onClick={() => openModal('search')}>
                Find a List
              </button>

              <button onClick={() => openModal('login')}>
                Sign In
              </button>

              <button onClick={() => openModal('signup')}>
                Create My List
              </button>
            </>
          ) : (
            <>
              <button onClick={() => (window.location.href = '/dashboard')}>
                My Lists
              </button>

              <button onClick={() => openModal('create')}>
                Create List
              </button>

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center">
                  {user?.name?.charAt(0) || 'U'}
                </div>

                <button onClick={logout}>
                  Logout
                </button>

              </div>
            </>
          )}

          {/* LANGUAGE */}
          <button
            onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
            className="font-semibold"
          >
            {lang === 'en' ? 'አማ' : 'ENG'}
          </button>

        </div>
      </div>
    </div>
  </nav>
)
}