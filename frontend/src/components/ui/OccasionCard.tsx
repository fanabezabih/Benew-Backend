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
      className="bg-white rounded-3xl p-8 transition-all duration-400 border border-[var(--border)] relative overflow-hidden text-left group hover:-translate-y-2 hover:shadow-2xl hover:border-transparent w-full h-full flex flex-col"
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta to-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} />
      
      <div className="w-14 h-14 bg-gradient-to-br from-terracotta/10 to-gold/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0">
        {icon}
      </div>
      
      <h3 className="font-display text-xl font-semibold text-espresso mb-2">
        <span className="text-en">{titleEn}</span>
        <span className="text-am">{titleAm}</span>
      </h3>
      
      {/* This div will grow to fill space, making all cards equal height */}
      <div className="flex-grow">
        <p className="text-espresso/60 text-sm">
          <span className="text-en">{descriptionEn}</span>
          <span className="text-am">{descriptionAm}</span>
        </p>
      </div>
    </button>
  )
}