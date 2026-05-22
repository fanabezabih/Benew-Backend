'use client'

import { useEffect, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'

import { registryAPI } from '@/lib/api'

export default function EditRegistryPage() {

  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    title: '',
    description: '',
    occasion: '',
    goalAmount: 10000
  })

  // LOAD REGISTRY
  useEffect(() => {

    async function loadRegistry() {

      try {

        const data = await registryAPI.getById(
          params.id as string
        )

        setForm({
          title: data.title || '',
          description: data.description || '',
          occasion: data.occasion || '',
          goalAmount: data.progress?.goal || 10000
        })

      } catch (err) {
        console.log(err)

      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadRegistry()
    }

  }, [params.id])

  // SAVE
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      await registryAPI.update(
        params.id as string,
        form
      )

      router.push('/dashboard')

    } catch (err) {
      console.log(err)
    }
  }

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">

        <div className="relative flex items-center justify-center">

          <div className="w-28 h-28 border-4 border-[#e7d6cc] border-t-[#d96b3c] rounded-full animate-spin"></div>

          <img
            src="/images/benenew.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full object-cover absolute"
          />

        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream px-6 py-12">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-[#eee]">

        <h1 className="text-4xl font-display text-espresso mb-8">
          Edit Registry
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}
          <div>

            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
              className="w-full border rounded-2xl px-4 py-3"
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
              className="w-full border rounded-2xl px-4 py-3 h-32"
            />

          </div>

          {/* OCCASION */}
          <div>

            <label className="block mb-2 font-medium">
              Occasion
            </label>

            <input
              value={form.occasion}
              onChange={(e) =>
                setForm({
                  ...form,
                  occasion: e.target.value
                })
              }
              className="w-full border rounded-2xl px-4 py-3"
            />

          </div>

          {/* GOAL */}
          <div>

            <label className="block mb-2 font-medium">
              Goal Amount
            </label>

            <input
              type="number"
              value={form.goalAmount}
              onChange={(e) =>
                setForm({
                  ...form,
                  goalAmount: Number(e.target.value)
                })
              }
              className="w-full border rounded-2xl px-4 py-3"
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#d96b3c] hover:bg-[#c85f34] text-white py-4 rounded-2xl font-semibold transition"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  )
}