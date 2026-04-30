'use client'
import React, { createContext, useContext, useState, useCallback } from 'react'

type ModalType = 'login' | 'signup' | 'forgot' | 'create' | 'search' | 'share' | 'contact' | null

interface ModalContextType {
  activeModal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const openModal = useCallback((modal: ModalType) => setActiveModal(modal), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModals must be used within ModalProvider')
  return context
}