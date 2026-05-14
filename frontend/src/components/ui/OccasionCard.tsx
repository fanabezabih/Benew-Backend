import React from 'react'

interface OccasionCardProps {
  icon: React.ReactNode
  titleEn: string
  titleAm: string
  descriptionEn: string
  descriptionAm: string
  onClick: () => void
}

export default function OccasionCard({
  icon,
  titleEn,
  titleAm,
  descriptionEn,
  descriptionAm,
  onClick,
}: OccasionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-[32px] p-8 border border-[var(--border)] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-terracotta/20 w-full h-full"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-terracotta/10 to-gold/10 rounded-2xl flex items-center justify-center text-terracotta mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="font-display text-2xl font-semibold text-espresso mb-3">
        <span className="text-en">{titleEn}</span>
        <span className="text-am">{titleAm}</span>
      </h3>

      <p className="text-sm leading-relaxed text-espresso/60">
        <span className="text-en">{descriptionEn}</span>
        <span className="text-am">{descriptionAm}</span>
      </p>
    </button>
  )
}