'use client'

import {
  useState
} from 'react'

import { X } from 'lucide-react'

import {
  giftAPI,
  contributionAPI
} from '@/lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  gift: any
  registryId: string
  refresh: () => Promise<void>
}

export default function GiftDetailsModal({
  isOpen,
  onClose,
  gift,
  registryId,
  refresh
}: Props) {

  const [donateOpen,
    setDonateOpen
  ] = useState(false)

  const [reserveOpen,
    setReserveOpen
  ] = useState(false)

  const [purchaserName,
    setPurchaserName
  ] = useState('')

  const [amount, setAmount] =
    useState('')

  const [firstName,
    setFirstName
  ] = useState('')

  const [lastName,
    setLastName
  ] = useState('')

  const [email, setEmail] =
    useState('')

  const [message,
    setMessage
  ] = useState('')

  const [loading,
    setLoading
  ] = useState(false)

  if (!isOpen || !gift)
    return null

  // =========================
  // RESERVE GIFT
  // =========================
  async function handleReserve() {

    try {

      if (!purchaserName) {

        alert(
          'Please enter your name'
        )

        return
      }

      await giftAPI.reserveGift(
        gift.id,
        purchaserName
      )

      await refresh()

      setReserveOpen(false)

      onClose()

    } catch (err) {

      console.log(err)

      alert(
        'Failed to reserve gift'
      )
    }
  }

  // =========================
  // DONATE
  // =========================
  async function handleDonate() {

    try {

      if (
        !amount ||
        !firstName ||
        !lastName ||
        !email
      ) {

        alert(
          'Please fill all required fields'
        )

        return
      }

      setLoading(true)

      const payload = {

        amount:
          Number(amount),

        email,

        first_name:
          firstName,

        last_name:
          lastName,

        registryId,

        giftItemId:
          gift.id,

        message
      }

      const response =
        await contributionAPI
          .initiatePayment(
            payload
          )

      if (
        !response?.checkout_url
      ) {

        throw new Error(
          'Missing checkout URL'
        )
      }

      window.location.href =
        response.checkout_url

    } catch (err: any) {

      console.log(err)

      alert(
        err?.response?.data
          ?.error ||
        'Payment failed'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 overflow-y-auto py-10">

      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-white rounded-full p-2 shadow z-20"
        >

          <X size={20} />

        </button>

        {/* IMAGE */}
        {gift.image && (

          <img
            src={gift.image}
            alt={gift.title}
            className="w-full h-80 object-cover"
          />
        )}

        <div className="p-8">

          {/* TITLE */}
          <h2 className="text-3xl font-display text-[#2b2118] mb-3">

            {gift.title}

          </h2>

          {/* DESCRIPTION */}
          {gift.description && (

            <p className="text-gray-700 mb-6">

              {gift.description}

            </p>
          )}

          {/* PRICE */}
          {gift.price && (

            <div className="text-lg font-semibold mb-5 text-[#d96b3c]">

              ETB {gift.price}

            </div>
          )}

          {/* PURCHASED */}
          {gift.isReserved && (

            <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-4 py-3 mb-6">

              Purchased by{' '}
              {gift.reservedByName ||
                'Someone'}

            </div>
          )}

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-4">

            {!gift.isReserved && (

              <button
                onClick={() =>
                  setReserveOpen(true)
                }
                className="bg-[#d96b3c] hover:bg-[#c45d31] text-white py-4 rounded-2xl font-semibold transition"
              >

                Mark as Purchased

              </button>
            )}

            <button
              onClick={() =>
                setDonateOpen(true)
              }
              className="border border-[#d96b3c] text-[#d96b3c] hover:bg-[#fff4ef] py-4 rounded-2xl font-semibold transition"
            >

              Donate

            </button>

          </div>

          {/* RESERVE POPUP */}
          {reserveOpen && (

            <div className="mt-8 border-t pt-6">

              <h3 className="text-xl font-semibold mb-4">

                Who purchased this?

              </h3>

              <input
                value={purchaserName}
                onChange={(e) =>
                  setPurchaserName(
                    e.target.value
                  )
                }
                placeholder="Your name"
                className="w-full border p-4 rounded-2xl mb-4"
              />

              <button
                onClick={handleReserve}
                className="w-full bg-[#d96b3c] text-white py-4 rounded-2xl font-semibold"
              >

                Confirm Purchase

              </button>

            </div>
          )}

          {/* DONATION FORM */}
          {donateOpen && (

            <div className="mt-8 space-y-4 border-t pt-6">

              <input
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                placeholder="First name"
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                placeholder="Last name"
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-xl"
              />

              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-xl"
              />

              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-xl h-28"
              />

              <button
                onClick={handleDonate}
                disabled={loading}
                className="w-full bg-[#d96b3c] text-white py-4 rounded-2xl font-semibold"
              >

                {loading
                  ? 'Processing...'
                  : 'Continue to Payment'}

              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}