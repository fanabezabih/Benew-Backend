'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { giftAPI } from '@/lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  gift: any
  refresh: () => Promise<void>
}

export default function EditGiftModal({
  isOpen,
  onClose,
  gift,
  refresh
}: Props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (gift) {
      setTitle(gift.title || '')
      setDescription(gift.description || '')
      setPrice(gift.price || '')
      setImage(gift.image || '')
      setLink(gift.link || '')
    }
  }, [gift])

  if (!isOpen || !gift) return null

  async function handleUpdate() {
    try {
      setLoading(true)

      await giftAPI.updateGift(gift.id, {
        title,
        description,
        price: Number(price),
        image,
        link
      })

      await refresh()
      onClose()

    } catch (err) {
      console.log(err)
      alert('Failed to update gift')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-xl rounded-3xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Edit Gift
        </h2>

        {/* IMAGE PREVIEW */}
        {image && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Image Preview
            </p>
            <img
              src={image}
              className="w-full h-48 object-cover rounded-2xl border"
            />
          </div>
        )}

        <div className="space-y-4">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border p-3 rounded-xl h-24"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            className="w-full border p-3 rounded-xl"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            className="w-full border p-3 rounded-xl"
          />

          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link"
            className="w-full border p-3 rounded-xl"
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-[#d96b3c] text-white py-3 rounded-xl"
          >
            {loading ? 'Updating...' : 'Update Gift'}
          </button>

        </div>

      </div>
    </div>
  )
}