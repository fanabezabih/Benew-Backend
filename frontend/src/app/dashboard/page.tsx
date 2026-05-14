'use client'

import { useEffect, useState } from 'react'

import { userAPI } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { status } = useAuth()

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (status !== 'authenticated') return

    async function load() {
      try {
        const res = await userAPI.getDashboard()
        setData(res)
      } catch (err) {
        console.error(err)
      }
    }

    load()
  }, [status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream p-10">
      <h1 className="text-4xl font-display text-espresso mb-6">
        Dashboard
      </h1>

      <div className="bg-white rounded-3xl p-6 border border-[var(--border)]">
        <pre className="text-sm overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}