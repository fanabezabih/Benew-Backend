// src/components/sections/Occasions.tsx
'use client';

import { useModals } from '@/context/ModalContext';

const occasions = [
  {
    id: 'wedding',
    titleEn: 'Weddings',
    titleAm: 'ሰርግ',
    image: '/images/wedding.jpg',
    icon: '💍',
  },
  {
    id: 'birthday',
    titleEn: 'Birthdays',
    titleAm: 'ልደት',
    image: '/images/birthday.jpg',
    icon: '🎂',
  },
  {
    id: 'baby',
    titleEn: 'Baby Showers',
    titleAm: 'የሕፃን ሽርሽሮ',
    image: '/images/babyshower.jpg',
    icon: '👶',
  },
  {
    id: 'graduation',
    titleEn: 'Graduations',
    titleAm: 'ምረቃ',
    image: '/images/graduation.jpg',
    icon: '🎓',
  },
];

export default function Occasions() {
  const { openModal } = useModals();

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="reveal font-display text-4xl lg:text-5xl font-semibold text-espresso">
            <span className="text-en">Perfect for every life moment</span>
            <span className="text-am">ለእያንዳንዱ የሕይወት አጋጣሚ ስማሚ</span>
          </h2>
        </div>

        {/* Occasion Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occasion, index) => (
            <div
              key={occasion.id}
              className={`reveal reveal-delay-${index} group relative overflow-hidden rounded-2xl cursor-pointer`}
              onClick={() => openModal('create')}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={occasion.image}
                  alt={occasion.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xl">
                  {occasion.icon}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg">
                  <span className="text-en">{occasion.titleEn}</span>
                  <span className="text-am block text-sm text-white/80">{occasion.titleAm}</span>
                </h3>
              </div>

              {/* Heart Icon */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}