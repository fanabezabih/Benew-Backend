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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden ${className}`}
      >
        {children}
      </div>

    </div>
  )
}