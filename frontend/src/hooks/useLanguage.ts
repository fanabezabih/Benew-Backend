'use client'
import { useState, useEffect } from 'react'

export function useLanguage() {
  const [language, setLanguage] = useState<'en' | 'am'>('en')

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
  }, [language])

  return { language, setLanguage }
}