'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { ModalProps } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps extends ModalProps {
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToSignup,
  onSwitchToForgot,
}: LoginModalProps) {

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      await login(email, password);

      // ✅ CLOSE MODAL
      onClose();

      // 🔥 REDIRECT AFTER LOGIN (IMPORTANT)
      window.location.href = "/dashboard";

    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">

        {/* HEADER */}
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
            <span className="text-en">
              Log in to manage your gift lists
            </span>
            <span className="text-am">
              የስጦታ ርዝሮችን ለማስተዳደር ይግቡ
            </span>
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
              required
            />
          </div>

          {/* FORGOT */}
          <div className="flex justify-between text-sm">
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToForgot();
              }}
            >
              Forgot password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {/* SIGNUP */}
          <p className="text-center text-sm">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToSignup();
              }}
              className="text-terracotta font-semibold"
            >
              Sign up
            </button>
          </p>

        </form>
      </div>
    </Modal>
  );
}