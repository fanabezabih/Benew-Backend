'use client'

import { useState } from 'react'

import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

import { useAuth } from '@/context/AuthContext'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export default function SignupModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: SignupModalProps) {
  const { register } = useAuth()

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      agreeTerms: false,
    })

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      setError(
        'Please agree to the terms'
      )

      return
    }

    setLoading(true)
    setError('')

    try {
      const fullName =
        `${formData.firstName} ${formData.lastName}`.trim()

      await register(
        fullName,
        formData.email,
        formData.password
      )

      onClose()

      alert(
        '✅ Account created successfully!'
      )

      setTimeout(() => {
        onSwitchToLogin()
      }, 300)
    } catch (err: any) {
      console.error(err)

      setError(
        err?.response?.data?.message ||
          'Signup failed'
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
            Create Account
          </h2>

          <p className="text-sm text-espresso/60 mt-2">
            Start your registry today
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
          {/* NAMES */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-espresso mb-1">
                First Name
              </label>

              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName:
                      e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-espresso mb-1">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName:
                      e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-espresso mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
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
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              minLength={8}
              required
            />
          </div>

          {/* TERMS */}
          <label className="flex items-center gap-2 text-sm text-espresso/70">
            <input
              type="checkbox"
              checked={
                formData.agreeTerms
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  agreeTerms:
                    e.target.checked,
                })
              }
            />

            I agree to the terms
          </label>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading
              ? 'Creating account...'
              : 'Create Account'}
          </Button>

          {/* SWITCH */}
          <p className="text-center text-sm text-espresso/60">
            Already have an account?{' '}

            <button
              type="button"
              onClick={() => {
                onClose()
                onSwitchToLogin()
              }}
              className="text-terracotta font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </Modal>
  )
}