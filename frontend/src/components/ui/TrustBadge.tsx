import React from 'react'

interface TrustBadgeProps {
  icon: React.ReactNode
  textEn: string
  textAm: string
}

export default function TrustBadge({
  icon,
  textEn,
  textAm,
}: TrustBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[var(--border)] rounded-full text-sm font-medium text-espresso/70 hover:border-terracotta hover:text-terracotta transition-all duration-300">
      {icon}

      <span className="text-en">{textEn}</span>
      <span className="text-am">{textAm}</span>
    </div>
  )
}