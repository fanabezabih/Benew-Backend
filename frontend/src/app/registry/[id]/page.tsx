// src/app/registry/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useParams } from 'next/navigation';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import { registryAPI } from '@/lib/api';

export default function RegistryPage() {
  const params = useParams();

  const [registry, setRegistry] = useState<any>(null);

  const [share, setShare] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRegistry() {
      try {
        const data = await registryAPI.getById(params.id as string);

        const shareData = await registryAPI.getShare(
          params.id as string
        );

        setRegistry(data);

        setShare(shareData);

      } catch (err) {
        console.error(err);

      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadRegistry();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!registry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Registry not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <main className="pt-24 pb-16">

        <div className="max-w-5xl mx-auto px-4">

          {/* BACK */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-terracotta font-medium mb-8 hover:underline"
          >
            ← Back to My Lists
          </Link>

          {/* TITLE */}
          <div className="mb-10">

            <h1 className="text-5xl font-display text-espresso font-semibold mb-4">
              {registry.title}
            </h1>

            <p className="text-espresso/70 text-lg">
              {registry.description}
            </p>

          </div>

          {/* PROGRESS */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--border)] mb-8">

            <div className="flex justify-between mb-3">

              <span className="font-semibold">
                Raised
              </span>

              <span className="text-gold font-bold">
                {registry.progress.totalRaised} ETB
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

              <div
                className="bg-terracotta h-full"
                style={{
                  width: `${registry.progress.percent}%`
                }}
              />

            </div>

          </div>

          {/* GIFTS */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--border)] mb-8">

            <h2 className="text-2xl font-display text-espresso mb-6">
              Gift List
            </h2>

            <div className="space-y-4">

              {registry.gifts.map((gift: any) => (

                <div
                  key={gift.id}
                  className="border border-[var(--border)] rounded-xl p-4"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold text-lg">
                        {gift.title}
                      </h3>

                      <p className="text-espresso/60">
                        {gift.description}
                      </p>

                    </div>

                    <div className="text-gold font-bold">
                      {gift.price} ETB
                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* SHARE */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--border)]">

            <h2 className="text-2xl font-display text-espresso mb-6">
              Share Registry
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">

              <a
                href={share.whatsappUrl}
                target="_blank"
                className="bg-green-500 text-white px-5 py-3 rounded-full"
              >
                WhatsApp
              </a>

              <a
                href={share.telegramUrl}
                target="_blank"
                className="bg-blue-500 text-white px-5 py-3 rounded-full"
              >
                Telegram
              </a>

            </div>

            <div className="mb-6">

              <p className="font-medium mb-2">
                Share Link
              </p>

              <input
                value={share.shareUrl}
                readOnly
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <p className="font-medium mb-3">
                QR Code
              </p>

              <img
                src={share.qrCode}
                alt="QR Code"
                className="w-48 h-48"
              />

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}