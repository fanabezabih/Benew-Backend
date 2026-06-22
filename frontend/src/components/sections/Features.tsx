export default function Features() {
  return (
    <section className="py-24 bg-[#fffaf7]">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">

          <span className="inline-block px-4 py-2 rounded-full bg-[#fff1ea] text-[#d96b3c] text-sm font-medium">
            Why Bene'nw
          </span>

          <h2 className="mt-6 font-display text-4xl md:text-5xl text-[#2f1712]">
            Celebrations made simpler
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-[#6d5a52] leading-7">
            A modern way to organize gifts, receive support, and celebrate life's
            biggest moments with the people who matter most.
          </p>

        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-12 gap-5">

          {/* Large Card */}
          <div className="lg:col-span-7 bg-[#fff1ea] rounded-[36px] p-10">

            <div className="text-[#d96b3c] text-sm font-medium mb-4">
              01
            </div>

            <h3 className="font-display text-3xl md:text-4xl text-[#2f1712] mb-4">
              Made for Ethiopian celebrations
            </h3>

            <p className="text-[#6d5a52] text-lg leading-8">
              Whether it's a wedding, graduation, birthday, baby shower,
              housewarming, or any special milestone, Bene'nw helps loved
              ones celebrate together.
            </p>

          </div>

          {/* Small Card */}
          <div className="lg:col-span-5 bg-white border border-[#efd9ca] rounded-[36px] p-8">

            <div className="text-[#d96b3c] text-sm font-medium mb-4">
              02
            </div>

            <h3 className="font-display text-2xl text-[#2f1712] mb-3">
              One simple link
            </h3>

            <p className="text-[#6d5a52] leading-7">
              Share your celebration page anywhere and keep everything in
              one beautiful place.
            </p>

          </div>

          {/* Small Card */}
          <div className="lg:col-span-5 bg-white border border-[#efd9ca] rounded-[36px] p-8">

            <div className="text-[#d96b3c] text-sm font-medium mb-4">
              03
            </div>

            <h3 className="font-display text-2xl text-[#2f1712] mb-3">
              Secure contributions
            </h3>

            <p className="text-[#6d5a52] leading-7">
              Receive support through trusted payment partners with a smooth
              and familiar experience.
            </p>

          </div>

          {/* Large Dark Card */}
          <div className="lg:col-span-7 bg-[#2f1712] rounded-[36px] p-10 text-white">

            <div className="text-[#f3b08f] text-sm font-medium mb-4">
              04
            </div>

            <h3 className="font-display text-3xl md:text-4xl mb-4">
              Support from anywhere
            </h3>

            <p className="text-white/80 text-lg leading-8">
              Friends and family near or far can contribute, send gifts,
              and be part of your special moment.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}