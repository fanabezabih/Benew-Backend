'use client';

import { useState } from 'react';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

import { ModalProps } from '@/types';

import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalContext';

interface SignupModalProps
  extends ModalProps {

  onSwitchToLogin: () => void;
}

export default function SignupModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: SignupModalProps) {

  const { register } = useAuth();

  const { openModal } =
    useModals();

  const [formData, setFormData] =
    useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      agreeTerms: false,
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!formData.agreeTerms) {

      setError(
        'Please agree to the terms'
      );

      return;
    }

    setLoading(true);

    setError('');

    try {

      const fullName =
        `${formData.firstName} ${formData.lastName}`.trim();

      await register(
        fullName,
        formData.email,
        formData.password
      );

      onClose();

      alert(
        '✅ Account created successfully! Please log in.'
      );

      setTimeout(() => {

        openModal('login');

      }, 500);

    } catch (err: any) {

      console.error(err);

      setError(
        err?.response?.data?.message ||
        'Failed to create account'
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-8">

        <div className="text-center mb-6">

          <img
            src="/images/Benenew-01.png"
            alt="Bene'nw Logo"
            className="h-16 w-auto mx-auto mb-3"
          />

          <h2 className="font-display text-2xl font-semibold text-espresso">

            <span className="text-en">
              Create your account
            </span>

            <span className="text-am">
              መለያ ይፍጠሩ
            </span>

          </h2>

          <p className="text-[var(--fg-muted)] mt-2 text-sm">

            <span className="text-en">
              Start your gift registry in minutes
            </span>

            <span className="text-am">
              የስጦታ ዝርዝርዎን በትንሽ ይጀምሩ
            </span>

          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium mb-1">
                First Name
              </label>

              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName:
                      e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-xl"
                required
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>

              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName:
                      e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-xl"
                required
              />

            </div>
          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-xl"
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-xl"
              minLength={8}
              required
            />

          </div>

          <div className="flex items-start gap-2">

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
              required
            />

            <span className="text-sm">
              I agree to the terms
            </span>

          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >

            {loading
              ? 'Creating account...'
              : 'Create Account'}

          </Button>

          <p className="text-center text-sm">

            Already have an account?{' '}

            <button
              type="button"
              onClick={() => {

                onClose();

                onSwitchToLogin();

              }}
              className="text-terracotta font-semibold"
            >
              Login
            </button>

          </p>

        </form>
      </div>
    </Modal>
  );
}