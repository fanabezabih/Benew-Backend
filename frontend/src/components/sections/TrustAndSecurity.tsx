export default function TrustAndSecurity() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-ivory to-ivory-dark relative overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern opacity-20" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 rounded-full text-sage text-sm font-semibold mb-4 reveal">
            <span className="text-en">Trust & Security</span>
            <span className="text-am">ታማኝነትና ደህንነት</span>
          </div>
          <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold text-espresso">
            <span className="text-en">Designed with trust in mind</span>
            <span className="text-am">ከታማኝነት ጋር የተሰራ</span>
          </h2>
          <p className="reveal reveal-delay-1 mt-4 text-lg text-espresso/60 max-w-2xl mx-auto">
            <span className="text-en">From payment protection to privacy settings and clear payout records, every part of the platform helps users feel secure.</span>
            <span className="text-am">ከክፍያ ጥበብ እስከ የግላዊነት ቅንብሮችና ግል የክፍያ መዝቦች ድረስት የመድረኩ እያኙን ክፍል እንዲሰማም ይረዳዳሉ።</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Secure Payments */}
          <div className="reveal reveal-delay-1 feature-card text-center">
            <div className="w-14 h-14 mx-auto bg-green-50 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="font-semibold text-espresso mb-1">
              <span className="text-en">Secure Payments</span>
              <span className="text-am">ደህንነቱ የተጠበቀ ክፍያ</span>
            </h3>
            <p className="text-espresso/60 text-sm">
              <span className="text-en">Bank-grade encryption on all transactions</span>
              <span className="text-am">በሁሉም ግብይቶች የባንክ ረጃ ጠራጅ</span>
            </p>
          </div>

          {/* Verified Payouts */}
          <div className="reveal reveal-delay-2 feature-card text-center">
            <div className="w-14 h-14 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="font-semibold text-espresso mb-1">
              <span className="text-en">Verified Payouts</span>
              <span className="text-am">የተረጋገጠ ክፍያ</span>
            </h3>
            <p className="text-espresso/60 text-sm">
              <span className="text-en">Clear payout records and timeline</span>
              <span className="text-am">ግል የክፍያ መዝቦችና ጊዜ መስመሪያ</span>
            </p>
          </div>

          {/* Privacy Controls */}
          <div className="reveal reveal-delay-3 feature-card text-center">
            <div className="w-14 h-14 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 className="font-semibold text-espresso mb-1">
              <span className="text-en">Privacy Controls</span>
              <span className="text-am">የግላነት ቁጥጥሮች</span>
            </h3>
            <p className="text-espresso/60 text-sm">
              <span className="text-en">You control who sees your list</span>
              <span className="text-am">ዝርዝርዎን ማን እንደሚያይ ቆጣሩ</span>
            </p>
          </div>

          {/* Transparent Fees */}
          <div className="reveal reveal-delay-4 feature-card text-center">
            <div className="w-14 h-14 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <h3 className="font-semibold text-espresso mb-1">
              <span className="text-en">Transparent Fees</span>
              <span className="text-am">ግል ያልናት ክፍያዎች</span>
            </h3>
            <p className="text-espresso/60 text-sm">
              <span className="text-en">No hidden charges, ever</span>
              <span className="text-am">ድብቅ ክፍያዎች በፍጹም የሉም</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}