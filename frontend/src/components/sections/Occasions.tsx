'use client'

import OccasionCard from '@/components/ui/OccasionCard'
import { useModals } from '@/context/ModalContext'

export default function Occasions() {
  const { openModal } = useModals()
  
  const occasions = [
    {
      titleEn: 'Wedding Registry',
      titleAm: 'የሰርግ ዝርዝር',
      descriptionEn: 'Create a list for your new chapter — from home essentials to honeymoon support.',
      descriptionAm: 'ለአዲሱ ዕራይዝ ዝርዝር ይፍጠሩ — ከቤት እቃዎች እስከ ማርዝፍን ድጋፍ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C45D3E" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    },
    {
      titleEn: 'Baby Registry',
      titleAm: 'የልጅ ዝርዝር',
      descriptionEn: 'Collect the items and support you need before and after your baby arrives.',
      descriptionAm: 'ልጅዎ መወለዱ በፊትና በኋላ የሚያስፈልትን እቃዎች ይሰብስቡ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
    },
    {
      titleEn: 'Birthday Wishlist',
      titleAm: 'የልደት በዓል ምርጫ',
      descriptionEn: 'Make birthdays easier with a shareable wishlist your friends and family can actually use.',
      descriptionAm: 'ልደት በዓልን ቀላል ያድርጉት — ጓደኞችና ቤተሰብ የሚጠቀሙበት ዝርዝር ያጋሩ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B9A7D" strokeWidth="2"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 13V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"/></svg>,
    },
    {
      titleEn: 'Graduation List',
      titleAm: 'የምረቃ ዝርዝር',
      descriptionEn: 'Celebrate achievement with gifts, tools, and support for the next step.',
      descriptionAm: 'ስኬትን በስጦታዎች፣ በመሳሪያዎችና በድጋፍ ያክሩ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    },
    {
      titleEn: 'Housewarming',
      titleAm: 'አዲስ ቤት',
      descriptionEn: 'Build your new space with thoughtful gifts and contributions from loved ones.',
      descriptionAm: 'አዲሱን ቤት ከወዳጆችና ከቤተሰብ ጋር በጥሩ ስጦታዎች ያግኑ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C45D3E" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    },
    {
      titleEn: 'Group Contribution',
      titleAm: 'የቡድን አስተዋፅኦ',
      descriptionEn: 'Create a shared goal — a trip, project fund, gift pool, or personal milestone.',
      descriptionAm: 'የጋራ ግብ ይፍጠሩ — ጉዞ፣ ፕሮጀክት ፈንድ፣ የስጦታ ፉንድ ወይም ግላዊ ኬት።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
    {
      titleEn: 'Fund My Trip',
      titleAm: 'ጉዞዬን ደግፉ',
      descriptionEn: 'Crowdfund your dream vacation, pilgrimage, or study abroad experience.',
      descriptionAm: 'የህልም ጉዞዎን ጥገኛ ወይም የውጭ ሀገር ትምርትዎን ያስተዋፅኦ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.49 10-10S17.51 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
    },
    {
      titleEn: 'Christmas Gift',
      titleAm: 'የገና ስጦታ',
      descriptionEn: 'Create a wishlist for Christmas and let loved ones know what you truly want.',
      descriptionAm: 'ለገና የስጦታ ዝርዝር ይፍጠሩ እና ተበዮችዎን እንደልጉ ያሳውቁ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    },
    {
      titleEn: 'Newborn Gift',
      titleAm: 'የአዲስ ሕፃን ስጦታ',
      descriptionEn: 'Welcome your new baby with essential items and support from family.',
      descriptionAm: 'አዲሱን ሕፃንን ከቤተሰብ ጋር ድጋፍ እና አስፈላጊ እቃዎች ይቀበሉ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    },
    {
      titleEn: 'Just Because',
      titleAm: 'ስለ ምንም ነገር',
      descriptionEn: 'No special occasion needed — celebrate life, friendship, or simply treat yourself.',
      descriptionAm: 'ልዩ አጋጣሚ አያስፈልግም — ህይወትን፣ ደኝነትን ያክብሩ ወይም ራስዎን ይሸልሙ።',
      icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    },
  ]

  return (
    <section id="occasions" className="py-24 lg:py-32 bg-gradient-to-b from-ivory to-ivory-dark relative overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern opacity-20" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-semibold mb-4 reveal">
            <span className="text-en">For Every Moment</span>
            <span className="text-am">ለሁሉም ጊዜ</span>
          </div>
          <h2 className="reveal font-display text-4xl sm:text-5xl font-semibold text-espresso">
            <span className="text-en">Made for every celebration</span>
            <span className="text-am">ለሁሉም ክብረ በዓል የተሰራ</span>
          </h2>
          <p className="reveal reveal-delay-1 mt-4 text-lg text-espresso/60 max-w-2xl mx-auto">
            <span className="text-en">From weddings and births to birthdays, graduations, and housewarmings — collect the gifts and support that matter most.</span>
            <span className="text-am">ከሰርግና ልደት እስከ ደህን በዓል፣ ምረቃና አዲስ ቤት — የያስፈልጉትን ስጦታዎችና ድጋፍ ሰብስቡ።</span>
          </p>
        </div>
        
        {/* Changed from lg:grid-cols-3 to handle 10 items nicely */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {occasions.map((occ, i) => (
            <div 
              key={i} 
              // Handle delays properly for more than 4 items
              className={`reveal ${i < 4 ? `reveal-delay-${i + 1}` : 'reveal-delay-4'}`}
            >
              <OccasionCard 
                titleEn={occ.titleEn} 
                titleAm={occ.titleAm} 
                descriptionEn={occ.descriptionEn} 
                descriptionAm={occ.descriptionAm} 
                icon={occ.icon} 
                onClick={() => openModal('create')} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}