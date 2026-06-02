'use client'

import { useAuth } from '@/context/AuthContext'
import { useModals } from '@/context/ModalContext'

export default function FinalCTA() {

  const { openModal } = useModals()
  const { user } = useAuth()

  return (

    <section className="relative overflow-hidden py-24 lg:py-32">

      {/* LIGHT ORANGE BACKGROUND */}
      <div className="absolute inset-0 bg-[#f6dfd2]" />

      {/* SOFT GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7e7dc] via-[#f6dfd2] to-[#efd2c2]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <div>

            <h2 className="mb-4 font-display text-4xl font-semibold text-[#2f1712] lg:text-5xl">

              Ready to create your list?

            </h2>

            <p className="text-lg text-[#5f5149] leading-8">

              It's simple, elegant, and free.

            </p>

          </div>

          {/* RIGHT */}
          <div>

            <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[#ead7cd]">

              <button
                onClick={() =>
                  user
                    ? (window.location.href =
                        '/dashboard')
                    : openModal('signup')
                }
                className="w-full rounded-full bg-[#de6f3d] py-4 text-lg font-semibold text-white transition-all hover:bg-[#c95f32]"
              >

                Create Your Gift List — Free

              </button>

              <p className="mt-4 text-center text-sm text-[#6b5c54]">

                Join hundreds creating smarter gift
                lists

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}