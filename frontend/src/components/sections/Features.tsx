'use client'

import { useEffect, useState } from 'react'

const features = [
  {
    titleEn: 'Secure payments',
    titleAm: 'ደህንነቱ የተጠበቀ ክፍያ',
    descriptionEn: 'Telebirr and more',
    descriptionAm: 'ቴሌብር እና ተጨማሪ',
    number: '01',
  },
  {
    titleEn: 'Diaspora-friendly',
    titleAm: 'ለዲያስፖራ ተስማሚ',
    descriptionEn: 'Anyone can send gifts',
    descriptionAm: 'ማንኛውም ሰው ስጦታ መላክ ይችላል',
    number: '02',
  },
  {
    titleEn: 'One link for everything',
    titleAm: 'አንድ ሊንክ',
    descriptionEn: 'Easy to share',
    descriptionAm: 'ቀላል ማጋራት',
    number: '03',
  },
  {
    titleEn: 'No awkward asks',
    titleAm: 'አያሳፍር ጥያቄ',
    descriptionEn: 'Let your list talk',
    descriptionAm: 'ዝርዝርዎ ይናገር',
    number: '04',
  },
]

export default function Features() {

  const [current, setCurrent] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        (prev + 1) % features.length
      )

    }, 2000)

    return () => clearInterval(interval)

  }, [])

  return (

    <section className="py-24 bg-white overflow-hidden">

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="relative h-[320px]">

          {features.map((feature, index) => (

            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                current === index
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10 pointer-events-none'
              }`}
            >

              <div className="relative h-full rounded-[36px] border border-[#efd9ca] bg-[#fffaf7] px-10 py-12 shadow-sm">

                {/* NUMBER */}
                <span className="absolute top-8 right-8 text-[70px] font-bold text-[#f3ddd1]">

                  {feature.number}

                </span>

                {/* LINE */}
                <div className="mb-8 h-[4px] w-16 rounded-full bg-[#d96b3c]" />

                {/* TITLE */}
                <h2 className="max-w-[500px] font-display text-4xl font-semibold leading-tight text-[#2f1712]">

                  <span className="text-en">
                    {feature.titleEn}
                  </span>

                  <span className="text-am">
                    {feature.titleAm}
                  </span>

                </h2>

                {/* DESCRIPTION */}
                <p className="mt-6 max-w-[560px] text-[17px] leading-8 text-[#6d5a52]">

                  <span className="text-en">
                    {feature.descriptionEn}
                  </span>

                  <span className="text-am">
                    {feature.descriptionAm}
                  </span>

                </p>

                {/* DOTS */}
                <div className="absolute bottom-8 left-10 flex gap-3">

                  {features.map((_, i) => (

                    <div
                      key={i}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        current === i
                          ? 'w-10 bg-[#d96b3c]'
                          : 'w-2.5 bg-[#ead8cf]'
                      }`}
                    />

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}