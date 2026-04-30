// src/components/modals/CreateListModal.tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { ModalProps } from '@/types';
import { registryAPI } from '@/lib/api';

export default function CreateListModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    occasionType: '',
    title: '',
    eventDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await registryAPI.create({
        title: formData.title,
        occasion: formData.occasionType,
        goalAmount: 10000,
        description: `${formData.title} - ${formData.occasionType}`
      });
      onClose();
      // Optional: redirect to dashboard or new registry
      // window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Failed to create list');
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
            <span className="text-en">Create your list</span>
            <span className="text-am">ዝርዝርን ይፍጠሩ</span>
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Occasion Type</span>
              <span className="text-am">የአጋሚ ዓይነት</span>
            </label>
            <select
              value={formData.occasionType}
              onChange={(e) => setFormData({ ...formData, occasionType: e.target.value })}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            >
              <option value="">Select occasion...</option>
              <option value="wedding">Wedding / ሰርግ</option>
              <option value="baby">Baby Shower / የሕፃን ትሽት</option>
              <option value="newborn">Newborn Gift / የአስ ፃን ስጦታ</option>
              <option value="birthday">Birthday / ልደት በዓል</option>
              <option value="graduation">Graduation / ምረቃ</option>
              <option value="housewarming">Housewarming / አዲስ ቤት</option>
              <option value="christmas">Christmas Gift / የገና ጦ</option>
              <option value="trip">Fund My Trip / ጉዞን ደግፉ</option>
              <option value="justbecause">Just Because / ስለ ምንም ነገር</option>
              <option value="group">Group Fund / የቡድን ፈንድ</option>
              <option value="holiday">Holiday / በል</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">List Title</span>
              <span className="text-am">የዝርዝር ርዕስ</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Abebe & Sara's Wedding"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Event Date</span>
              <span className="text-am">የክስተት ቀን</span>
            </label>
            <input
              type="date"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={onClose} className="flex-1 py-3 rounded-full">
              <span className="text-en">Cancel</span>
              <span className="text-am">ሰርዝ</span>
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 py-3 rounded-full">
              <span className="text-en">{loading ? 'Creating...' : 'Create List'}</span>
              <span className="text-am">{loading ? 'በስ ላይ...' : 'ዝርር ይፍጠ'}</span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}