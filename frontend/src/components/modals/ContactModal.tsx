'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { ModalProps } from '@/types'

export default function ContactModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // API call would go here
    setTimeout(() => {
      setLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px]">
      <div className="p-8">
        <div className="text-center mb-6">
          <img
            src="/images/Benenew-01.png"
            alt="Bene'nw Logo"
            className="h-16 w-auto mx-auto mb-3"
          />
          <h2 className="font-display text-2xl font-semibold text-espresso">
            <span className="text-en">Contact Us</span>
            <span className="text-am">አግኙን</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
                <span className="text-en">Name</span>
                <span className="text-am">ስም</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your name"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
                <span className="text-en">Email</span>
                <span className="text-am">ኢሜይል</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Subject</span>
              <span className="text-am">ርዕስ</span>
            </label>
            <select
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
            >
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Partnership</option>
              <option>Vendor Registration</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Message</span>
              <span className="text-am">መልዕክት</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              placeholder="How can we help?"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 resize-none"
              required
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full"
            >
              <span className="text-en">Cancel</span>
              <span className="text-am">ሰርዝ</span>
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-full"
            >
              <span className="text-en">
                {loading ? 'Sending...' : 'Send Message'}
              </span>
              <span className="text-am">
                {loading ? 'በላክ ላይ...' : 'መልዕክት ይላኩ'}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}