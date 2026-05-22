'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import {
  Copy,
  Trash2,
  Pencil,
  MessageCircle,
  Send
} from 'lucide-react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

import {
  registryAPI,
  giftAPI
} from '@/lib/api'

import { useAuth } from '@/context/AuthContext'

import AddGiftModal from '@/components/modals/AddGiftModal'

export default function RegistryPage() {

  const params = useParams()

  const { user } = useAuth()

  const [registry, setRegistry] =
    useState<any>(null)

  const [share, setShare] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [showAddGift, setShowAddGift] =
    useState(false)

  const [copied, setCopied] =
    useState(false)

  // =========================
  // DELETE MODAL
  // =========================
  const [deleteModal, setDeleteModal] =
    useState(false)

  const [selectedGift, setSelectedGift] =
    useState<any>(null)

  const [loadingDelete, setLoadingDelete] =
    useState(false)

  // =========================
  // EDIT MODAL
  // =========================
  const [editModal, setEditModal] =
    useState(false)

  const [editForm, setEditForm] =
    useState({
      title: '',
      description: '',
      price: '',
      quantity: 1,
      link: ''
    })

  // =========================
  // LOAD REGISTRY
  // =========================
  async function loadRegistry() {

    try {

      const data =
        await registryAPI.getById(
          params.id as string
        )

      const shareData =
        await registryAPI.getShare(
          params.id as string
        )

      setRegistry(data)

      setShare(shareData)

    } catch (err) {

      console.log(err)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    if (params.id) {
      loadRegistry()
    }

  }, [params.id])

  // =========================
  // DELETE
  // =========================
  function openDelete(gift: any) {

    setSelectedGift(gift)

    setDeleteModal(true)
  }

  async function confirmDelete() {

    try {

      setLoadingDelete(true)

      await giftAPI.deleteGift(
        selectedGift.id
      )

      setRegistry((prev: any) => ({
        ...prev,

        gifts:
          prev.gifts.filter(
            (g: any) =>
              g.id !== selectedGift.id
          )
      }))

      setDeleteModal(false)

    } catch (err) {

      console.log(err)

    } finally {

      setLoadingDelete(false)
    }
  }

  // =========================
  // EDIT
  // =========================
  function openEdit(gift: any) {

    setSelectedGift(gift)

    setEditForm({
      title: gift.title || '',
      description:
        gift.description || '',
      price:
        String(gift.price || ''),
      quantity:
        gift.quantity || 1,
      link:
        gift.link || ''
    })

    setEditModal(true)
  }

  async function handleEditSubmit(
    e: any
  ) {

    e.preventDefault()

    try {

      const formData =
        new FormData()

      formData.append(
        'title',
        editForm.title
      )

      formData.append(
        'description',
        editForm.description
      )

      formData.append(
        'price',
        String(editForm.price)
      )

      formData.append(
        'quantity',
        String(editForm.quantity)
      )

      formData.append(
        'link',
        editForm.link
      )

      await giftAPI.updateGift(
        selectedGift.id,
        formData
      )

      setRegistry((prev: any) => ({
        ...prev,

        gifts:
          prev.gifts.map(
            (g: any) =>

              g.id === selectedGift.id
                ? {
                    ...g,
                    ...editForm
                  }

                : g
          )
      }))

      setEditModal(false)

    } catch (err) {

      console.log(err)

      alert('Edit failed')
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">

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
      <div className="p-10">
        Registry not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <main className="pt-24 pb-16">

        <div className="max-w-6xl mx-auto px-4">

          {/* BACK */}
          <button
            onClick={() =>
              window.history.back()
            }
            className="mb-6 text-3xl text-[#5C4033] hover:text-[#7a5443] transition"
          >
            ←
          </button>

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-espresso mb-2">
            {registry.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mb-8">
            {registry.description}
          </p>

          {/* PROGRESS */}
          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">

            <div className="flex justify-between items-center">

              <span className="text-gray-500">
                Raised
              </span>

              <span className="text-[#d96b3c] font-bold text-lg">
                {registry.progress?.totalRaised || 0} ETB
              </span>

            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full mt-4 overflow-hidden">

              <div
                className="h-full bg-[#d96b3c] rounded-full"
                style={{
                  width:
                    `${registry.progress?.percent || 0}%`
                }}
              />

            </div>

          </div>

          {/* GIFTS */}
          <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-[#2f1712]">
                Gift List
              </h2>

              {user && (
                <button
                  onClick={() =>
                    setShowAddGift(true)
                  }
                  className="bg-[#d96b3c] hover:bg-[#c85f34] text-white px-5 py-2 rounded-full transition"
                >
                  Add Gift
                </button>
              )}

            </div>

            {/* ========================= */}
            {/* MY GIFTS */}
            {/* ========================= */}

            <div className="mb-10">

              <div className="flex items-center gap-3 mb-5">

                <h3 className="text-xl font-semibold text-[#2f1712]">
                  Your Gifts
                </h3>

                <div className="flex-1 h-[1px] bg-[#eaded6]"></div>

              </div>

              {registry.gifts?.filter(
                (gift: any) =>
                  gift.addedById === user?.id
              ).length === 0 ? (

                <p className="text-gray-400 text-sm">
                  You haven't added any gifts yet.
                </p>

              ) : (

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                  {registry.gifts
                    ?.filter(
                      (gift: any) =>
                        gift.addedById === user?.id
                    )
                    .map((gift: any) => (

                      <div
                        key={gift.id}
                        className="bg-[#fffaf7] rounded-2xl overflow-hidden border border-[#f1e5dc] hover:shadow-lg transition"
                      >

                        {/* IMAGE */}
                        <div className="h-44 bg-gray-100 overflow-hidden">

                          {gift.image ? (

                            <img
                              src={gift.image}
                              className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />

                          ) : (

                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              No Image
                            </div>

                          )}

                        </div>

                        {/* CONTENT */}
                        <div className="p-4">

                          <p className="text-xs text-[#d96b3c] font-medium mb-2">
                            Added by You
                          </p>

                          <h3 className="font-semibold text-[#2f1712] line-clamp-1">
                            {gift.title}
                          </h3>

                          {gift.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {gift.description}
                            </p>
                          )}

                          <p className="text-[#d96b3c] font-semibold mt-3">
                            {gift.price} ETB
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Qty: {gift.quantity}
                          </p>

                          {gift.link && (
                            <a
                              href={gift.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-3 text-sm text-[#d96b3c] hover:underline"
                            >
                              View Item →
                            </a>
                          )}

                          {/* ACTIONS */}
                          <div className="flex justify-end gap-4 mt-4">

                            <button
                              onClick={() =>
                                openEdit(gift)
                              }
                              className="text-[#304932] hover:text-[#1d2d1f] transition"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              onClick={() =>
                                openDelete(gift)
                              }
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <Trash2 size={17} />
                            </button>

                          </div>

                        </div>

                      </div>
                    ))}

                </div>
              )}

            </div>

            {/* ========================= */}
            {/* OTHER PEOPLE GIFTS */}
            {/* ========================= */}

            <div>

              <div className="flex items-center gap-3 mb-5">

                <h3 className="text-xl font-semibold text-[#2f1712]">
                  Gifts Added By Others
                </h3>

                <div className="flex-1 h-[1px] bg-[#eaded6]"></div>

              </div>

              {registry.gifts?.filter(
                (gift: any) =>
                  gift.addedById !== user?.id
              ).length === 0 ? (

                <p className="text-gray-400 text-sm">
                  No gifts from others yet.
                </p>

              ) : (

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                  {registry.gifts
                    ?.filter(
                      (gift: any) =>
                        gift.addedById !== user?.id
                    )
                    .map((gift: any) => (

                      <div
                        key={gift.id}
                        className="bg-[#fffaf7] rounded-2xl overflow-hidden border border-[#f1e5dc] hover:shadow-lg transition"
                      >

                        {/* IMAGE */}
                        <div className="h-44 bg-gray-100 overflow-hidden">

                          {gift.image ? (

                            <img
                              src={gift.image}
                              className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />

                          ) : (

                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              No Image
                            </div>

                          )}

                        </div>

                        {/* CONTENT */}
                        <div className="p-4">

                          <p className="text-xs text-[#304932] font-medium mb-2">
                            Added by {gift.addedBy?.name || 'Guest'}
                          </p>

                          <h3 className="font-semibold text-[#2f1712] line-clamp-1">
                            {gift.title}
                          </h3>

                          {gift.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {gift.description}
                            </p>
                          )}

                          <p className="text-[#d96b3c] font-semibold mt-3">
                            {gift.price} ETB
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            Qty: {gift.quantity}
                          </p>

                          {gift.link && (
                            <a
                              href={gift.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-3 text-sm text-[#d96b3c] hover:underline"
                            >
                              View Item →
                            </a>
                          )}

                        </div>

                      </div>
                    ))}

                </div>
              )}

            </div>

          </div>

          {/* SHARE */}
          <div className="bg-white p-6 rounded-3xl shadow-sm">

            <h2 className="text-2xl font-bold text-[#2f1712] mb-5">
              Share Registry
            </h2>

            {/* SHARE BUTTONS */}
            <div className="flex flex-wrap gap-3 mb-5">

              <a
                href={share?.whatsappUrl}
                target="_blank"
                className="flex items-center gap-2 bg-[#25D366] hover:opacity-90 text-white px-5 py-2 rounded-full transition"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

              <a
                href={share?.telegramUrl}
                target="_blank"
                className="flex items-center gap-2 bg-[#229ED9] hover:opacity-90 text-white px-5 py-2 rounded-full transition"
              >
                <Send size={18} />
                Telegram
              </a>

            </div>

            {/* COPY */}
            <div className="flex gap-2">

              <input
                value={share?.shareUrl || ''}
                readOnly
                className="border border-gray-300 p-3 flex-1 rounded-xl"
              />

              <button
                onClick={() => {

                  navigator.clipboard.writeText(
                    share?.shareUrl || ''
                  )

                  setCopied(true)

                  setTimeout(() => {
                    setCopied(false)
                  }, 2000)
                }}
                className="bg-[#d96b3c] hover:bg-[#c85f34] text-white px-5 rounded-xl transition"
              >
                <Copy size={18} />
              </button>

            </div>

            {copied && (
              <p className="text-green-600 text-sm mt-2">
                Link copied!
              </p>
            )}

            {/* QR */}
            {share?.qrCode && (
              <img
                src={share.qrCode}
                className="w-40 mt-6"
              />
            )}

          </div>

        </div>

      </main>

      <Footer />

      {/* DELETE MODAL */}
      {deleteModal && (

        <div
          onClick={() =>
            setDeleteModal(false)
          }
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white p-6 rounded-2xl w-[90%] max-w-sm"
          >

            <h2 className="text-xl font-semibold mb-3">
              Delete Gift
            </h2>

            <p className="text-gray-500">
              Are you sure you want to delete this gift?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() =>
                  setDeleteModal(false)
                }
                className="flex-1 border py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={loadingDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && (

        <div
          onClick={() =>
            setEditModal(false)
          }
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >

          <form
            onClick={(e) =>
              e.stopPropagation()
            }
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-2xl w-[90%] max-w-md space-y-4"
          >

            <h2 className="text-2xl font-semibold text-[#2f1712]">
              Edit Gift
            </h2>

            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  title: e.target.value
                })
              }
              className="border p-3 rounded-xl w-full"
              placeholder="Title"
            />

            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  description:
                    e.target.value
                })
              }
              className="border p-3 rounded-xl w-full h-24"
              placeholder="Description"
            />

            <input
              value={editForm.price}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  price: e.target.value
                })
              }
              className="border p-3 rounded-xl w-full"
              placeholder="Price"
            />

            <input
              value={editForm.link}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  link: e.target.value
                })
              }
              className="border p-3 rounded-xl w-full"
              placeholder="Shopping Link"
            />

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setEditModal(false)
                }
                className="flex-1 border py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-[#d96b3c] hover:bg-[#c85f34] text-white py-3 rounded-xl transition"
              >
                Save
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ADD GIFT */}
      <AddGiftModal
        isOpen={showAddGift}
        onClose={() =>
          setShowAddGift(false)
        }
        registryId={registry.id}
        onGiftAdded={loadRegistry}
      />

    </div>
  )
}