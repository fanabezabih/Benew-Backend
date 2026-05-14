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

  const registries = data?.registries || []

  return (
    <div className="min-h-screen bg-cream p-10">
      <h1 className="text-4xl font-display text-espresso mb-8">
        My Lists
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-sm text-gray-500">Total Lists</p>
          <p className="text-2xl font-bold">
            {data?.stats?.totalRegistries || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-sm text-gray-500">Total Raised</p>
          <p className="text-2xl font-bold">
            ${data?.stats?.totalRaised || 0}
          </p>
        </div>
      </div>

      {/* REGISTRIES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registries.map((r: any) => (
          <div
            key={r.id}
            className="bg-white border rounded-2xl p-5 hover:shadow-md transition cursor-pointer"
            onClick={() => (window.location.href = `/registry/${r.id}`)}
          >
            <h2 className="text-xl font-semibold text-espresso">
              {r.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {r.description}
            </p>

            <div className="mt-4 flex justify-between text-sm">
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                {r.occasion}
              </span>

              <span className="text-gray-400">
                {new Date(r.createdAt).toDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}