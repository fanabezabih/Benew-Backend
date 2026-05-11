'use client';

import Link from 'next/link';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useModals } from '@/context/ModalContext';

export default function Footer() {
  const { openModal } = useModals();

  return (
    <footer className="bg-espresso text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <img src="/images/Benenew-01.png" alt="Bene'nw" className="h-12" />
            </div>
            <p className="text-ivory/70 text-sm mb-6 max-w-xs">
              Ethiopian gift registry and contribution platform designed for modern celebrations.
              Create personalized lists, receive support securely, and share one simple link with loved ones.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/how-it-works" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">How It Works</Link></li>
              <li><Link href="/occasions" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">Occasions</Link></li>
              <li><Link href="/pricing" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">Pricing</Link></li>
              <li><Link href="/find-a-list" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">Find a List</Link></li>
              <li><Link href="/trust-security" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">Trust & Security</Link></li>
              <li><Link href="/for-vendors" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">For Vendors</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">FAQ</Link></li>
              <li>
                <button 
                  onClick={() => openModal('contact')}
                  className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li><Link href="/privacy" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-ivory/70 hover:text-terra-cotta transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Language & CTA */}
          <div className="md:col-span-4">
            <h3 className="font-semibold text-lg mb-4">Language</h3>
            <div className="mb-8">
              <LanguageToggle />
            </div>
            <div className="bg-terra-cotta/10 rounded-lg p-4 border border-terra-cotta/20">
              <p className="text-sm text-ivory/80 mb-2">Have questions about your celebration?</p>
              <button 
                onClick={() => openModal('contact')}
                className="text-terra-cotta hover:text-terra-cotta-dark font-medium text-sm transition-colors"
              >
                Talk to our team →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-ivory/50 text-sm">
            © 2026 Bene'nw. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-ivory/50 hover:text-terra-cotta text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-ivory/50 hover:text-terra-cotta text-sm transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}