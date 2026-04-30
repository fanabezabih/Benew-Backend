import Button from './Button'
import { PricingPlan } from '@/types'

interface PricingCardProps {
  plan: PricingPlan
  onAction: (action: string) => void
}

export default function PricingCard({ plan, onAction }: PricingCardProps) {
  return (
    <div
      className={`rounded-2xl p-8 transition-all hover:-translate-y-1 ${
        plan.popular
          ? 'bg-terracotta border border-terracotta text-white shadow-xl shadow-terracotta/20 relative'
          : 'bg-white border border-[var(--border)] hover:border-terracotta/30'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-espresso text-xs font-bold rounded-full">
          <span className="text-en">POPULAR</span>
          <span className="text-am">ታዋቂ</span>
        </div>
      )}
      <h3 className="font-display text-xl font-semibold mb-2">
        <span className="text-en">{plan.nameEn}</span>
        <span className="text-am">{plan.nameAm}</span>
      </h3>
      <p
        className={`text-sm mb-6 ${
          plan.popular ? 'text-white/70' : 'text-[var(--fg-muted)]'
        }`}
      >
        <span className="text-en">{plan.descriptionEn}</span>
        <span className="text-am">{plan.descriptionAm}</span>
      </p>
      <div
        className={`font-display text-4xl font-bold mb-6 ${
          plan.popular ? '' : 'text-espresso'
        }`}
      >
        {plan.price === 0 ? '0' : plan.price}{' '}
        <span
          className={`text-lg font-normal ${
            plan.popular ? 'text-white/70' : 'text-[var(--fg-muted)]'
          }`}
        >
          {plan.currency}
        </span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 text-sm ${
              plan.popular ? 'text-white/90' : 'text-espresso/70'
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={plan.popular ? 'white' : '#C45D3E'}
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-en">{feature.textEn}</span>
            <span className="text-am">{feature.textAm}</span>
          </li>
        ))}
      </ul>
      <Button
        variant={plan.popular ? 'secondary' : 'secondary'}
        onClick={() => onAction(plan.buttonAction)}
        className={`w-full py-3 ${
          plan.popular
            ? 'bg-white text-terracotta hover:bg-ivory border-white'
            : ''
        }`}
      >
        <span className="text-en">
          {plan.buttonAction === 'signup' ? 'Get Started' : 'Contact Sales'}
        </span>
        <span className="text-am">
          {plan.buttonAction === 'signup' ? 'ይጀምሩ' : 'ይገናኙ'}
        </span>
      </Button>
    </div>
  )
}