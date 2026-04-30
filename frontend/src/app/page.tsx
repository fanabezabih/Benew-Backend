// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import { ModalProvider, useModals } from '@/context/ModalContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import StatsMarquee from '@/components/sections/StatsMarquee'
import HowItWorks from '@/components/sections/HowItWorks'
import Occasions from '@/components/sections/Occasions'
import AddAnything from '@/components/sections/AddAnything'
import PaymentMethods from '@/components/sections/PaymentMethods'
import Testimonials from '@/components/sections/Testimonials'
import TrustAndSecurity from '@/components/sections/TrustAndSecurity'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'

import LoginModal from '@/components/modals/LoginModal'
import SignupModal from '@/components/modals/SignupModal'
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal'
import CreateListModal from '@/components/modals/CreateListModal'
import SearchModal from '@/components/modals/SearchModal'
import ShareModal from '@/components/modals/ShareModal'
import ContactModal from '@/components/modals/ContactModal'

function ScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}

function ModalManager() {
  const { activeModal, openModal, closeModal } = useModals()
  return (
    <>
      <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onSwitchToSignup={() => openModal('signup')} onSwitchToForgot={() => openModal('forgot')} />
      <SignupModal isOpen={activeModal === 'signup'} onClose={closeModal} onSwitchToLogin={() => openModal('login')} />
      <ForgotPasswordModal isOpen={activeModal === 'forgot'} onClose={closeModal} onSwitchToLogin={() => openModal('login')} />
      <CreateListModal isOpen={activeModal === 'create'} onClose={closeModal} />
      <SearchModal isOpen={activeModal === 'search'} onClose={closeModal} />
      <ShareModal isOpen={activeModal === 'share'} onClose={closeModal} />
      <ContactModal isOpen={activeModal === 'contact'} onClose={closeModal} />
    </>
  )
}

export default function Home() {
  return (
    <ModalProvider>
      <ScrollRevealInit />
      <Navbar />
      <main>
        <Hero />
        <StatsMarquee />
        <HowItWorks />
        <Occasions />
        <AddAnything />
        <PaymentMethods />
        <Testimonials />
        <TrustAndSecurity />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ModalManager />
    </ModalProvider>
  )
}