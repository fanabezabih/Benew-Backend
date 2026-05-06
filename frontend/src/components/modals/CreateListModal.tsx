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
        eventDate: formData.eventDate, // 🔥 IMPORTANT FIX
        goalAmount: 10000,
        description: `${formData.title} - ${formData.occasionType}`,
      });

      onClose();

      // optional refresh
      window.location.reload();

    } catch (err: any) {
      setError(err.message || 'Failed to create list');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">

        <h2 className="text-2xl font-semibold mb-6">
          Create your list
        </h2>

        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* OCCASION */}
          <select
            value={formData.occasionType}
            onChange={(e) =>
              setFormData({ ...formData, occasionType: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl"
            required
          >
            <option value="">Select occasion</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="graduation">Graduation</option>
          </select>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl"
            required
          />

          {/* DATE */}
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) =>
              setFormData({ ...formData, eventDate: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl"
            required
          />

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Button type="button" onClick={onClose} className="flex-1">
              Cancel
            </Button>

            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>

        </form>
      </div>
    </Modal>
  );
}