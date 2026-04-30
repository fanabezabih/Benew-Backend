import Button from '@/components/ui/Button'
import { useModals } from '@/context/ModalContext'

export default function Pricing() {
  const { openModal } = useModals()
  
  const plans = [
    { nameEn: 'Free', nameAm: 'ነጻ', descEn: 'Perfect for personal use', descAm: 'ለግል አጠቃቀም', price: 0, features: [{en:'1 active list',am:'1 ንቁ ዝርዝር'},{en:'Shareable link',am:'የሚጋራ ሊንክ'},{en:'Basic customization',am:'መሰረታዊ ብጁ'},{en:'Basic dashboard',am:'መሰረታዊ ዳሽቦርድ'}], action: 'signup' },
    { nameEn: 'Plus', nameAm: 'ፕላስ', descEn: 'For families & events', descAm: 'ለቤተሰቦችና ክስተቶች', price: 299, popular: true, features: [{en:'Multiple payment options',am:'ብዙ የክፍያ አማራጮች'},{en:'Contribution collection',am:'የአስተዋፅኦ ስብሰባ'},{en:'Custom cover & colors',am:'ብጁ ሽፋንና ቀለሞች'},{en:'QR invite code',am:'QR የግብዣ ኮድ'},{en:'Thank-you notes',am:'የምስጋና ማስታወሻዎች'}], action: 'signup' },
    { nameEn: 'Premium', nameAm: 'ፕሪምየም', descEn: 'For planners & businesses', descAm: 'ለአስተባባሪዎች', price: 599, features: [{en:'Everything in Plus',am:'ሁሉም በፕላስ ውስጥ'},{en:'Custom short link',am:'ብጁ አጭር ሊንክ'},{en:'Multiple admins',am:'ብዙ አስተዳዳሪዎች'},{en:'Scheduled reminders',am:'የተቀጠሩ ማስታወሻዎች'},{en:'Priority support',am:'ቅድሚያ ያለው ድጋፍ'}], action: 'contact' },
  ]

  const handleAction = (action: string) => openModal(action as any)

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-semibold mb-4 reveal">
            <span className="text-en">Pricing</span><span className="text-am">ዋጋ</span>
          </div>
          <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold text-espresso">
            <span className="text-en">Start free. Grow with you.</span><span className="text-am">ነጻ ይጀምሩ። ከእርስዎ ጋር ይበታተኑ።</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`reveal reveal-delay-${i+1} rounded-2xl p-8 transition-all hover:-translate-y-1 ${plan.popular ? 'bg-terracotta border border-terracotta text-white relative shadow-xl shadow-terracotta/20' : 'bg-white border border-[var(--border)] hover:border-terracotta/30'}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-espresso text-xs font-bold rounded-full"><span className="text-en">POPULAR</span><span className="text-am">ታዋቂ</span></div>}
              <h3 className="font-display text-xl font-semibold mb-2"><span className="text-en">{plan.nameEn}</span><span className="text-am">{plan.nameAm}</span></h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-[var(--fg-muted)]'}`}><span className="text-en">{plan.descEn}</span><span className="text-am">{plan.descAm}</span></p>
              <div className={`font-display text-4xl font-bold mb-6 ${plan.popular ? '' : 'text-espresso'}`}>{plan.price === 0 ? '0' : plan.price} <span className={`text-lg font-normal ${plan.popular ? 'text-white/70' : 'text-[var(--fg-muted)]'}`}>ETB</span></div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 text-sm ${plan.popular ? 'text-white/90' : 'text-espresso/70'}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? 'white' : '#C45D3E'} strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-en">{f.en}</span><span className="text-am">{f.am}</span>
                  </li>
                ))}
              </ul>
              <Button variant="secondary" onClick={() => handleAction(plan.action)} className={`w-full py-3 rounded-full ${plan.popular ? 'bg-white text-terracotta hover:bg-ivory border-white' : ''}`}>
                <span className="text-en">{plan.action === 'signup' ? 'Get Started' : 'Contact Sales'}</span>
                <span className="text-am">{plan.action === 'signup' ? 'ይጀምሩ' : 'ይገናኙ'}</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}