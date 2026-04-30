export default function StatsMarquee() {
  const stats = [
    { value: '2,500+', labelEn: 'Lists Created', labelAm: 'ዝርዝሮች ተፈጥሯል' },
    { value: '15M+', labelEn: 'ETB Contributed', labelAm: 'ብር ተሰብስቧል' },
    { value: '50+', labelEn: 'Cities Covered', labelAm: 'ከተሞች' },
    { value: '4.9 ★', labelEn: 'User Rating', labelAm: 'የተጠቃሚ ደረጃ' },
    { value: '3', labelEn: 'Payment Options', labelAm: 'የክፍያ አማራጮች' },
  ]

  return (
    <section className="bg-espresso py-8 relative overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-16 px-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/80">
                  <span className="font-display text-3xl font-semibold text-gold">{stat.value}</span>
                  <span className="text-sm">
                    <span className="text-en">{stat.labelEn}</span>
                    <span className="text-am">{stat.labelAm}</span>
                  </span>
                  {idx < stats.length - 1 && <div className="w-px h-8 bg-white/20 ml-8"></div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}