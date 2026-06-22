'use client';

import Link from 'next/link';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useModals } from '@/context/ModalContext';

export default function Footer() {

  const { openModal } = useModals();

  return (

  <footer className="bg-[#d96b3c] text-[#F5F0E8] py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">

          {/* BRAND */}
          <div className="md:col-span-4">

            <div className="flex items-center">

              <img
                src="/images/benenew.jpg"
                alt="Logo"
                className="h-16 w-auto cursor-pointer"
                onClick={() =>
                  (window.location.href = '/')
                }
              />

            </div>

            <p className="text-[#d9e6df] text-sm leading-7 mt-4 max-w-xs">

              Ethiopian gift registry and contribution platform designed for modern celebrations.
              Create personalized lists, receive support securely, and share one simple link with loved ones.

            </p>

          </div>

          {/* PRODUCT */}
          <div className="md:col-span-2">

            <h3 className="font-semibold text-lg mb-4">

              Product

            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/how-it-works"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link
                  href="/occasions"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  Occasions
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/find-a-list"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  Find a List
                </Link>
              </li>

              <li>
                <Link
                  href="/trust-security"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  Trust & Security
                </Link>
              </li>

              <li>
                <Link
                  href="/for-vendors"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  For Vendors
                </Link>
              </li>

            </ul>

          </div>

          {/* SUPPORT */}
          <div className="md:col-span-2">

            <h3 className="font-semibold text-lg mb-4">

              Support

            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  href="/faq"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>

              <li>

                <button
                  onClick={() =>
                    openModal('contact')
                  }
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  Contact Us
                </button>

              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-[#d9e6df] hover:text-[#E39A32] transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>

            </ul>

          </div>

          {/* LANGUAGE + CTA */}
          <div className="md:col-span-4">

            <h3 className="font-semibold text-lg mb-4">

              Language

            </h3>

            <div className="mb-8">

              <LanguageToggle />

            </div>

            {/* CTA */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

              <p className="text-sm text-[#d9e6df] mb-3">

                Have questions about your celebration?

              </p>

              <button
                onClick={() =>
                  openModal('contact')
                }
                className="text-[#E39A32] hover:text-[#f1b24a] font-semibold text-sm transition-colors"
              >

                Talk to our team →

              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-[#c9d7d0] text-sm">

            © 2026 Bene'nw. All rights reserved.

          </p>

          <div className="flex gap-6">

            <Link
              href="/privacy"
              className="text-[#c9d7d0] hover:text-[#E39A32] text-sm transition-colors"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-[#c9d7d0] hover:text-[#E39A32] text-sm transition-colors"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}