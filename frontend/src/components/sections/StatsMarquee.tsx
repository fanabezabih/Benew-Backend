export default function StatsMarquee() {
  const stats = [
    {
      value: '2,500+',
      labelEn: 'Lists Created',
      labelAm: 'ዝርዝሮች ተፈጥሯል',
    },
    {
      value: '15M+',
      labelEn: 'ETB Contributed',
      labelAm: 'ብር ተሰብስቧል',
    },
    {
      value: '50+',
      labelEn: 'Cities Covered',
      labelAm: 'ከተሞች',
    },
    {
      value: '4.9 ★',
      labelEn: 'User Rating',
      labelAm: 'የተጠቃሚ ደረጃ',
    },
    {
      value: '3',
      labelEn: 'Payment Options',
      labelAm: 'የክፍያ አማራጮች',
    },
  ];

  return (
    <section className="bg-espresso py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          {stats.map((stat, idx) => (

            <div
              key={idx}
              className="text-center"
            >
              <h3 className="font-display text-3xl font-semibold text-gold mb-2">
                {stat.value}
              </h3>

              <p className="text-sm text-white/80">
                <span className="text-en">
                  {stat.labelEn}
                </span>

                <span className="text-am">
                  {stat.labelAm}
                </span>
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}