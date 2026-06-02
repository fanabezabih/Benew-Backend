'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Occasions from '@/components/sections/Occasions';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import TrustAndSecurity from '@/components/sections/TrustAndSecurity';
import PaymentMethods from '@/components/sections/PaymentMethods';
import StatsMarquee from '@/components/sections/StatsMarquee';
import AddAnything from '@/components/sections/AddAnything';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <main>

        <Hero />
        <StatsMarquee />

      

        <HowItWorks />
        

        <Occasions />
        
        

        <AddAnything />
         

   

        <TrustAndSecurity />
        

        <Testimonials />
         <Features />
         
        

        <Pricing />
              <PaymentMethods />

        <FAQ />
          

        <FinalCTA />

      </main>

      <Footer />

    </div>
  );
}