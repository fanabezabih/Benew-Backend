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

  const [currentImage, setCurrentImage] =
    useState(0);

  const { openModal } = useModals();

  const { user } = useAuth();

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) =>
        (prev + 1) % heroImages.length
      );

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="hero-section relative overflow-hidden bg-[#f7f2eb]">

      <div className="container-main">

        <div className="grid lg:grid-cols-[1fr_1.05fr] items-center gap-10 min-h-screen pt-24">

          {/* LEFT */}
          <div className="relative z-20 max-w-[680px]">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-[#efd9ca] text-[#d96b3c] rounded-full px-5 py-2 text-sm font-medium mb-8">

              <span className="w-2 h-2 rounded-full bg-[#d96b3c]" />

              <span className="text-en">
                Ethiopia&apos;s #1 Gift Registry Platform
              </span>

              <span className="text-am">
                የኢትዮጵያ #1 የስጦታ ዝርዝር መድረክ
              </span>

            </div>

            {/* HEADING */}
            <h1 className="font-display text-[#2f1712] text-[56px] lg:text-[78px] leading-[0.95] tracking-[-3px] font-semibold">

              <span className="text-en">
                Turn moments
                <br />
                into{' '}
                <span className="italic text-[#de6f3d]">
                  gifts
                </span>
                <br />
                people love
              </span>

              <span className="text-am">
                ውብ ጊዜዎችን
                <br />
                ወደ{' '}
                <span className="italic text-[#de6f3d]">
                  ስጦታ
                </span>
                <br />
                ይቀይሩ
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-[18px] lg:text-[20px] leading-[1.9] text-[#3d2a23]/80 max-w-[620px]">

              <span className="text-en">
                Create one simple link for weddings,
                birthdays, baby showers & more —
                and receive gifts or cash effortlessly.
              </span>

              <span className="text-am">
                ለሰርግ፣ ለልደት፣ ለቤቢ ሻወር
                እና ሌሎች አጋጣሚዎች
                አንድ ቀላል ሊንክ ይፍጠሩ።
              </span>

            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 mt-10">

              <button
                onClick={() =>
                  user
                    ? (window.location.href = '/dashboard')
                    : openModal('signup')
                }
                className="btn-primary px-8 py-4 text-lg font-semibold shadow-lg"
              >

                <span className="text-en">
                  Start Your Gift List — Free
                </span>

                <span className="text-am">
                  ዝርዝርዎን ይጀምሩ — ነፃ
                </span>

              </button>

              <button
                onClick={() =>
                  openModal('search')
                }
                className="btn-secondary px-8 py-4 text-lg font-semibold"
              >

                <span className="text-en">
                  Find a List
                </span>

                <span className="text-am">
                  ዝርዝር ፈልግ
                </span>

              </button>

            </div>

            {/* TRUST */}
            <div className="flex flex-wrap gap-8 mt-14 text-[15px] text-[#3d2a23]/75">

              <div className="flex items-center gap-3">
                <span>🇪🇹</span>

                <span className="text-en">
                  Built for Ethiopia
                </span>

                <span className="text-am">
                  ለኢትዮጵያ የተገነባ
                </span>
              </div>

              <div className="flex items-center gap-3">
                🔒

                <span className="text-en">
                  Secure payments
                </span>

                <span className="text-am">
                  ደህንነቱ የተጠበቀ
                </span>
              </div>

              <div className="flex items-center gap-3">
                🌍

                <span className="text-en">
                  Works globally
                </span>

                <span className="text-am">
                  በዓለም አቀፍ ይሰራል
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative h-[540px] lg:h-[760px]">

            {/* LEFT SOFT FADE */}
            <div className="absolute inset-y-0 left-0 w-[160px] z-20 pointer-events-none bg-gradient-to-r from-[#f7f2eb] via-[#f7f2eb]/90 to-transparent" />

            {/* IMAGE SLIDER */}
            {heroImages.map((image, index) => (

              <img
                key={index}
                src={image}
                alt="Hero"
                className={`hero-image absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1800ms] ${
                  currentImage === index
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              />

            ))}

            {/* FLOATING CARD */}
            <div className="absolute bottom-8 right-6 z-30 bg-white rounded-[28px] shadow-2xl px-6 py-5 flex items-center gap-4 min-w-[310px]">

              <div className="w-14 h-14 rounded-2xl bg-[#f4c24f] flex items-center justify-center text-3xl">
                🎁
              </div>

              <div>

                <p className="text-[#d96b3c] font-semibold text-sm">
                  🎉 Congrats!
                </p>

                <p className="text-[#2b1711] text-base mt-1 leading-6">

                  <span className="text-en">
                    You received a gift
                    <br />
                    from your friend
                  </span>

                  <span className="text-am">
                    ከጓደኛዎ ስጦታ
                    <br />
                    ተቀብለዋል
                  </span>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}