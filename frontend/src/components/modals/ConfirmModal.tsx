'use client'

import Modal from '@/components/ui/Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  variant?: 'danger' | 'primary'
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm',
  description = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  variant = 'danger',
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-5">

        <h2 className="text-xl font-semibold text-espresso">
          {title}
        </h2>

        <p className="text-gray-600">
          {description}
        </p>

        <div className="flex justify-end gap-3 pt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              px-5 py-2 rounded-xl text-white
              ${variant === 'danger'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#d96b3c] hover:bg-[#c85f34]'
              }
            `}
          >
            {loading ? 'Loading...' : confirmText}
          </button>

        </div>
      </div>
    </Modal>
  )
}