'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        font-semibold
        rounded-full
        transition-all duration-300

        ${
          size === 'sm'
            ? 'px-4 py-2 text-sm'
            : 'px-6 py-3 text-base'
        }

        ${
          variant === 'primary'
            ? 'bg-terracotta hover:bg-terracotta-dark text-white'
            : 'bg-white border border-[var(--border)] text-espresso hover:border-terracotta'
        }

        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}