export default function Testimonials() {
  const testimonials = [
    { name: 'Sara & Abebe', initials: 'SA', occasion: 'Wedding', location: 'Addis Ababa', text: '"Bene\'nw made our wedding registry so easy. Family from Addis and diaspora relatives all contributed through one link."', color: 'terracotta' },
    { name: 'Fikadu & Tsion', initials: 'FT', occasion: 'Baby Registry', location: 'Bahir Dar', text: '"We used it for our baby shower and it was beautiful. Everyone could contribute towards the items we actually needed."', color: 'gold' },
    { name: 'Daniel H.', initials: 'DH', occasion: 'Contributor', location: 'Washington DC', text: '"I contributed from the US to my friend\'s graduation fund. The international payment worked perfectly."', color: 'sage' },
  ]

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-ivory to-ivory-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-semibold mb-4 reveal">
            <span className="text-en">Testimonials</span><span className="text-am">ምስክርነቶች</span>
          </div>
          <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold text-espresso">
            <span className="text-en">Loved by Ethiopian families</span><span className="text-am">የኢትዮጵያ ቤተሰቦች ደሞውቱት</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className={`reveal reveal-delay-${i+1} bg-white rounded-2xl p-8 border border-[var(--border)]`}>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p className="text-espresso/70 mb-4 text-sm">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${t.color}/10 rounded-full flex items-center justify-center text-${t.color} font-bold`}>{t.initials}</div>
                <div>
                  <p className="font-semibold text-sm text-espresso">{t.name}</p>
                  <p className="text-xs text-[var(--fg-muted)]">{t.occasion} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}