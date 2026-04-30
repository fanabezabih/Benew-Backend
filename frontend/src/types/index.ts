export type Language = 'en' | 'am'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface Occasion {
  id: string
  titleEn: string
  titleAm: string
  descriptionEn: string
  descriptionAm: string
  icon: string
  gradient: string
}

export interface Testimonial {
  id: string
  name: string
  initials: string
  occasion: string
  location: string
  text: string
  color: string
}

export interface PricingPlan {
  id: string
  nameEn: string
  nameAm: string
  descriptionEn: string
  descriptionAm: string
  price: number
  currency: string
  features: Array<{ textEn: string; textAm: string }>
  popular?: boolean
  buttonAction: 'signup' | 'contact'
}