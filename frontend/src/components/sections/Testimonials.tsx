export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sara & Abebe',
      initials: 'SA',
      occasion: 'Wedding',
      location: 'Addis Ababa',
      text:
        '"Bene\'nw made our wedding registry so easy. Family from Addis and diaspora relatives all contributed through one link."',
      bg: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      name: 'Fikadu & Tsion',
      initials: 'FT',
      occasion: 'Baby Registry',
      location: 'Bahir Dar',
      text:
        '"We used it for our baby shower and it was beautiful. Everyone could contribute towards the items we actually needed."',
      bg: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      name: 'Daniel H.',
      initials: 'DH',
      occasion: 'Contributor',
      location: 'Washington DC',
      text:
        '"I contributed from the US to my friend\'s graduation fund. The international payment worked perfectly."',
      bg: 'bg-green-100',
      textColor: 'text-green-600',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#fffaf5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#2f1712]">
            Loved by Ethiopian families
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-gray-200"
            >
              <p className="text-[#2f1712]/70 mb-4 text-sm">
                {t.text}
              </p>

              <div className="flex items-center gap-3">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${t.bg} ${t.textColor}`}
                >
                  {t.initials}
                </div>

                <div>
                  <p className="font-semibold text-sm text-[#2f1712]">
                    {t.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {t.occasion} · {t.location}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}