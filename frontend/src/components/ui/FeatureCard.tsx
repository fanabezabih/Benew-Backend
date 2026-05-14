import React from 'react'

interface FeatureCardProps {
  icon: React.ReactNode
  titleEn: string
  titleAm: string
  descriptionEn: string
  descriptionAm: string
}

export default function FeatureCard({
  icon,
  titleEn,
  titleAm,
  descriptionEn,
  descriptionAm,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-[var(--border)] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-terracotta/20">
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-terracotta/10 to-gold/10 rounded-2xl flex items-center justify-center text-terracotta mb-5">
        {icon}
      </div>

      <h3 className="font-display text-xl font-semibold text-espresso mb-2">
        <span className="text-en">{titleEn}</span>
        <span className="text-am">{titleAm}</span>
      </h3>

      <p className="text-sm leading-relaxed text-espresso/60">
        <span className="text-en">{descriptionEn}</span>
        <span className="text-am">{descriptionAm}</span>
      </p>
    </div>
  )
}