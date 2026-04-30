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
    <div className="bg-white rounded-2xl p-6 border border-[var(--border)] transition-all hover:-translate-y-1 hover:shadow-lg text-center">
      <div className="w-16 h-16 mx-auto bg-terracotta/10 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-espresso mb-2">
        <span className="text-en">{titleEn}</span>
        <span className="text-am">{titleAm}</span>
      </h3>
      <p className="text-espresso/60 text-sm">
        <span className="text-en">{descriptionEn}</span>
        <span className="text-am">{descriptionAm}</span>
      </p>
    </div>
  )
}