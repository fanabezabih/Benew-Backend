'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { ModalProps } from '@/types';
import { registryAPI } from '@/lib/api';

export default function SearchModal({
  isOpen,
  onClose
}: ModalProps) {

  const [query, setQuery] =
    useState('');

  const [results, setResults] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // LIVE SEARCH
  // =========================
  useEffect(() => {

    if (!query.trim()) {

      setResults([]);

      return;
    }

    const delay =
      setTimeout(async () => {

        try {

          setLoading(true);

          const data =
            await registryAPI.search(
              query
            );

          setResults(data);

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }

      }, 400);

    return () =>
      clearTimeout(delay);

  }, [query]);

  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >

      <div className="p-8">

        {/* HEADER */}
        <div className="text-center mb-6">

          <img
            src="/images/Benenew-01.png"
            alt="Benenew"
            className="h-16 mx-auto mb-4"
          />

          <h2 className="text-3xl font-display text-[#2f1712] mb-2">

            <span className="text-en">
              Find a Gift List
            </span>

            <span className="text-am">
              የስጦታ ዝርዝር ፈልግ
            </span>

          </h2>

          <p className="text-[#6f5d56]">

            <span className="text-en">
              Search using the celebrant&apos;s name
            </span>

            <span className="text-am">
              በባለቤቱ ስም ይፈልጉ
            </span>

          </p>

        </div>

        {/* SEARCH INPUT */}
        <div className="relative mb-6">

          <input
            type="text"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="e.g. Hana Wedding"
            className="w-full px-5 py-4 rounded-2xl border border-[#eadfd2] bg-white text-lg focus:outline-none focus:border-[#d96b3c] focus:ring-4 focus:ring-[#d96b3c]/10"
          />

        </div>

        {/* LOADING */}
        {loading && (

          <div className="text-center py-6 text-[#7d6b63]">

            Searching...

          </div>
        )}

        {/* RESULTS */}
        {!loading &&
          results.length > 0 && (

          <div className="space-y-3 max-h-[400px] overflow-y-auto">

            {results.map((item) => (

              <a
                key={item.id}
                href={`/registry/${item.id}`}
                onClick={onClose}
                className="block bg-[#faf7f4] hover:bg-[#f3ece6] border border-[#eee2d8] rounded-2xl p-5 transition"
              >

                <h3 className="font-semibold text-lg text-[#2f1712]">

                  {item.title}

                </h3>

                {item.description && (

                  <p className="text-sm text-[#6f5d56] mt-1 line-clamp-2">

                    {item.description}

                  </p>
                )}

                {item.occasion && (

                  <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-white border text-xs text-[#d96b3c]">

                    {item.occasion}

                  </div>
                )}

              </a>
            ))}

          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          query &&
          results.length === 0 && (

          <div className="text-center py-10 text-[#7d6b63]">

            No registries found

          </div>
        )}

      </div>

    </Modal>
  );
}