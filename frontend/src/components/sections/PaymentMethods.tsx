export default function PaymentMethods() {
  return (
    <section
      className="py-20 bg-white"
      id="payment-methods"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-14">

          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#d96b3c] mb-3">
            Payments
          </p>

          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#2f1712]">
            Powered by Chapa
          </h2>

          <p className="mt-4 text-[#5c4b43] max-w-2xl mx-auto leading-8">
            Secure Ethiopian payment experience
            with trusted local methods.
          </p>

        </div>

        {/* PAYMENT METHODS */}
        <div className="flex flex-wrap items-start justify-center gap-10 lg:gap-16">

          {/* TELEBIRR */}
          <div className="group text-center">

            <div className="w-28 h-28 rounded-full bg-white border border-[#f1d8cb] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

              <img
                src="/images/download(6).jpg"
                alt="telebirr"
                className="w-14 h-14 object-contain"
              />

            </div>

            <div className="mt-5">

              <h3 className="font-semibold text-[#2f1712] text-lg">
                telebirr
              </h3>

              <p className="text-sm text-[#7b6358] mt-1">
                Mobile Payment
              </p>

            </div>

          </div>

          {/* CBE BIRR */}
          <div className="group text-center">

            <div className="w-28 h-28 rounded-full bg-white border border-[#f1d8cb] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

              <img
                src="/images/download(8).jpg"
                alt="CBE Birr"
                className="w-14 h-14 object-contain"
              />

            </div>

            <div className="mt-5">

              <h3 className="font-semibold text-[#2f1712] text-lg">
                CBE Birr
              </h3>

              <p className="text-sm text-[#7b6358] mt-1">
                Bank Payment
              </p>

            </div>

          </div>

          {/* CHAPA */}
          <div className="group text-center">

            <div className="w-28 h-28 rounded-full bg-white border border-[#f1d8cb] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">

              <img
                src="/images/chapa.png"
                alt="Chapa"
                className="w-14 h-14 object-contain"
              />

            </div>

            <div className="mt-5">

              <h3 className="font-semibold text-[#2f1712] text-lg">
                Chapa
              </h3>

              <p className="text-sm text-[#7b6358] mt-1">
                Secure Gateway
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}