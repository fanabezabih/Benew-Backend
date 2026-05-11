// src/components/sections/Features.tsx

export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      titleEn: 'Secure payments',
      titleAm: 'ደህንነቱ የተጠበቀ ክፍያ',
      descriptionEn: 'Telebirr and more',
      descriptionAm: 'ቴሌብር እና ተጨማሪ',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.06M12 18V3" />
        </svg>
      ),
      titleEn: 'Diaspora-friendly',
      titleAm: 'ለዲያስፖራ ተስማሚ',
      descriptionEn: 'Anyone, anywhere can send gifts',
      descriptionAm: 'ማንኛውም ሰው በማንኛውም ቦታ ስጦታ መላክ ይችላል',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      titleEn: 'One link for everything',
      titleAm: 'አንድ ሊንክ ለሁሉም ነገር',
      descriptionEn: 'Simple and easy to share',
      descriptionAm: 'ቀላል እና ለማጋራት ቀላል',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      titleEn: 'No awkward asks',
      titleAm: 'አያሳፍር ጥያቄ የለም',
      descriptionEn: 'Let your list do the talking',
      descriptionAm: 'ዝርዝርዎ እንዲናገር ይተዉት',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#f7f2eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${index} text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300`}
            >
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-[#de6f3d] mb-4 shadow-sm">
                {feature.icon}
              </div>

              <h3 className="font-display text-lg font-semibold text-[#2f1712] mb-2">
                <span className="text-en">{feature.titleEn}</span>
                <span className="text-am block text-sm text-[#2f1712]/70">
                  {feature.titleAm}
                </span>
              </h3>

              <p className="text-[#2f1712]/60 text-sm">
                <span className="text-en">{feature.descriptionEn}</span>
                <span className="text-am block text-xs">
                  {feature.descriptionAm}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}