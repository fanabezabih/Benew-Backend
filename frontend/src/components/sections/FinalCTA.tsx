'use client'

import { useAuth } from '@/context/AuthContext'
import { useModals } from '@/context/ModalContext'

export default function FinalCTA() {
  const { openModal } = useModals()
  const { user } = useAuth()

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-[#de6f3d] to-[#c85d2e]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-4xl font-semibold text-white lg:text-5xl">
              Ready to create your list?
            </h2>

            <p className="text-lg text-white/80">
              It's simple, elegant, and free.
            </p>
          </div>

          <div>
            <div className="rounded-3xl bg-white p-8 shadow-2xl">
              <button
                onClick={() =>
                  user
                    ? (window.location.href =
                        '/dashboard')
                    : openModal('signup')
                }
                className="w-full rounded-full bg-terracotta py-4 text-lg font-semibold text-white transition-all hover:bg-terracotta-dark"
              >
                Create Your Gift List — Free
              </button>

              <p className="mt-4 text-center text-sm text-espresso/60">
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