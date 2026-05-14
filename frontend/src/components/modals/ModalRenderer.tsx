'use client'

import { useModals } from '@/context/ModalContext'

import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import SearchModal from './SearchModal'
import CreateListModal from './CreateListModal'
import ShareModal from './ShareModal'
import ContactModal from './ContactModal'

export default function ModalRenderer() {
  const { activeModal, closeModal, openModal } = useModals()

  return (
    <>
      {/* LOGIN */}
      {activeModal === 'login' && (
        <LoginModal
          isOpen
          onClose={closeModal}
        />
      )}

      {/* SIGNUP */}
      {activeModal === 'signup' && (
        <SignupModal
          isOpen
          onClose={closeModal}
          onSwitchToLogin={() => openModal('login')}
        />
      )}

      {/* SEARCH */}
      {activeModal === 'search' && (
        <SearchModal
          isOpen
          onClose={closeModal}
        />
      )}

      {/* CREATE LIST */}
      {activeModal === 'create' && (
        <CreateListModal
          isOpen
          onClose={closeModal}
        />
      )}

      {/* SHARE */}
      {activeModal === 'share' && (
        <ShareModal
          isOpen
          onClose={closeModal}
        />
      )}

      {/* CONTACT */}
      {activeModal === 'contact' && (
        <ContactModal
          isOpen
          onClose={closeModal}
        />
      )}
    </>
  )
}