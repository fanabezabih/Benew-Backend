'use client'

import React, { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ModalProps } from '@/types'

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps & { children: React.ReactNode; className?: string }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-white/50 backdrop-blur-sm z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-white rounded-3xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto transform scale-100 transition-transform shadow-2xl',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}