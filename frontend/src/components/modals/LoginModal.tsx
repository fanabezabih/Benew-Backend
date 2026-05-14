'use client'

import { useState } from 'react'

import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

import { useAuth } from '@/context/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps) {
  const { login } = useAuth()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      await login(email, password)

      onClose()

      window.location.href =
        '/dashboard'
    } catch (err: any) {
      console.error(err)

      setError(
        err?.response?.data?.message ||
          'Login failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <img
            src="/images/Benenew-01.png"
            alt="Bene'nw Logo"
            className="h-16 w-auto mx-auto mb-3"
          />

          <h2 className="font-display text-3xl font-semibold text-espresso">
            Welcome Back
          </h2>

          <p className="text-sm text-espresso/60 mt-2">
            Login to your account
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-espresso mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-espresso mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="********"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? 'Logging in...'
              : 'Login'}
          </Button>
        </form>
      </div>
    </Modal>
  )
}