import Button from '@/components/ui/Button'
import { useModals } from '@/context/ModalContext'

export default function Pricing() {

  const { openModal } = useModals()

  const plans = [

    {
      nameEn: 'Beautiful Registries',
      nameAm: 'ውብ ዝርዝሮች',

      descEn:
        'Create elegant gift lists for birthdays, weddings and special moments.',

      descAm:
        'ለልደት፣ ለሰርግ እና ለልዩ ጊዜዎች ውብ ዝርዝሮች ይፍጠሩ።',

      icon: '🎁',

      features: [
        {
          en: 'Custom cover photos',
          am: 'ብጁ ሽፋን'
        },
        {
          en: 'Add gifts easily',
          am: 'ስጦታዎችን በቀላሉ ያክሉ'
        },
        {
          en: 'Simple sharing',
          am: 'ቀላል ማጋራት'
        }
      ]
    },

    {
      nameEn: 'Easy Contributions',
      nameAm: 'ቀላል አስተዋፅኦ',

      descEn:
        'Friends and family can support you from anywhere.',

      descAm:
        'ጓደኞችና ቤተሰቦች ከየትኛውም ቦታ ሊያግዙዎት ይችላሉ።',

      icon: '💝',

      popular: true,

      features: [
        {
          en: 'Secure payments',
          am: 'ደህንነቱ የተጠበቀ'
        },
        {
          en: 'Gift contributions',
          am: 'የስጦታ አስተዋፅኦ'
        },
        {
          en: 'Thank-you messages',
          am: 'የምስጋና መልዕክቶች'
        }
      ]
    },

    {
      nameEn: 'Made for Ethiopia',
      nameAm: 'ለኢትዮጵያ',

      descEn:
        'Built beautifully for Ethiopian celebrations and families.',

      descAm:
        'ለኢትዮጵያ በውብ ሁኔታ የተገነባ።',

      icon: '🇪🇹',

      features: [
        {
          en: 'Mobile friendly',
          am: 'በስልክ ቀላል'
        },
        {
          en: 'QR sharing',
          am: 'QR ማጋራት'
        },
        {
          en: 'Modern experience',
          am: 'ዘመናዊ ልምድ'
        }
      ]
    }
  ]

  return (

    <section
      id="pricing"
      className="py-24 lg:py-32 relative overflow-hidden"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-white" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="text-center mb-16">

          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f4e4d8] rounded-full text-[#d96b3c] text-sm font-semibold mb-5 reveal">

            <span className="w-2 h-2 rounded-full bg-[#d96b3c]" />

            <span className="text-en">
              Why Benenew?
            </span>

            <span className="text-am">
              ለምን Benenew?
            </span>

          </div>

          <h2 className="reveal font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2b1711] leading-tight">

            <span className="text-en">
              Celebrate beautifully with Benenew
            </span>

            <span className="text-am">
              ውብ በሆነ ሁኔታ ያክብሩ
            </span>

          </h2>

          <p className="mt-6 text-lg text-[#5c463d] max-w-2xl mx-auto leading-relaxed">

            <span className="text-en">
              Create elegant gift registries and receive support
              from friends and family effortlessly.
            </span>

            <span className="text-am">
              ውብ የስጦታ ዝርዝሮችን ይፍጠሩ
              እና ከቤተሰብና ጓደኞች ድጋፍ ያግኙ።
            </span>

          </p>

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {plans.map((plan, i) => (

            <div
              key={i}
              className={`
                reveal reveal-delay-${i + 1}
                rounded-[32px]
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                ${
                  plan.popular
                    ? 'bg-[#d96b3c] text-white shadow-2xl shadow-[#d96b3c]/20 scale-[1.03] border border-[#d96b3c]'
                    : 'bg-white border border-[#eee2d9] hover:border-[#d96b3c]/30 shadow-sm hover:shadow-xl'
                }
              `}
            >

              {/* POPULAR */}
              {plan.popular && (

                <div className="absolute" />

              )}

              {/* ICON */}
              <div className="text-5xl mb-6">

                {plan.icon}

              </div>

              {/* TITLE */}
              <h3 className="font-display text-2xl font-semibold mb-3">

                <span className="text-en">
                  {plan.nameEn}
                </span>

                <span className="text-am">
                  {plan.nameAm}
                </span>

              </h3>

              {/* DESC */}
              <p
                className={`text-[15px] leading-7 mb-8 ${
                  plan.popular
                    ? 'text-white/85'
                    : 'text-[#5c463d]'
                }`}
              >

                <span className="text-en">
                  {plan.descEn}
                </span>

                <span className="text-am">
                  {plan.descAm}
                </span>

              </p>

              {/* FEATURES */}
              <ul className="space-y-4 mb-10">

                {plan.features.map((f, j) => (

                  <li
                    key={j}
                    className={`flex items-start gap-3 text-sm ${
                      plan.popular
                        ? 'text-white/90'
                        : 'text-[#3d2a23]'
                    }`}
                  >

                    <div
                      className={`
                        w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5
                        ${
                          plan.popular
                            ? 'bg-white/20'
                            : 'bg-[#f7ece5]'
                        }
                      `}
                    >

                      ✓

                    </div>

                    <div>

                      <span className="text-en">
                        {f.en}
                      </span>

                      <span className="text-am">
                        {f.am}
                      </span>

                    </div>

                  </li>
                ))}

              </ul>

              {/* BUTTON */}
              <Button
                variant="secondary"
                onClick={() => openModal('signup')}
                className={`
                  w-full py-3 rounded-full font-semibold transition-all
                  ${
                    plan.popular
                      ? 'bg-white text-[#d96b3c] hover:bg-[#f8f1eb] border-white'
                      : ''
                  }
                `}
              >

                <span className="text-en">
                  Get Started
                </span>

                <span className="text-am">
                  ይጀምሩ
                </span>

              </Button>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}