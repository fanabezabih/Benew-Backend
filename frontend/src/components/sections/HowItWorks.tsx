export default function HowItWorks() {
  const steps = [
    { num: '1', color: 'from-terracotta to-terracotta-dark', textClass: 'text-terracotta', titleEn: 'Create', titleAm: 'ይፍጠሩ', descEn: 'Open your list and choose your occasion.', descAm: 'ዝርዝርዎን ይክቱ እና አጋጣሚዎን ይምረጡ', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
    { num: '2', color: 'from-gold to-gold-dark', textClass: 'text-[#6B5A4E]', titleEn: 'Add', titleAm: 'ያክሉ', descEn: 'Add gifts, contribution goals, or personal wishes.', descAm: 'ስጦታዎችን፣ የገንዘብ ግቦችን ወይም ግላዊ ምርጫዎችን ያክሉ', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> },
    { num: '3', color: 'from-sage to-green-700', textClass: 'text-sage', titleEn: 'Share', titleAm: 'ያጋሩ', descEn: 'Send your list through WhatsApp, Telegram, or QR code.', descAm: 'ዝርዝርዎን በWhatsApp፣ Telegram ወይም QR ኮድ ያስተላልፉ', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> },
    { num: '4', color: 'from-espresso to-espresso-light', textClass: 'text-espresso', titleEn: 'Receive', titleAm: 'ይቀበሉ', descEn: 'Track gifts and contributions in one simple dashboard.', descAm: 'ስጦታዎችን እና አስተዋፅኦዎችን በአንድ ቀላል ዳሽቦርድ ይታውቁ', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  ]

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-semibold mb-4 reveal">
            <span className="text-en">How It Works</span><span className="text-am">እንዴት እንደሚሰራ</span>
          </div>
          <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold text-espresso">
            <span className="text-en">Simple to create. Easy to share. Better to receive.</span>
            <span className="text-am">ለመፍጠር ቀላል። ለማጋራት ቀላል። ለመቀበል የተሻለ።</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className={`reveal reveal-delay-${i+1} text-center`}>
              <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                {step.icon}
              </div>
              <div className={`font-display text-sm font-semibold ${step.textClass} mb-2`}>
                <span className="text-en">Step {step.num}</span><span className="text-am">ደረጃ {step.num}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-espresso mb-3">
                <span className="text-en">{step.titleEn}</span><span className="text-am">{step.titleAm}</span>
              </h3>
              <p className="text-espresso/60">
                <span className="text-en">{step.descEn}</span><span className="text-am">{step.descAm}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}