'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <nav className="navbar">
      <div className="container-main h-20 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img
            src="/images/Benenew-01.png"
            alt="Logo"
            className="h-10 w-auto"
          />

          <span className="font-display text-2xl font-bold text-espresso">
            Bene'nw
          </span>
        </div>

        <div className="flex items-center gap-8">

          <button className="hover:text-terracotta transition">
            <span className="text-en">How it works</span>
            <span className="text-am">እንዴት ይሰራል</span>
          </button>

          <button className="hover:text-terracotta transition">
            <span className="text-en">Find a List</span>
            <span className="text-am">ዝርዝር ፈልግ</span>
          </button>

          <button className="hover:text-terracotta transition">
            <span className="text-en">Sign In</span>
            <span className="text-am">ግባ</span>
          </button>

          <button className="btn-primary px-6 py-3">
            <span className="text-en">Create Your List</span>
            <span className="text-am">ዝርዝር ፍጠር</span>
          </button>

          <button
            onClick={() =>
              setLang(lang === 'en' ? 'am' : 'en')
            }
            className="font-semibold"
          >
            {lang === 'en'
              ? 'አማ'
              : 'ENG'}
          </button>

        </div>
      </div>
    </nav>
  )
}