'use client'

import { useLanguage } from '@/hooks/useLanguage'

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center bg-white border border-[var(--border)] rounded-full p-1 shadow-sm">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300',
          language === 'en'
            ? 'bg-terracotta text-white shadow-sm'
            : 'text-espresso/60 hover:text-espresso'
        )}
      >
        EN
      </button>

      <button
        onClick={() => setLanguage('am')}
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300',
          language === 'am'
            ? 'bg-terracotta text-white shadow-sm'
            : 'text-espresso/60 hover:text-espresso'
        )}
      >
        አማ
      </button>
    </div>
  )
}