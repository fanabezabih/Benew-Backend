// src/components/sections/Hero.tsx

'use client';

import { useEffect, useState } from 'react';
import { useModals } from '@/context/ModalContext';
import { useAuth } from '@/context/AuthContext';

const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  const { openModal } = useModals();
  const { user } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f7f2eb] pt-6 pb-0">
      <div className="w-full pl-6 lg:pl-12 pr-0">

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-0 items-start min-h-[700px]">

          {/* LEFT CONTENT */}
        <div className="relative z-20 pt-14 lg:pt-20 max-w-[720px] ml-14 lg:ml-36">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#efd9ca] text-[#d96b3c] rounded-full px-5 py-2 text-sm font-medium mb-8 lg:ml-4">
              <span className="w-2 h-2 bg-[#d96b3c] rounded-full"></span>
              Ethiopia&apos;s #1 Gift Registry Platform
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[#2f1712] text-[74px] leading-[0.92] tracking-[-3px] font-semibold">
              Turn moments
              <br />
              into{' '}
              <span className="italic text-[#de6f3d]">
                gifts
              </span>
              <br />
              people love
            </h1>

            {/* Description */}
            <p className="mt-10 text-[20px] leading-[2] text-[#3d2a23]/80 max-w-[640px]">
              Create one simple link for weddings, birthdays,
              baby showers & more — and receive gifts or cash
              effortlessly.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-5 mt-12">
              <button
                onClick={() =>
                  user
                    ? (window.location.href = '/dashboard')
                    : openModal('signup')
                }
                className="bg-[#de6f3d] hover:bg-[#c85f32] text-white text-lg font-semibold px-10 py-5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Start Your Gift List — Free
              </button>

              <button
                onClick={() => openModal('search')}
                className="bg-white border border-[#ddd1c6] hover:bg-[#f8f4ef] text-[#2f1712] text-lg font-semibold px-10 py-5 rounded-full transition-all duration-300"
              >
                Find a List
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-10 mt-14 text-[16px] text-[#3d2a23]/70 pb-20">

              <div className="flex items-center gap-3">
                <span>🇪🇹</span>
                <span>Built for Ethiopia</span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>

                <span>Secure payments</span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.06M12 18V3"
                  />
                </svg>

                <span>Works globally</span>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[540px] lg:h-[760px] w-full flex justify-end self-start">

            {/* CURVED LEFT FADE */}
            <div className="absolute top-0 left-0 h-full w-[180px] z-10 pointer-events-none">

              {/* Main deep fade */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f7f2eb] via-[#f7f2eb] via-35% to-transparent">
              </div>

              {/* Curved blur */}
              <div className="absolute inset-y-0 right-[-120px] w-[240px] bg-[#f7f2eb]/60 blur-3xl rounded-full">
              </div>

              {/* Extra soft curve */}
              <div className="absolute inset-y-10 right-[-70px] w-[140px] bg-[#f7f2eb]/70 blur-2xl rounded-full">
              </div>
            </div>

            {/* TOP FADE */}
            <div className="absolute top-0 left-0 right-0 h-8 z-20 pointer-events-none">

              <div className="absolute inset-0 bg-gradient-to-b from-[#f7f2eb]/90 via-[#f7f2eb]/50 to-transparent">
              </div>

              <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[75%] h-16 bg-[#f7f2eb]/40 blur-3xl rounded-full">
              </div>
            </div>

            {/* IMAGES */}
            {heroImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Hero"
                className={`absolute top-0 right-0 w-[94%] h-full object-cover object-right transition-opacity duration-[1800ms] ease-in-out ${
                  currentImage === index
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              />
            ))}

            {/* FLOATING CARD */}
            <div className="absolute bottom-10 right-10 bg-white rounded-[28px] shadow-2xl px-6 py-5 flex items-center gap-4 z-20 min-w-[320px]">

              <div className="w-14 h-14 rounded-2xl bg-[#f4c24f] flex items-center justify-center text-3xl">
                🎁
              </div>

              <div>
                <p className="text-[#d96b3c] font-semibold text-sm">
                  🎉 Congrats!
                </p>

                <p className="text-[#2b1711] text-base mt-1 leading-6">
                  You received a gift
                  <br />
                  from your friend
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}