// pages/index.tsx
import Link from "next/link";
import Image from "next/image";

const portfolioImages = [
  "/portfolio/htown.jpeg",
  "/portfolio/img-7199.jpeg",
  "/portfolio/salty-crew-alpha.png",
  "/portfolio/shirt-warzone.jpeg",
  "/portfolio/team-zap.jpeg",
  "/portfolio/usmike.jpeg",
];

const loopedImages = [
  ...portfolioImages,
  ...portfolioImages,
  ...portfolioImages,
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO: full-width black banner */}
      <section className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Top bar: centered logo + title */}
         <header className="flex flex-col items-center justify-center gap-4 text-center">
  <div className="flex items-center gap-3">
    <div className="relative h-10 w-10">
      <Image
        src="/bolt-logo-big.png"
        alt="Bolt Gang Printing logo"
        fill
        className="object-contain"
        priority
      />
    </div>

    <p className="text-xl md:text-2xl leading-tight font-bold text-center">
      Bolt Gang Printing
    </p>
  </div>
</header>

          {/* Hero body */}
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
            {/* Left: welcome text + CTA */}
            <div>
              <h1 className="text-4xl md:text-5xl leading-tight font-bold">
  From gang sheets to full apparel {" "}
  <span className="text-yellow-400">lightning fast.</span>
</h1>

              <div className="mt-6 space-y-1 text-base md:text-lg text-gray-200">
  <p>• DTF gang sheets</p>
  <p>• Embroidery</p>
  <p>• Custom apparel</p>
  <p>• Team gear</p>
</div>

              <Link
                href="/order"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-yellow-400 px-7 py-3 text-sm md:text-base font-bold tracking-wide text-black shadow-lg shadow-yellow-400/40 hover:bg-yellow-300 transition"
              >
                Start Your Order ⚡
              </Link>
            </div>

            {/* Right: how it works card */}
            <div className="rounded-3xl border border-white/10 bg-black p-6 md:p-7 text-sm md:text-base text-gray-200 shadow-2xl">
              <p className="text-xs uppercase tracking-[0.22em] text-yellow-300 mb-2">
                How it works
              </p>
              <ol className="space-y-3 text-sm md:text-[15px] leading-relaxed">
                <li>
                  <span className="font-bold text-yellow-300">1.</span> Fill out
                  the order form with your design, sizes, and details.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">2.</span> We
                  create a custom mockup and send it to your email.
                </li>
                <li>
                  <span className="font-bold text-yellow-300">3.</span> You
                  approve it, pay, and we print fast as lightning.
                </li>
              </ol>
              <p className="mt-4 text-[11px] md:text-xs text-gray-400">
                Rush jobs available. If you need something within 1–3 days,
                rush fees may apply depending on complexity and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO MARQUEE SECTION HEADER — WITHOUT TRACK (your original) */}
      <section className="portfolio-marquee">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-yellow-400 mb-3">
            Recent work
          </p>

          <div className="overflow-hidden">
            <div className="portfolio-track">
              {loopedImages.map((src, index) => (
                <div className="portfolio-item" key={index}>
                  <Image
                    src={src}
                    alt="Bolt Gang Printing portfolio piece"
                    width={320}
                    height={220}
                    className="portfolio-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}