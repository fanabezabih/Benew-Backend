export default function Features() {
  const features = [
    {
      titleEn: 'Secure payments',
      titleAm: 'ደህንነቱ የተጠበቀ ክፍያ',
      descriptionEn: 'Telebirr and more',
      descriptionAm: 'ቴሌብር እና ተጨማሪ',
    },
    {
      titleEn: 'Diaspora-friendly',
      titleAm: 'ለዲያስፖራ ተስማሚ',
      descriptionEn: 'Anyone can send gifts',
      descriptionAm: 'ማንኛውም ሰው ስጦታ መላክ ይችላል',
    },
    {
      titleEn: 'One link for everything',
      titleAm: 'አንድ ሊንክ',
      descriptionEn: 'Easy to share',
      descriptionAm: 'ቀላል ማጋራት',
    },
    {
      titleEn: 'No awkward asks',
      titleAm: 'አያሳፍር ጥያቄ',
      descriptionEn: 'Let your list talk',
      descriptionAm: 'ዝርዝርዎ ይናገር',
    },
  ]

  return (
    <section className="bg-[#f7f2eb] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                ✦
              </div>

              <h3 className="mb-3 font-display text-xl font-semibold text-espresso">
                <span className="text-en">
                  {feature.titleEn}
                </span>

                <span className="text-am">
                  {feature.titleAm}
                </span>
              </h3>

              <p className="text-sm text-espresso/60">
                <span className="text-en">
                  {feature.descriptionEn}
                </span>

                <span className="text-am">
                  {feature.descriptionAm}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}