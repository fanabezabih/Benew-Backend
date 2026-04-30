import Link from 'next/link'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { useModals } from '@/context/ModalContext'

export default function Footer() {
  const { openModal } = useModals()

  return (
    <footer className="bg-espresso text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/Benenew-01.png" alt="Bene'nw Logo" className="h-14 w-auto" />
            </div>
            <p className="text-white/50 text-sm max-w-sm mb-4">
              <span className="text-en">Bene'nw is an Ethiopian gift registry and contribution platform designed for modern celebrations.</span>
              <span className="text-am">Bene'nw ለዘመናዊ ክብረ በዓሎች የተሰራ የኢትዮጵያ የስጦታ ዝርዝርና አስተዋፅኦ መድረክ ነው።</span>
            </p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'Telegram', 'TikTok'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-terracotta transition-colors" aria-label={social}>
                   {/* Social SVG Icons can be added here based on the original HTML */}
                   <span className="text-xs">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4"><span className="text-en">Product</span><span className="text-am">ምርት</span></h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="#how-it-works" className="hover:text-white transition-colors"><span className="text-en">How It Works</span><span className="text-am">እንዴት እንደሚሰራ</span></Link></li>
              <li><Link href="#occasions" className="hover:text-white transition-colors"><span className="text-en">Occasions</span><span className="text-am">አጋጣሚዎች</span></Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors"><span className="text-en">Pricing</span><span className="text-am">ዋጋ</span></Link></li>
              <li><button onClick={() => openModal('search')} className="hover:text-white transition-colors text-left"><span className="text-en">Find a List</span><span className="text-am">ዝርዝር ይፈልጉ</span></button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4"><span className="text-en">Support</span><span className="text-am">ድጋፍ</span></h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="#faq" className="hover:text-white transition-colors"><span className="text-en">FAQ</span><span className="text-am">ጥያቄዎች</span></Link></li>
              <li><button onClick={() => openModal('contact')} className="hover:text-white transition-colors text-left"><span className="text-en">Contact Us</span><span className="text-am">አግኙን</span></button></li>
              <li><a href="#" className="hover:text-white transition-colors"><span className="text-en">Privacy Policy</span><span className="text-am">የግላዊነት ፖሊሲ</span></a></li>
            </ul>
            <div className="mt-6"><LanguageToggle /></div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">© 2026 Bene'nw. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors"><span className="text-en">Privacy</span><span className="text-am">ግላዊነት</span></a>
            <a href="#" className="hover:text-white/60 transition-colors"><span className="text-en">Terms</span><span className="text-am">ደንብ</span></a>
          </div>
        </div>
      </div>
    </footer>
  )
}