// src/components/sections/HowItWorks.tsx
export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      titleEn: 'Create your list',
      titleAm: 'ዝርዝርዎን ይፍሩ',
      descriptionEn: 'Add anything — gifts or cash goals.',
      descriptionAm: 'ማንኛውንም ይጨምሩ — ጦታች ወይም የገንዘብ ግቦች።',
    },
    {
      number: '2',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      titleEn: 'Share your link',
      titleAm: 'ሊንዎን ያሩ',
      descriptionEn: 'Send it on WhatsApp, Telegram, or anywhere.',
      descriptionAm: 'በWhatsApp፣ Telegram ወይም በማንኛውም ቦታ ይላ።',
    },
    {
      number: '3',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      titleEn: 'Receive gifts',
      titleAm: 'ስጦታዎችን ይቀበ',
      descriptionEn: 'Get support instantly and securely.',
      descriptionAm: 'ድጋፍን በፍነት እና በደህንነት ይበሉ',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="reveal font-display text-4xl lg:text-5xl font-semibold text-espresso">
            <span className="text-en">How it works</span>
            <span className="text-am">እንዴት እንደሚሰራ</span>
          </h2>
          <div className="w-16 h-1 bg-terracotta mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="reveal reveal-delay-{index}">
              <div className="relative">
                {/* Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-terracotta text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-20 h-20 mx-auto bg-cream rounded-full flex items-center justify-center text-terracotta mb-6">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-display text-xl font-semibold text-espresso mb-2">
                    <span className="text-en">{step.titleEn}</span>
                    <span className="text-am block text-sm text-espresso/70">{step.titleAm}</span>
                  </h3>
                  <p className="text-espresso/60 text-sm">
                    <span className="text-en">{step.descriptionEn}</span>
                    <span className="text-am block text-xs">{step.descriptionAm}</span>
                  </p>
                </div>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-8 text-terracotta/30">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}