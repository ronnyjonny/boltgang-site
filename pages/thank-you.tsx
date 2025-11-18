// pages/thank-you.tsx
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [showStrike, setShowStrike] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStrike(false);
    }, 1200); // show bolt for 1.2s

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black font-[var(--font-main)] flex items-center">
      {showStrike && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90">
          <span className="bolt-strike text-[260px] md:text-[360px] lg:text-[460px] text-yellow-400">
            ⚡
          </span>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Thank you for your order ⚡
        </h1>
        <p className="text-lg mb-6">
          We just received your details and artwork. The Bolt Gang team is already on it.
        </p>

        <div className="text-left bg-slate-100 border border-slate-300 rounded-2xl p-6 space-y-4 mb-8">
          <h2 className="text-2xl font-semibold mb-2">What happens next?</h2>
          <ol className="list-decimal list-inside space-y-2 text-base">
            <li>
              <span className="font-semibold">We review your files &amp; notes.</span> We&apos;ll check artwork
              quality, placements, sizes, and any special instructions you gave us.
            </li>
            <li>
              <span className="font-semibold">We build your custom mockup.</span> You&apos;ll receive a clear
              digital mockup showing print positions, sizing, and colors.
            </li>
            <li>
              <span className="font-semibold">You approve or request changes.</span> Nothing gets printed until
              you say it&apos;s good to go. If you need tweaks, we&apos;ll adjust.
            </li>
            <li>
              <span className="font-semibold">We confirm pricing &amp; payment.</span> Once approved, we&apos;ll
              finalize your total and send payment options.
            </li>
            <li>
              <span className="font-semibold">We print, press, and get it ready.</span> After payment, we move
              your order into production and get everything ready for pickup or shipping.
            </li>
          </ol>
          <p className="text-sm text-yellow-700 mt-3">
            If you requested a rush date (1–3 days), we&apos;ll prioritize your mockup and confirm if that
            timeline is possible based on your order.
          </p>
        </div>

        <p className="text-base mb-8">
          If you need to update something on your order, reply to the confirmation email you receive or
          reach out directly and mention your name and order details.
        </p>

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Link
            href="/order"
            className="inline-block px-6 py-2.5 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
          >
            Start Another Order
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 rounded-md border border-slate-300 text-slate-900 font-semibold hover:bg-slate-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}