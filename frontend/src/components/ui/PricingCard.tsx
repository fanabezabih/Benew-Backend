import Button from './Button'
import { PricingPlan } from '@/types'

interface PricingCardProps {
  plan: PricingPlan
  onAction: (action: string) => void
}

export default function PricingCard({
  plan,
  onAction,
}: PricingCardProps) {
  return (
    <div
      className={`
        relative
        rounded-[32px]
        p-8
        transition-all
        duration-300
        hover:-translate-y-2

        ${
          plan.popular
            ? 'bg-terracotta text-white shadow-2xl shadow-terracotta/20'
            : 'bg-white border border-[var(--border)] hover:shadow-xl'
        }
      `}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-espresso text-xs font-bold rounded-full">
          POPULAR
        </div>
      )}

      <h3 className="font-display text-2xl font-semibold mb-2">
        <span className="text-en">{plan.nameEn}</span>
        <span className="text-am">{plan.nameAm}</span>
      </h3>

      <p
        className={`mb-6 text-sm ${
          plan.popular
            ? 'text-white/70'
            : 'text-[var(--fg-muted)]'
        }`}
      >
        <span className="text-en">{plan.descriptionEn}</span>
        <span className="text-am">{plan.descriptionAm}</span>
      </p>

      <div className="mb-8">
        <span className="font-display text-5xl font-bold">
          {plan.price}
        </span>

        <span
          className={`ml-2 ${
            plan.popular
              ? 'text-white/70'
              : 'text-[var(--fg-muted)]'
          }`}
        >
          {plan.currency}
        </span>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 text-sm ${
              plan.popular
                ? 'text-white/90'
                : 'text-espresso/70'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
              ✓
            </div>

            <span className="text-en">
              {feature.textEn}
            </span>

            <span className="text-am">
              {feature.textAm}
            </span>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => onAction(plan.buttonAction)}
        className={`w-full ${
          plan.popular
            ? 'bg-white text-terracotta hover:bg-cream'
            : ''
        }`}
      >
        <span className="text-en">
          {plan.buttonAction === 'signup'
            ? 'Get Started'
            : 'Contact Sales'}
        </span>

        <span className="text-am">
          {plan.buttonAction === 'signup'
            ? 'ይጀምሩ'
            : 'ይገናኙ'}
        </span>
      </Button>
    </div>
  )
}