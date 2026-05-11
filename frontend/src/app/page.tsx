'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <main className="pt-24">

        <section className="max-w-7xl mx-auto px-6 py-20">

          <h1 className="text-6xl font-bold mb-6">
            Celebrate Together
          </h1>

          <p className="text-xl text-gray-600">
            Create beautiful gift registries
            for weddings, birthdays,
            graduations and more.
          </p>

        </section>

      </main>

      <Footer />
    </div>
  );
}