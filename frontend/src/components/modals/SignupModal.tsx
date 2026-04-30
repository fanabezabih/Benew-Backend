// src/components/modals/SignupModal.tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { ModalProps } from '@/types';
import { authAPI } from '@/lib/api';
import { useModals } from '@/context/ModalContext';

interface SignupModalProps extends ModalProps {
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const { openModal } = useModals();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setError('Please agree to the terms');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await authAPI.register({
        name: fullName,
        email: formData.email,
        password: formData.password,
      });
      
      // ✅ Close signup modal and show success message
      onClose();
      alert('✅ Account created successfully! Please log in.');
      
      // ✅ Open login modal after a short delay
      setTimeout(() => {
        openModal('login');
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-center mb-6">
          <img src="/images/Benenew-01.png" alt="Bene'nw Logo" className="h-16 w-auto mx-auto mb-3" />
          <h2 className="font-display text-2xl font-semibold text-espresso">
            <span className="text-en">Create your account</span>
            <span className="text-am">መለያ ይፍጠሩ</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-2 text-sm">
            <span className="text-en">Start your gift registry in minutes</span>
            <span className="text-am">የስጦታ ዝርዝርዎን በትንሽ ይጀምሩ</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
                <span className="text-en">First Name</span>
                <span className="text-am">ስም</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="First name"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
                <span className="text-en">Last Name</span>
                <span className="text-am">የአባት ስም</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Last name"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Email address</span>
              <span className="text-am">ኢሜይል</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Phone (optional)</span>
              <span className="text-am">ስልክ (አማራጭ)</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+251 9XX XXX XXX"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Password</span>
              <span className="text-am">የይለፍ ቃል</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Min 8 characters"
              minLength={8}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>
          <div>
            <label className="flex items-start gap-2 text-sm text-[var(--fg-muted)]">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-[var(--border)] text-terracotta focus:ring-terracotta"
                required
              />
              <span className="text-en">
                I agree to the{' '}
                <a href="#" className="text-terracotta hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-terracotta hover:underline">Privacy Policy</a>
              </span>
              <span className="text-am">
                <a href="#" className="text-terracotta hover:underline">የአገልግሎት ውል</a>{' '}
                እና{' '}
                <a href="#" className="text-terracotta hover:underline">የግላዊነት ፖሊሲ</a>{' '}
                ተስማምቻለሁ
              </span>
            </label>
          </div>
          <Button type="submit" disabled={loading} className="w-full py-3 rounded-full">
            {loading ? (
              <span className="text-en">Creating account...</span>
            ) : (
              <>
                <span className="text-en">Create Account</span>
                <span className="text-am">መለያ ይፍጠሩ</span>
              </>
            )}
          </Button>
          <p className="text-center text-sm text-[var(--fg-muted)]">
            <span className="text-en">Already have an account?</span>
            <span className="text-am">መለያ አለዎት?</span>
            <button
              type="button"
              onClick={() => { onClose(); onSwitchToLogin(); }}
              className="text-terracotta font-semibold ml-1 hover:underline"
            >
              <span className="text-en">Log In</span>
              <span className="text-am">ግ</span>
            </button>
          </p>
        </form>
      </div>
    </Modal>
  );
}