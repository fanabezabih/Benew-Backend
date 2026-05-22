'use client'

import {
  useEffect,
  useState
} from 'react'

import {
  X,
 ImagePlus
} from 'lucide-react'

import {
  giftAPI,
  linkPreviewAPI
} from '@/lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  registryId: string
  onGiftAdded: () => void
}

export default function AddGiftModal({
  isOpen,
  onClose,
  registryId,
  onGiftAdded
}: Props) {

  const [loading, setLoading] =
    useState(false)

  const [loadingPreview,
    setLoadingPreview
  ] = useState(false)

  const [preview, setPreview] =
    useState<any>(null)

  // ✅ IMAGE PREVIEW
  const [imagePreview,
    setImagePreview
  ] = useState<string | null>(null)

  const [form, setForm] =
    useState<any>({
      title: '',
      description: '',
      price: '',
      quantity: 1,
      link: '',
      image: null
    })

  // =========================
  // AUTO LINK PREVIEW
  // =========================

  useEffect(() => {

    const delay = setTimeout(() => {

      if (!form.link) return

      fetchPreview(form.link)

    }, 700)

    return () =>
      clearTimeout(delay)

  }, [form.link])

  async function fetchPreview(
    url: string
  ) {

    try {

      setLoadingPreview(true)

      const data =
        await linkPreviewAPI.preview(
          url
        )

      setPreview(data)

      setForm((prev: any) => ({
        ...prev,

        title:
          prev.title ||
          data.title,

        description:
          prev.description ||
          data.description
      }))

    } catch (err) {

      console.log(err)

    } finally {

      setLoadingPreview(false)
    }
  }

  // =========================
  // IMAGE CHANGE
  // =========================

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0]

    if (!file) return

    setForm({
      ...form,
      image: file
    })

    // ✅ SHOW LOCAL IMAGE PREVIEW
    const imageUrl =
      URL.createObjectURL(file)

    setImagePreview(imageUrl)
  }

  // =========================
  // SUBMIT
  // =========================

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setLoading(true)

      const formData =
        new FormData()

      formData.append(
        'title',
        form.title
      )

      formData.append(
        'description',
        form.description
      )

      formData.append(
        'price',
        form.price
      )

      formData.append(
        'quantity',
        String(form.quantity)
      )

      formData.append(
        'link',
        form.link
      )

      // ✅ IMAGE
      if (form.image) {

        formData.append(
          'image',
          form.image
        )
      }

      await giftAPI.addGift(
        registryId,
        formData
      )

      onGiftAdded()

      onClose()

      // RESET
      setForm({
        title: '',
        description: '',
        price: '',
        quantity: 1,
        link: '',
        image: null
      })

      setPreview(null)

      setImagePreview(null)

    } catch (err) {

      console.log(err)

      alert('Failed to add gift')

    } finally {

      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 overflow-y-auto py-10">

      <div className="bg-white rounded-3xl w-full max-w-xl p-8 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-display text-espresso mb-8">
          Add Gift
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* SHOPPING LINK */}
          <input
            placeholder="Shopping link (optional)"
            value={form.link}
            onChange={(e) =>
              setForm({
                ...form,
                link: e.target.value
              })
            }
            className="w-full border rounded-2xl px-4 py-3"
          />

          {/* LINK PREVIEW */}
          {loadingPreview && (
            <p className="text-sm text-gray-400">
              Loading preview...
            </p>
          )}

          {preview?.image && (

            <div className="border rounded-2xl p-3 flex gap-3 items-center">

              <img
                src={preview.image}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>

                <p className="font-semibold text-sm">
                  {preview.title}
                </p>

                <p className="text-xs text-gray-500">
                  {preview.site}
                </p>

              </div>

            </div>
          )}

          {/* TITLE */}
          <input
            placeholder="Gift title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value
              })
            }
            className="w-full border rounded-2xl px-4 py-3"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value
              })
            }
            className="w-full border rounded-2xl px-4 py-3 h-28"
          />

          {/* IMAGE */}
          <div>

            <label className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">

              <ImagePlus
                size={30}
                className="text-gray-400 mb-3"
              />

              <span className="text-sm text-gray-500">

                {form.image
                  ? form.image.name
                  : 'Upload Image'}

              </span>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

            </label>

          </div>

          {/* ✅ LOCAL IMAGE PREVIEW */}
          {imagePreview && (

            <div className="border rounded-2xl overflow-hidden">

              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover"
              />

            </div>
          )}

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value
              })
            }
            className="w-full border rounded-2xl px-4 py-3"
          />

          {/* QUANTITY */}
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity:
                  Number(e.target.value)
              })
            }
            className="w-full border rounded-2xl px-4 py-3"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d96b3c] hover:bg-[#c85f34] text-white py-4 rounded-2xl font-semibold transition"
          >

            {loading
              ? 'Adding...'
              : 'Add Gift'}

          </button>

        </form>

      </div>

    </div>
  )
}