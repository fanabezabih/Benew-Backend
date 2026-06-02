'use client'

import {
  useEffect,
  useState
} from 'react'

import {
  Gift,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Pencil
} from 'lucide-react'

import QRCode from 'react-qr-code'

import {
  registryAPI,
  giftAPI
} from '@/lib/api'

import AddGiftModal
from '@/components/modals/AddGiftModal'

import GiftDetailsModal
from '@/components/modals/GiftDetailsModal'

import EditGiftModal from '@/components/modals/EditModal'

interface Props {
  params: {
    id: string
  }
}

export default function RegistryPage({
  params
}: Props) {

  const [registry, setRegistry] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [showAddGift,
    setShowAddGift
  ] = useState(false)

  const [selectedGift,
    setSelectedGift
  ] = useState<any>(null)

  const [editingGift,
    setEditingGift
  ] = useState<any>(null)

  const [copied,
    setCopied
  ] = useState(false)

  const [shareUrl,
    setShareUrl
  ] = useState('')

  // =========================
  // SHARE URL
  // =========================
  useEffect(() => {

    if (
      typeof window !==
      'undefined'
    ) {

      setShareUrl(
        window.location.href
      )
    }

  }, [])

  // =========================
  // FETCH REGISTRY
  // =========================
  async function fetchRegistry() {

    try {

      const data =
        await registryAPI.getById(
          params.id
        )

      setRegistry(data)

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchRegistry()

  }, [])

  // =========================
  // DELETE GIFT
  // =========================
  async function handleDelete(
    id: string
  ) {

    const confirmDelete =
      confirm(
        'Delete this gift?'
      )

    if (!confirmDelete)
      return

    try {

      await giftAPI.deleteGift(id)

      fetchRegistry()

    } catch (err) {

      console.log(err)

      alert(
        'Failed to delete gift'
      )
    }
  }

  // =========================
  // COPY LINK
  // =========================
  async function copyLink() {

    if (!shareUrl)
      return

    await navigator
      .clipboard
      .writeText(shareUrl)

    setCopied(true)

    setTimeout(() => {

      setCopied(false)

    }, 2000)
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#faf7f4]">

        <div className="relative flex items-center justify-center">

          <div className="w-28 h-28 border-4 border-[#e7d6cc] border-t-[#d96b3c] rounded-full animate-spin"></div>

          <img
            src="/images/benenew.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full object-cover absolute"
          />

        </div>

      </div>
    )
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!registry) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Registry not found

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-[#faf7f4]">

      {/* HERO */}
      <section className="relative h-[360px] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <img
          src={
            registry.coverImage ||

            (
              (
                registry.occasion ||
                registry.title ||
                ''
              )
                .toLowerCase()
                .includes('birthday')

                ? 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2070&auto=format&fit=crop'

              : (
                  registry.occasion ||
                  registry.title ||
                  ''
                )
                  .toLowerCase()
                  .includes('wedding')

                ? 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2070&auto=format&fit=crop'

              : (
                  registry.occasion ||
                  registry.title ||
                  ''
                )
                  .toLowerCase()
                  .includes('baby')

                ? 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2070&auto=format&fit=crop'

              : (
                  registry.occasion ||
                  registry.title ||
                  ''
                )
                  .toLowerCase()
                  .includes('graduation')

                ? 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'

              : 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop'
            )
          }
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">

          <h1 className="text-5xl md:text-6xl font-display mb-4 drop-shadow-lg">

            {registry.title}

          </h1>

          {registry.description && (

            <p className="max-w-2xl text-white/90 text-lg md:text-xl leading-relaxed">

              {registry.description}

            </p>
          )}

        </div>

      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* SHARE SECTION */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-10">

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

            {/* LEFT */}
            <div>

              <div className="flex items-center gap-2 mb-4">

                <Share2
                  className="text-[#d96b3c]"
                />

                <h3 className="text-xl font-semibold">

                  Share Registry

                </h3>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3">

                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 transition"
                >

                  <MessageCircle size={18} />

                  WhatsApp

                </a>

                {/* TELEGRAM */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-2xl transition"
                >

                  Telegram

                </a>

                {/* COPY */}
                <button
                  onClick={copyLink}
                  className="border px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-gray-50 transition"
                >

                  {copied
                    ? <Check size={18} />
                    : <Copy size={18} />
                  }

                  {copied
                    ? 'Copied'
                    : 'Copy Link'
                  }

                </button>

              </div>

              {/* URL */}
              <div className="mt-4 text-sm text-gray-500 break-all">

                {shareUrl}

              </div>

            </div>

            {/* QR */}
            <div className="bg-white p-4 rounded-2xl border">

              <QRCode
                value={shareUrl || ' '}
                size={120}
              />

            </div>

          </div>

        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div className="flex items-center gap-3">

            <Gift className="text-[#d96b3c]" />

            <h2 className="text-3xl font-display text-espresso">

              Gifts

            </h2>

          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() =>
              setShowAddGift(true)
            }
            className="bg-[#d96b3c] hover:bg-[#c85f34] text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition"
          >

            <Plus size={18} />

            Add Gift

          </button>

        </div>

        {/* GIFTS */}
        {registry.gifts?.length === 0 ? (

          <div className="bg-white rounded-3xl p-14 text-center shadow-sm">

            <p className="text-gray-500">

              No gifts added yet

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {registry.gifts.map(
              (gift: any) => (

                <div
                  key={gift.id}
                  onClick={() =>
                    setSelectedGift(gift)
                  }
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer relative group"
                >

                  {/* IMAGE */}
                  {gift.image ? (

                    <div className="overflow-hidden">

                      <img
                        src={gift.image}
                        className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                      />

                    </div>

                  ) : (

                    <div className="h-72 bg-gray-100 flex items-center justify-center">

                      <Gift
                        size={42}
                        className="text-gray-300"
                      />

                    </div>
                  )}

                  {/* PURCHASED */}
                  {gift.isReserved && (

                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">

                      Purchased

                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="absolute top-4 right-4 flex gap-2">

                    {/* EDIT */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation()

                        setEditingGift(gift)
                      }}
                      className="bg-white rounded-full p-2 shadow hover:bg-blue-50 transition"
                    >

                      <Pencil
                        size={18}
                        className="text-blue-500"
                      />

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={(e) => {

                        e.stopPropagation()

                        handleDelete(gift.id)
                      }}
                      className="bg-white rounded-full p-2 shadow hover:bg-red-50 transition"
                    >

                      <Trash2
                        size={18}
                        className="text-red-500"
                      />

                    </button>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <h3 className="text-2xl font-semibold mb-2 text-[#2b2118]">

                      {gift.title}

                    </h3>

                    {gift.addedBy?.name && (

                      <p className="text-sm text-gray-500 mb-3">

                        Added by {gift.addedBy.name}

                      </p>
                    )}

                    {gift.description && (

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">

                        {gift.description}

                      </p>
                    )}

                    {gift.price && (

                      <div className="text-[#d96b3c] font-semibold text-lg mb-4">

                        ETB {gift.price}

                      </div>
                    )}

                    {gift.isReserved && (

                      <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-2xl px-3 py-2">

                        Purchased by{' '}
                        {gift.reservedByName ||
                          'Someone'}

                      </div>
                    )}

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* ADD MODAL */}
      <AddGiftModal
        isOpen={showAddGift}
        onClose={() =>
          setShowAddGift(false)
        }
        registryId={params.id}
        onGiftAdded={fetchRegistry}
      />

      {/* DETAILS MODAL */}
      <GiftDetailsModal
        isOpen={!!selectedGift}
        onClose={() =>
          setSelectedGift(null)
        }
        gift={selectedGift}
        registryId={params.id}
        refresh={fetchRegistry}
      />

      {/* EDIT MODAL */}
      <EditGiftModal
        isOpen={!!editingGift}
        onClose={() =>
          setEditingGift(null)
        }
        gift={editingGift}
        refresh={fetchRegistry}
      />

    </div>
  )
}