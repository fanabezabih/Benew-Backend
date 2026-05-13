'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = '',
}: ModalProps) {

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
      "
    >
      {/* BACKDROP */}
      <div
        className="
          absolute inset-0
          bg-black/50
        "
        onClick={onClose}
      />

      {/* MODAL CONTENT */}
      <div
        className={`
          relative z-10
          bg-white
          rounded-2xl
          shadow-2xl
          w-full
          max-w-md
          mx-4
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}