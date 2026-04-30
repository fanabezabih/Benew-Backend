// src/components/modals/SearchModal.tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { ModalProps } from '@/types';
import { registryAPI } from '@/lib/api';

export default function SearchModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    occasion: '',
    inviteCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend expects ?q= query parameter
      const searchQuery = [formData.firstName, formData.lastName, formData.occasion]
        .filter(Boolean)
        .join(' ');
      
      const results = await registryAPI.search(searchQuery);
      console.log('Search results:', results);
      
      onClose();
      // You can pass results to a parent state or redirect to /search?q=...
    } catch (err: any) {
      setError(err.message || 'Search failed');
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
            <span className="text-en">Find a gift list</span>
            <span className="text-am">ዝርዝር ይፈልጉ</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-2 text-sm">
            <span className="text-en">Search by name, occasion, or private invite code</span>
            <span className="text-am">በስም፣ በአጋሚ ወይም በልዩ ግብዣ ድ ይፈልጉ</span>
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
              <span className="text-en">First Name</span>
              <span className="text-am">ስም</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Search by first name..."
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] text-lg focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Last Name</span>
              <span className="text-am">የአባት ም</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Search by last name..."
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Occasion</span>
              <span className="text-am">አጋጣሚ</span>
            </label>
            <select
              value={formData.occasion}
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
            >
              <option value="">All occasions</option>
              <option value="wedding">Wedding / ሰርግ</option>
              <option value="baby">Baby / ልደት</option>
              <option value="newborn">Newborn Gift / የአዲስ ሕን ጦታ</option>
              <option value="birthday">Birthday / ልደት በዓል</option>
              <option value="graduation">Graduation / ረቃ</option>
              <option value="housewarming">Housewarming / አስ ቤት</option>
              <option value="christmas">Christmas Gift / የገና ስጦታ</option>
              <option value="trip">Fund My Trip / ጉዞዬን ደግፉ</option>
              <option value="justbecause">Just Because / ስለ ምንም ነገር</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1">
              <span className="text-en">Invite Code (optional)</span>
              <span className="text-am">የግዣ ኮድ (አማራጭ)</span>
            </label>
            <input
              type="text"
              value={formData.inviteCode}
              onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
              placeholder="e.g., BEN-XXXX"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-mono font-[inherit] focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/10"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" type="button" onClick={onClose} className="flex-1 py-3 rounded-full">
              <span className="text-en">Cancel</span>
              <span className="text-am">ሰርዝ</span>
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 py-3 rounded-full">
              <span className="text-en">{loading ? 'Searching...' : 'Search'}</span>
              <span className="text-am">{loading ? 'በመፈለግ ላይ...' : 'ፈልግ'}</span>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}