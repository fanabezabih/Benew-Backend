'use client'

import { useState } from 'react'

const faqs = [
  {
    qEn: "What is Bene'nw?",
    qAm: "Bene'nw ምንን ነው?",
    aEn: "Bene'nw is an Ethiopian gift registry and contribution platform designed for modern celebrations. It helps individuals and families create personalized lists, receive support securely, and share one simple link with loved ones across Ethiopia and beyond.",
    aAm: "Bene'nw ለዘመናዊ ክብረ በዓሎች የተሰራ የኢትዮጵያ የስጦታ ርዝዝርና አስተዋፅኦ መድረክ ነው። ሰዎችንና ቤተሰቦችን የግላዊ ዝርዝሮችን መፈርመር፣ ደህና አስተዋፅኦ ሰብስባ፣ እና ከኢትዮጵያ እና ከውጭ በአንድ ቀለሪ ሊንክ ከተባልቦች ጋር ለማጋራት ያስችል።"
  },
  {
    qEn: "Is it free to create a list?",
    qAm: "ዝርዝር መፍጠር ነጻ ነው?",
    aEn: "Yes! Our basic plan is completely free. You can create lists, share them, and receive contributions without any hidden fees.",
    aAm: "አዎ! መሰረታዊ እቅዳችን ሙሉ በሙሉ ነጻ ነው። ዝርዝሮችን ማጋራት፣ አስተዋፅኦ ማቀበል ይችሉል — ድብቅ ክፍያዎች በፍጹም የሉም።"
  },
  {
    qEn: "Which payment methods are supported?",
    qAm: "የትኞቹ የክፍያ ዘዴዎች ይገሉ?",
    aEn: "We support telebirr, CBE Birr, bank transfer, and international card payments for diaspora contributors. More payment options are being added regularly.",
    aAm: "ቴሌብር፣ ንግድ ብር፣ የባንክ ዝውውርና ዲያስፖራ ዓለም አቀፍ ካርድ ክፍያዎችን እንደግፋለን። ተጨማሪ የክፍያ አማራጮች በተደጋጋሚ ይታከማሉ ነው።"
  },
  {
    qEn: "Can I add items from any store?",
    qAm: "ከማንውም ሱቅ ዕቃች ከል እችለሁ?",
    aEn: "Absolutely! You can add products from any online store by pasting the link, or create custom gift items with your own descriptions and prices.",
    aAm: "በእርግ! ከማንኛውም የመስመር ላይ ሱቅ ሊንክ በማጣበቅ ምርቶችን ማከል ወይም የራስዎን መገልፅ እና ዋጋዎች ያለቀምጡ ብጁ ስጦታ ንጥሎችን መፍጠር ይችላሉ።"
  },
  {
    qEn: "How do payouts work?",
    qAm: "ክፍያዎች እንዴት ይሰራሉ?",
    aEn: "Contributions are collected securely and can be transferred to your registered bank account or mobile wallet. You can track everything from your dashboard.",
    aAm: "አስተዋፅኦዎች በደህና ይሰበሰባ እና ወደ ተመዘገቡ ያለንባበት ባንክ ሂሳብ ወይም ሞባይል ዋሌት ይዛወራሉ። ሁሉንም ከዳሽቦርድዎ ላይ ማከትል ይችሉ።"
  },
  {
    qEn: "Can people abroad contribute?",
    qAm: "ከውጭ ሀገር ያሉ ዎች ማስተዋፅኦ ይችላሉ?",
    aEn: "Yes! Our platform supports international payments so diaspora friends and family can contribute easily from anywhere in the world.",
    aAm: "አዎ! መድረካችን ዓለም አቀፍ ክፍያዎችን እንደግፋለን ስለሆነ ዲያስፖራ ጓደኞችና ቤተሰቦች ከዓለም አቀፍ ማንኛውም ቦታ በቀላል ማስተዋፅኦ ይችላል።"
  },
  {
    qEn: "Can more than one person manage a list?",
    qAm: "ከአንድ በላይ ሰው ዝርዝር ማስተዳደር ይችላል?",
    aEn: "Yes! With our Plus and Premium plans, you can add multiple admins (like couples or family members) to manage the list together.",
    aAm: "አዎ! በፕላስና ፕሪሚየም እቅዶች ብዙ አስተዳዳች (እንንች ወይም ተሰብ) ርዝሩን አብረው ስተዳደር ይችላሉ።"
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-ivory to-ivory-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="reveal font-display text-4xl font-semibold text-espresso">
            <span className="text-en">Frequently Asked Questions</span>
            <span className="text-am">በተደጋጋሚ የሚጠየቁ ጥያቄች</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="reveal bg-white rounded-2xl border border-border overflow-hidden"
            >
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center" 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-medium text-espresso">
                  <span className="text-en">{faq.qEn}</span>
                  <span className="text-am">{faq.qAm}</span>
                </span>
                <svg 
                  className={`w-5 h-5 text-muted transition-transform ${openIdx === i ? 'rotate-180' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 text-espresso/60">
                  <p>
                    <span className="text-en">{faq.aEn}</span>
                    <span className="text-am">{faq.aAm}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}