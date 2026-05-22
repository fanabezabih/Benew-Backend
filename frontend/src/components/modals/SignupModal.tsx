'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export default function SignupModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: Props) {
  const { register } = useAuth()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agree: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.agree) {
      setError('Please agree to terms')
      return
    }

    setLoading(true)
    setError('')

    try {
      const fullName = `${form.firstName} ${form.lastName}`

      await register(fullName, form.email, form.password)

      onClose()
      onSwitchToLogin() // IMPORTANT FIX
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="First Name"
            className="w-full border p-3 rounded-xl"
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
            required
          />

          <input
            placeholder="Last Name"
            className="w-full border p-3 rounded-xl"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
            required
          />

          <input
            placeholder="Email"
            type="email"
            className="w-full border p-3 rounded-xl"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full border p-3 rounded-xl"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) =>
                setForm({ ...form, agree: e.target.checked })
              }
            />
            I agree to terms
          </label>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d96b3c] text-white"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </Button>

          <p className="text-center text-sm">
            Already have account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose()
                onSwitchToLogin()
              }}
              className="text-terracotta"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </Modal>
  )
}