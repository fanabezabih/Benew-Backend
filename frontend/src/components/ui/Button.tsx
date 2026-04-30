import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        variant === 'primary' &&
          'bg-gradient-to-br from-terracotta to-terracotta-dark text-white rounded-full font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-terracotta/30 inline-flex items-center justify-center gap-2 border-none cursor-pointer font-[inherit]',
        variant === 'secondary' &&
          'bg-transparent text-espresso rounded-full font-semibold transition-all border-2 border-[var(--border)] hover:bg-espresso hover:text-cream hover:border-espresso inline-flex items-center justify-center gap-2 cursor-pointer font-[inherit]',
        size === 'sm' && 'px-5 py-2 text-sm',
        size === 'md' && 'px-8 py-4',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}