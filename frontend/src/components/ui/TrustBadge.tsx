import React from 'react'

interface TrustBadgeProps {
  icon: React.ReactNode
  textEn: string
  textAm: string
}

export default function TrustBadge({ icon, textEn, textAm }: TrustBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--border)] rounded-full text-sm font-medium text-[var(--fg-muted)] hover:border-terracotta hover:text-terracotta transition-all">
      {icon}
      <span className="text-en">{textEn}</span>
      <span className="text-am">{textAm}</span>
    </span>
  )
}