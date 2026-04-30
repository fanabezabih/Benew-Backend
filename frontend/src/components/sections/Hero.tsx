'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import TrustBadge from '@/components/ui/TrustBadge'
import { useModals } from '@/context/ModalContext'
import HeroGallery from './HeroGallery'

export default function Hero() {
  const { openModal } = useModals()

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="orb orb-1 -top-20 -right-20" aria-hidden="true"></div>
      <div className="orb orb-2 top-1/3 -left-32" aria-hidden="true"></div>
      <div className="absolute inset-0 ethiopian-pattern opacity-30" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full text-terracotta text-sm font-semibold mb-6 hero-animate">
              <span className="w-2 h-2 bg-terracotta rounded-full animate-pulse"></span>
              <span className="text-en">Ethiopia&apos;s #1 Gift Registry Platform</span>
              <span className="text-am">የኢትዮጵያ ቁጥር 1 የስጦታ ዝርዝር መድረክ</span>
            </div>
            <h1 className="hero-animate font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-espresso leading-[1.08] tracking-tight">
              <span className="text-en">Create your gift list, <span className="text-terracotta">your way</span></span>
              <span className="text-am">የስጦታ ርዝርዎን <span className="text-terracotta">በእርስዎ መንገድ</span> ይፍጠሩ</span>
            </h1>
            <p className="hero-animate hero-delay-1 mt-6 text-xl text-espresso/65 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              <span className="text-en">One beautiful link for weddings, babies, birthdays, graduations, and life&apos;s special moments. Add gifts from anywhere, collect support securely, and share with the people who matter most.</span>
              <span className="text-am">ለሰርግ ልደት በዓል፣ ምረቃ አዲስ ቤት እና ለሌሎች ልዩ አጋጣሚዎች አንድ ውብ ሊንክ</span>
            </p>
            <div className="hero-animate hero-delay-2 mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={() => openModal('signup')} size="lg">
                <span className="text-en">Create Your List — It&apos;s Free</span>
                <span className="text-am">ዝርዝር ይፍጠሩ — ነጻ ነው</span>
              </Button>
              <Button variant="secondary" onClick={() => openModal('search')} size="lg">
                <span className="text-en">Find a List</span>
                <span className="text-am">ዝርዝር ይፈልጉ</span>
              </Button>
            </div>
            <div className="hero-animate hero-delay-3 mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
              <TrustBadge icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} textEn="Secure payments" textAm="ደህንነቱ የተጠበቀ ክፍያ" />
              <TrustBadge icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>} textEn="One link to share" textAm="አንድ ሊንክ ለማጋራት" />
              <TrustBadge icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>} textEn="Built for Ethiopia" textAm="ለኢትዮጵያ የተሰራ" />
              <TrustBadge icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>} textEn="Diaspora-friendly" textAm="ለዲያስፖራ ተስማሚ" />
            </div>
          </div>
          <div className="hero-animate hero-delay-4 hidden lg:block">
            <HeroGallery />
          </div>
        </div>
      </div>
    </section>
  )
}