import Image from 'next/image'

const slides = [
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866', labelEn: 'Wedding 💍', labelAm: 'ሰርግ 💍' },
  { src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba', labelEn: 'Newborn Gift 👶', labelAm: 'የአዲስ ሕፃን ጦታ 👶' },
  { src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3', labelEn: 'Birthday 🎂', labelAm: 'ልደት በዓል 🎂' },
  { src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1', labelEn: 'Graduation 🎓', labelAm: 'ምረቃ 🎓' },
  { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa', labelEn: 'Housewarming 🏠', labelAm: 'አዲስ ቤት 🏠' },
  { src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', labelEn: 'Group Fund 🎁', labelAm: 'የቡድን አስተዋፅኦ 🎁' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', labelEn: 'Fund My Trip ✈️', labelAm: 'ጉዞዬን ደግፍ ✈️' },
  { src: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf', labelEn: 'Christmas Gift 🎄', labelAm: 'የገና ጦታ 🎄' },
  { src: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f', labelEn: 'Just Because 💝', labelAm: 'ስለ ምንም ነገር 💝' },
]

export default function HeroGallery() {
  return (
    <div className="hero-gallery-container">
      <div className="gallery-title-small">
        <h3 className="font-display text-1.5xl font-semibold text-[var(--fg)] mb-1">
          <span className="text-en">Celebrations on Bene'nw</span>
          <span className="text-am">በBene'nw ላይ ያሉ ክብረ በዓሎች</span>
        </h3>
        <p className="text-[var(--fg-muted)] text-sm">
          <span className="text-en">See how families celebrate together</span>
          <span className="text-am">ቤተሰቦች እንዴት አብረው እንደሚያከብሩ</span>
        </p>
      </div>
      
      <div className="slider-hero">
        <div className="wrapper-hero">
          {slides.map((slide, i) => (
            <div key={i} className="slide-hero" style={{ animationDelay: `${10 - i * 1.5}s` }}>
              <Image src={slide.src} alt={slide.labelEn} fill className="object-cover" sizes="420px" priority={i < 3} />
              <div className="card-overlay"></div>
              <div className="card-label">
                <span className="text-en">{slide.labelEn}</span>
                <span className="text-am">{slide.labelAm}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}