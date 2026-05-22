'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { userAPI } from '@/lib/api'

import {
  Gift,
  DollarSign,
  Share2,
  CalendarDays,
  PartyPopper,
  Cake,
  Heart
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await userAPI.getDashboard()
        setData(res)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="relative flex items-center justify-center">
          <div className="w-28 h-28 border-4 border-[#e7d6cc] border-t-[#d96b3c] rounded-full animate-spin"></div>
          <img
            src="/images/benenew.jpg"
            alt="Bene'nw Logo"
            className="w-16 h-16 rounded-full object-cover absolute"
          />
        </div>
      </div>
    )
  }

  // ICON BY OCCASION
  const getIcon = (occasion: string) => {
    switch (occasion?.toLowerCase()) {
      case 'birthday':
        return <Cake size={16} />
      case 'wedding':
        return <Heart size={16} />
      default:
        return <PartyPopper size={16} />
    }
  }

  return (
    <div className="min-h-screen bg-cream px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => router.push('/')}
          className="text-3xl text-[#5C4033] hover:text-[#7a5443]"
        >
          ←
        </button>

        <h1 className="text-5xl font-display text-espresso">
          My Lists
        </h1>
      </div>

      {/* STATS (ENHANCED) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        <div className="bg-white border rounded-3xl p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Gift size={18} />
            <p>Total Lists</p>
          </div>
          <h2 className="text-4xl font-bold text-espresso">
            {data?.stats?.totalRegistries || 0}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <DollarSign size={18} />
            <p>Total Raised</p>
          </div>
          <h2 className="text-4xl font-bold text-espresso">
            ${data?.stats?.totalRaised || 0}
          </h2>
        </div>

        <div className="bg-white border rounded-3xl p-6 hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <CalendarDays size={18} />
            <p>Active Events</p>
          </div>
          <h2 className="text-4xl font-bold text-espresso">
            {data?.registries?.length || 0}
          </h2>
        </div>

      </div>

      {/* PINTEREST STYLE GRID */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

        {data?.registries?.map((r: any) => (

          <div
            key={r.id}
            className="break-inside-avoid bg-white border rounded-3xl p-5 hover:shadow-xl transition cursor-pointer"
            onClick={() => router.push(`/registry/${r.id}`)}
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-start mb-3">

              <div>
                <h2 className="text-xl font-semibold text-espresso">
                  {r.title}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  {getIcon(r.occasion)}
                  <span className="capitalize">{r.occasion}</span>
                </div>
              </div>

              {/* SHARE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/registry/${r.id}`)
                }}
                className="text-[#d96b3c] hover:scale-110 transition"
              >
                <Share2 size={18} />
              </button>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {r.description}
            </p>

            {/* META */}
            <div className="flex justify-between items-center text-xs text-gray-400">

              <span className="flex items-center gap-2">
                <CalendarDays size={14} />
                {new Date(r.createdAt).toDateString()}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}