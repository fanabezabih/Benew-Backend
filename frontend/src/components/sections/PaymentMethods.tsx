export default function PaymentMethods() {
  return (
    <section className="py-16 bg-white" id="payment-methods">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* Local Images */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--border)] hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
            <img src="/images/download (6).jpg" alt="telebirr" className="w-9 h-9 object-contain" />
            <div>
              <p className="font-semibold text-sm text-espresso">telebirr</p>
              <p className="text-xs text-[var(--fg-muted)]">ቴሌብር • Mobile</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--border)] hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer">
            <img src="/images/download (7).jpg" alt="CBE Birr" className="w-9 h-9 object-contain" />
            <div>
              <p className="font-semibold text-sm text-espresso">CBE Birr</p>
              <p className="text-xs text-[var(--fg-muted)]">ንግድ ብር • Bank</p>
            </div>
          </div>

          {/* Icon Based Cards */}
          {[
            { titleEn: 'Bank Transfer', titleAm: 'የባንክ ዝውውር', subEn: 'Direct deposit', subAm: 'ቀጥተኛ ተቀማጭ', bg: 'bg-amber-50', color: 'text-amber-600', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
            { titleEn: 'Diaspora Support', titleAm: 'ዲያስፖራ ድጋፍ', subEn: 'International', subAm: 'ዓለም አቀፍ', bg: 'bg-purple-50', color: 'text-purple-600', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
            { titleEn: 'ETB Pricing', titleAm: 'ብር ዋጋ', subEn: 'Local currency', subAm: 'የአካባቢ ገንዘብ', bg: 'bg-red-50', color: 'text-red-600', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5"/></svg> },
          ].map((pm, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-[var(--border)] hover:-translate-y-1 hover:shadow-lg transition-all min-h-[180px] justify-center gap-4">
              <div className={`w-14 h-14 ${pm.bg} rounded-2xl flex items-center justify-center ${pm.color}`}>{pm.icon}</div>
              <div>
                <div className="font-display text-sm font-semibold text-espresso"><span className="text-en">{pm.titleEn}</span><span className="text-am">{pm.titleAm}</span></div>
                <div className="text-xs text-[var(--fg-muted)] mt-1"><span className="text-en">{pm.subEn}</span><span className="text-am">{pm.subAm}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}