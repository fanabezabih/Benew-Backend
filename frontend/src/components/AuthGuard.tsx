// src/components/AuthGuard.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    // Timeout after 3 seconds to prevent infinite loading
    const timeout = setTimeout(() => {
      setTimedOut(true)
    }, 3000)

    if (!isLoading && !user) {
      clearTimeout(timeout)
      router.push('/')
    }

    return () => clearTimeout(timeout)
  }, [user, isLoading, router])

  // Show loading for max 3 seconds
  if (isLoading && !timedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-espresso text-lg">Loading...</div>
      </div>
    )
  }

  // If timeout or no user, redirect
  if (timedOut || !user) {
    router.push('/')
    return null
  }

  return <>{children}</>
}