import Button from '@/components/ui/Button'
import { useModals } from '@/context/ModalContext'

export default function FinalCTA() {
  const { openModal } = useModals()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-gold/5" aria-hidden="true"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal">
          <img src="/images/Benenew-01.png" alt="Bene'nw Logo" className="h-20 w-auto mx-auto mb-6" />
        </div>
        <h2 className="reveal font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-espresso leading-tight">
          <span className="text-en">Ready to create your list?</span>
          <span className="text-am">ዝርዝርዎን ለመፍጠር ዝግጁ ዎት?</span>
        </h2>
        <p className="reveal reveal-delay-1 mt-6 text-xl text-espresso/60 max-w-2xl mx-auto">
          <span className="text-en">Join thousands of Ethiopian families celebrating with personalized gift registries. It&apos;s free to start.</span>
          <span className="text-am">በግላዊ የስጦታ ዝርዝሮች የኢትዮጵያ ቤተሰቦች ርዝሩን ይቀላቀሉ። መነሻ ነጻ ነው።</span>
        </p>
        <div className="reveal reveal-delay-2 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => openModal('signup')} size="lg">
            <span className="text-en">Create Your List Today</span>
            <span className="text-am">ዝርዝርዎን ዛሬ ይፍጠሩ</span>
          </Button>
          <Button variant="secondary" onClick={() => openModal('search')} size="lg">
            <span className="text-en">Find a List</span>
            <span className="text-am">ዝርዝር ይፈልጉ</span>
          </Button>
        </div>
      </div>
    </section>
  )
}