'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { ModalProps } from '@/types'
import { authAPI } from '@/lib/api'

interface LoginModalProps extends ModalProps {
  onSwitchToSignup: () => void
  onSwitchToForgot: () => void
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
  onSwitchToForgot,
}: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await authAPI.login({ email, password })
      onClose()
      // Redirect to dashboard
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-center mb-6">
          <img
            src="/images/Benenew-01.png"
            alt="Bene'nw Logo"
            className="h-16 w-auto mx-auto mb-3"
          />
          <h2 className="font-display text-2xl font-semibold text-espresso">
            <span className="text-en">Welcome back</span>
            <span className="text-am">እንኳን ደህና መጡ</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-2 text-sm">
            <span className="text-en">Log in to manage your gift lists</span>
            <span className="text-am">የስጦታ ርዝሮችን ለማስተዳደር ይግቡ</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Email address</span>
              <span className="text-am">ኢሜይል</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Password</span>
              <span className="text-am">የይለፍ ቃል</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[var(--border)] text-terracotta focus:ring-terracotta"
              />
              <span className="text-en">Remember me</span>
              <span className="text-am">አስታውሰኝ</span>
            </label>
            <button
              type="button"
              onClick={() => {
                onClose()
                onSwitchToForgot()
              }}
              className="text-sm text-terracotta hover:underline font-medium"
            >
              <span className="text-en">Forgot password?</span>
              <span className="text-am">የይለፍ ቃል ረስዎት?</span>
            </button>
          </div>
          <Button type="submit" disabled={loading} className="w-full py-3 rounded-full">
            {loading ? (
              <span className="text-en">Logging in...</span>
            ) : (
              <>
                <span className="text-en">Log In</span>
                <span className="text-am">ግባ</span>
              </>
            )}
          </Button>
          <p className="text-center text-sm text-[var(--fg-muted)]">
            <span className="text-en">Don't have an account?</span>
            <span className="text-am">መለያ የለዎትም?</span>
            <button
              type="button"
              onClick={() => {
                onClose()
                onSwitchToSignup()
              }}
              className="text-terracotta font-semibold ml-1 hover:underline"
            >
              <span className="text-en">Sign Up</span>
              <span className="text-am">ይመዝገቡ</span>
            </button>
          </p>
        </form>
      </div>
    </Modal>
  )
}