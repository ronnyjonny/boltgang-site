import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* top bar */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-slate-200">
        {/* Clean text wordmark */}
        <div className="font-extrabold uppercase tracking-[0.25em] text-sm">
          BOLT GANG PRINTING
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-medium text-slate-600">
          <Link href="/designer?product=tshirt">T-Shirts</Link>
          <Link href="/designer?product=hoodie">Hoodies</Link>
          <Link href="/designer?product=sweatshirt">Sweatshirts</Link>
          <Link href="/designer?product=kids">Kids</Link>
          <Link href="/designer?product=dtf">DTF Transfers</Link>
        </nav>
      </header>

      {/* hero */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 gap-10">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Custom Shirts & DTF Transfers.{" "}
            <span className="text-yellow-400">Fast.</span>
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Upload your art, pick blanks or gang sheets, choose placement, and
            let Bolt Gang handle the prints. Built for teams, brands, and side
            hustles that need it done right.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href="/designer?product=dtf"
              className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-300 transition"
            >
              Start Designing
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              How it works
            </a>
          </div>
        </div>

        {/* custom bolt logo mockup */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-56 h-64 rounded-3xl bg-slate-100 flex items-center justify-center shadow-md relative">
            <div className="w-32 h-40 rounded-2xl bg-white flex items-center justify-center border border-slate-200">
              <img
                src="/bolt-logo-right.png"
                alt="Bolt Gang Logo"
                className="h-20 w-auto"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Preview only – your real design will show in the designer.
          </p>
        </div>
      </section>
    </main>
  );
}