'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { ModalProps } from '@/types'
import { authAPI } from '@/lib/api'

interface ForgotPasswordModalProps extends ModalProps {
  onSwitchToLogin: () => void
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authAPI.forgotPassword(email)
      setSent(true)
    } catch (err) {
      // Handle error
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
            <span className="text-en">Reset password</span>
            <span className="text-am">የይለፍ ቃል ዳግም ስቀምጥ</span>
          </h2>
          {sent ? (
            <p className="text-[var(--fg-muted)] mt-2 text-sm">
              <span className="text-en">Reset link sent! Check your email.</span>
              <span className="text-am">ማስተካከያ ሊንክ ተልኳል! ኢሜይልዎን ይመልከቱ።</span>
            </p>
          ) : (
            <p className="text-[var(--fg-muted)] mt-2 text-sm">
              <span className="text-en">
                Enter your email and we'll send you a reset link
              </span>
              <span className="text-am">
                ኢሜይልን ያስገቡ እና የማስተካከያ ሊንክ እንልክልዎታለን
              </span>
            </p>
          )}
        </div>

        {!sent && (
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
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full"
            >
              <span className="text-en">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </span>
              <span className="text-am">
                {loading ? 'በማስተላለፍ ላይ...' : 'ማስተካከያ ሊንክ ይላኩ'}
              </span>
            </Button>
          </form>
        )}

        <Button
          variant="secondary"
          onClick={() => {
            onClose()
            onSwitchToLogin()
          }}
          className="w-full py-3 rounded-full mt-4"
        >
          <span className="text-en">Back to Login</span>
          <span className="text-am">ወደ መግቢያ ተመለስ</span>
        </Button>
      </div>
    </Modal>
  )
}