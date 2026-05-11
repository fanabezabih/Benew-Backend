'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// SECTIONS
import Hero from '@/components/sections/Hero';
import StatsMarquee from '@/components/sections/StatsMarquee';
import PaymentMethods from '@/components/sections/PaymentMethods';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <main>

        {/* HERO */}
        <Hero />

        {/* STATS */}
        <StatsMarquee />

        {/* PAYMENT METHODS */}
        <PaymentMethods />

      </main>

      <Footer />

    </div>
  );
}