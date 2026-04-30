'use client'

import { useLanguage } from '@/hooks/useLanguage'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex bg-white/20 rounded-full p-[3px] border border-white/10">
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all',
          language === 'en'
            ? 'text-[#2C1810] bg-terracotta'
            : 'text-ivory/60 hover:text-ivory'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('am')}
        className={cn(
          'px-3.5 py-1.5 rounded-full text-sm font-medium transition-all',
          language === 'am'
            ? 'text-[#2C1810] bg-terracotta'
            : 'text-ivory/60 hover:text-ivory'
        )}
      >
        አማ
      </button>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}