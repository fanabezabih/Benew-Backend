'use client';

import Link from 'next/link';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useModals } from '@/context/ModalContext';

export default function Footer() {
  const { openModal } = useModals();

  return (
    <footer className="bg-espresso text-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="mb-6">
          <img src="/images/Benenew-01.png" className="h-14" />
        </div>

        <button onClick={() => openModal('contact')}>
          Contact Us
        </button>

        <LanguageToggle />

      </div>
    </footer>
  );
}