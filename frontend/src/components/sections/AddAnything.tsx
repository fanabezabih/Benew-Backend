import FeatureCard from '@/components/ui/FeatureCard'

export default function AddAnything() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-semibold mb-4 reveal">
            <span className="text-en">Add Anything</span><span className="text-am">ማንኛውንም ያክሉ</span>
          </div>
          <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold text-espresso">
            <span className="text-en">Not tied to one store. Not limited to one idea.</span>
            <span className="text-am">ለአንድ ሱቅ አይገዙ አንድ ሳብ አይወሰኑ።</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="reveal reveal-delay-1 feature-card text-center">
            <div className="w-16 h-16 mx-auto bg-terracotta/10 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C45D3E" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <h3 className="font-display text-xl font-semibold text-espresso mb-2"><span className="text-en">Add Gifts from Any Store</span><span className="text-am">ከማንኛውም ሱቅ ስጦታ ያክሉ</span></h3>
            <p className="text-espresso/60 text-sm"><span className="text-en">Paste a product link or add custom items. No store restrictions.</span><span className="text-am">የምርት ሊንክ ይለፉ ወይም ብጁ ንጥሎች ያክሉ።</span></p>
          </div>
          <div className="reveal reveal-delay-2 feature-card text-center">
            <div className="w-16 h-16 mx-auto bg-gold/10 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="font-display text-xl font-semibold text-espresso mb-2"><span className="text-en">Cash Goals & Contributions</span><span className="text-am">የገንዘብ ግቦችና አስተዋፅኦ</span></h3>
            <p className="text-espresso/60 text-sm"><span className="text-en">Set funding goals for weddings, travel, education, or any project.</span><span className="text-am">ለሰርግ ጉዞ ትምህርት ወይም ማንኛውም ፕሮጀክት የገንዘብ ግብ ያስቀምጡ</span></p>
          </div>
          <div className="reveal reveal-delay-3 feature-card text-center">
            <div className="w-16 h-16 mx-auto bg-sage/10 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B9A7D" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <h3 className="font-display text-xl font-semibold text-espresso mb-2"><span className="text-en">Custom Ideas & Experiences</span><span className="text-am">ብጁ ሃሳቦችና ልምዶች</span></h3>
            <p className="text-espresso/60 text-sm"><span className="text-en">Add experiences, services, or anything that matters to you.</span><span className="text-am">ልምዶችን አገልግሎቶችን ወይም ለእርስዎ ጠቃሚ ማንኛውንም ነገር ያክሉ</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}