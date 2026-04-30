'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { ModalProps } from '@/types'

export default function ShareModal({ isOpen, onClose }: ModalProps) {
  const [copied, setCopied] = useState(false)
  const listUrl = 'https://benenw.com/list/abebe-sara'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(listUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = listUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-terracotta/10 rounded-full flex items-center justify-center mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C45D3E"
              strokeWidth="2"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-semibold text-espresso">
            <span className="text-en">Share your list</span>
            <span className="text-am">ዝርዝርዎን ያጋሩ</span>
          </h2>
          <p className="text-[var(--fg-muted)] mt-2 text-sm">
            <span className="text-en">Share with family and friends</span>
            <span className="text-am">ከቤተሰብና ከጓደኞች ጋር ያጋሩ</span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={listUrl}
              readOnly
              className="flex-1 px-4 py-3 border border-[var(--border)] rounded-xl bg-white font-mono text-sm"
            />
            <Button onClick={copyToClipboard} size="sm" className="whitespace-nowrap">
              <span className="text-en">{copied ? 'Copied!' : 'Copy'}</span>
              <span className="text-am">
                {copied ? 'ተቀድቷል!' : 'ቅዳ'}
              </span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-[#25D366] hover:-translate-y-0.5 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.29-.174-3.054.906.906-3.054-.174-.29A8 8 0 1 1 12 20z" />
              </svg>
              WhatsApp
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-[#0088cc] hover:-translate-y-0.5 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-17.15 6.57a1.9 1.9 0 0 0 .085 3.54l4.15 1.62 2.25 6.65a1.32 1.32 0 0 0 2.26.32l3.07-3.38 4.35 3.2a1.88 1.88 0 0 0 2.94-1.22l2.75-13.74a2.24 2.24 0 0 0-1.68-2.77z" />
              </svg>
              Telegram
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-[#1877F2] hover:-translate-y-0.5 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="text-center pt-2">
            <button className="text-sm text-terracotta hover:underline font-medium">
              <span className="text-en">Download QR Code</span>
              <span className="text-am">QR ኮድ ያውርዱ</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}