'use client'

import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL BOX */}
      <div
        className={`
          relative
          bg-white
          rounded-[32px]
          shadow-2xl
          w-full
          max-w-lg
          overflow-hidden
          border border-white/40
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  )
}