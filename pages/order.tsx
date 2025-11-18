// pages/order.tsx
import { useRouter } from "next/router";
import { FormEvent, useState, ChangeEvent, useRef } from "react";

type OrderType = "DTF Gang Sheets" | "Custom Apparel" | "Other" | "";

export default function OrderPage() {
  const router = useRouter();
  const [orderType, setOrderType] = useState<OrderType>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const [fileInputCount, setFileInputCount] = useState(1);

  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [showStrike, setShowStrike] = useState(false);

  function handleFileChange(index: number, e: ChangeEvent<HTMLInputElement>) {
    const hasFiles = e.target.files && e.target.files.length > 0;
    if (!hasFiles) return;
    if (index === fileInputCount - 1) {
      setFileInputCount((prev) => prev + 1);
    }
  }

  function goToStepFromA() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const required = ["name", "email", "phone"];
    const missing = required.some((field) => !String(data.get(field) || "").trim());
    if (missing) {
      setError("Please fill out all required fields in section A before continuing.");
      return;
    }
    setError(null);
    setStep(2);
  }

  function goToStepFromB() {
    if (!orderType) {
      setError("Please select what you are ordering in section B before continuing.");
      return;
    }
    setError(null);
    setStep(3);
  }

  function goToStepFromC() {
    setError(null);
    setStep(4);
  }

  function goToStepFromD() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const garmentType = String(data.get("garmentType") || "").trim();
    const color = String(data.get("color") || "").trim();
    const instructions = String(data.get("designPlacementInstructions") || "").trim();
    const sizeFields = ["sizeSmall", "sizeMedium", "sizeLarge", "sizeXL", "size2XL", "size3XL"];
    const hasQty = sizeFields.some((name) => Number(data.get(name) || 0) > 0);
    const placements = data.getAll("placements");

    if (!garmentType || !color || !instructions || !hasQty || placements.length === 0) {
      setError(
        "Please choose a garment type, shirt color, at least one size quantity, at least one placement, and fill in the design-to-placement instructions before continuing."
      );
      return;
    }
    setError(null);
    setStep(5);
  }

  function goToStepFromE() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const dueDate = String(data.get("dueDate") || "").trim();
    if (!dueDate) {
      setError("Please pick a need-by date before continuing.");
      return;
    }
    if (dateError) {
      setError("Please choose a need-by date in the future before continuing.");
      return;
    }
    setError(null);
    setStep(6);
  }

  function goToStepFromF() {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const notes = String(data.get("notes") || "").trim();
    if (!notes) {
      setError('Please add Extra Notes or type "N/A" before continuing.');
      return;
    }
    setError(null);
    setStep(7);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 7) {
      setError("Please complete all sections A through G before submitting.");
      setIsSubmitting(false);
      return;
    }
    if (dateError) {
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

      try {
    const res = await fetch("/api/order", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to submit form");
    }

    // Show lightning strike animation
    setShowStrike(true);

    // Small delay so animation plays, then go to thank-you page
    setTimeout(() => {
      router.push("/thank-you");
    }, 1000); // 1000ms = 1 second, adjust if you want longer
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again or contact us directly.");
    setIsSubmitting(false);
  }
  }

  return (
    <main className="min-h-screen bg-white text-black font-[var(--font-main)] text-lg">
      {showStrike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <span className="bolt-strike text-[120px] md:text-[180px] text-yellow-400">
            ⚡
          </span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Start Your Order ⚡</h1>
        <p className="mb-6 text-gray-700">
          Send us your design and details. We&apos;ll create a custom mockup for you to approve
          before anything gets printed.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white text-black rounded-2xl p-8 md:p-10 space-y-10 shadow-lg border border-slate-200 text-lg"
        >
          {/* A) Contact Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-yellow-300 border-b border-slate-700 pb-2">
              A. Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base mb-1">Full Name *</label>
                <input
                  name="name"
                  required
                  className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-base mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-base mb-1">Phone Number *</label>
                <input
                  name="phone"
                  required
                  className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base"
                />
              </div>
              <div>
                <label className="block text-base mb-1">Business / Team Name</label>
                <input
                  name="company"
                  className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base"
                />
              </div>
            </div>
          </section>
          {step === 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={goToStepFromA}
                className="mt-2 px-4 py-2 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
              >
                Continue to B
              </button>
            </div>
          )}

          {/* B) Order Type */}
          {step >= 2 && (
            <>
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-yellow-300 border-b border-slate-700 pb-2">
                  B. What Are You Ordering?
                </h2>
                <div className="grid md:grid-cols-3 gap-3 text-base">
                  {["DTF Gang Sheets", "Custom Apparel", "Embroidery"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 rounded-md border border-slate-400 px-4 py-3 cursor-pointer text-base ${
                        orderType === opt
                          ? "border-yellow-400 bg-yellow-200"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="orderType"
                        value={opt}
                        onChange={() => setOrderType(opt as OrderType)}
                        required
                        className="accent-yellow-400"
                      />
                      <span className="text-base">{opt}</span>
                    </label>
                  ))}
                </div>
                <p className="text-base text-red-500">
                  If you need more than one product type, please submit separate orders so nothing
                  gets mixed up.
                </p>
              </section>
              {step === 2 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={goToStepFromB}
                    className="mt-2 px-4 py-2 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
                  >
                    Continue to C
                  </button>
                </div>
              )}
            </>
          )}

          {/* C) Uploads */}
          {step >= 3 && (
            <>
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-yellow-300 border-b border-slate-700 pb-2">
                  C. Upload Your Design(s)
                </h2>
                <div>
                  <label className="block text-base mb-2">
                    <span className="underline font-semibold">Design Files</span>
                  </label>
                  {Array.from({ length: fileInputCount }).map((_, idx) => (
                    <div key={idx} className="mb-3">
                      <input
                        type="file"
                        name="files"
                        accept=".png,.jpg,.jpeg,.pdf,.svg"
                        onChange={(e) => handleFileChange(idx, e)}
                        className="w-full text-base cursor-pointer border border-slate-400 p-3 rounded-md bg-slate-100 hover:bg-slate-200 transition"
                      />
                    </div>
                  ))}
                  <p className="text-base text-red-500 mt-1">
                    After you choose a file, another upload box will appear so you can add more. You
                    can add as many files as you need (PNG, JPG, PDF, SVG).
                  </p>
                </div>
              </section>
              {step === 3 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={goToStepFromC}
                    className="mt-2 px-4 py-2 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
                  >
                    Done Uploading – Continue to D
                  </button>
                </div>
              )}
            </>
          )}

          {/* D) Custom Apparel */}
          {step >= 4 && (
            <>
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-yellow-300 border-b border-slate-700 pb-2">
                  D. Custom Apparel (if applicable)
                </h2>

                {/* Garment + Color */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base mb-1">Garment Type</label>
                    <select
                      name="garmentType"
                      className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a garment type
                      </option>
                      <option value="Mens T-Shirt">Men&apos;s T-Shirt</option>
                      <option value="Womens T-Shirt">Women&apos;s T-Shirt</option>
                      <option value="Youth T-Shirt">Youth&apos;s T-Shirt</option>
                      <option value="Mens Hoodie">Men&apos;s Hoodie</option>
                      <option value="Womens Hoodie">Women&apos;s Hoodie</option>
                      <option value="Youth Hoodie">Youth&apos;s Hoodie</option>
                      <option value="Mens Jacket">Men&apos;s Jacket</option>
                      <option value="Womens Jacket">Women&apos;s Jacket</option>
                      <option value="Youth Jacket">Youth&apos;s Jacket</option>
                      <option value="Mens Long Sleeve">Men&apos;s Long Sleeve</option>
                      <option value="Womens Long Sleeve">Women&apos;s Long Sleeve</option>
                      <option value="Youth Long Sleeve">Youth&apos;s Long Sleeve</option>
                      <option value="Mens Tank Top">Men&apos;s Tank Top</option>
                      <option value="Womens Tank Top">Women&apos;s Tank Top</option>
                      <option value="Youth Tank Top">Youth&apos;s Tank Top</option>
                      <option value="Adult Dri-Fit">Adult&apos;s Dri-Fit</option>
                      <option value="Youth Dri-Fit">Youth&apos;s Dri-Fit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-base mb-1">Shirt Color</label>
                    <input
                      name="color"
                      className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base"
                      placeholder="Example: Black, White, Sport Grey..."
                    />
                    <p className="text-base text-red-500 mt-1">
                      If you need multiple colors, please submit a separate order for each color.
                    </p>
                  </div>
                </div>

                {/* Sizes tiles */}
                <div>
                  <label className="block text-base mb-2">Sizes &amp; Quantities</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-base">
                    {[
                      ["Small", "sizeSmall"],
                      ["Medium", "sizeMedium"],
                      ["Large", "sizeLarge"],
                      ["XL", "sizeXL"],
                      ["2XL", "size2XL"],
                      ["3XL", "size3XL"],
                    ].map(([label, name]) => (
                      <div key={name} className="space-y-1">
                        <div className="text-xs text-slate-300">{label}</div>
                        <input
                          type="number"
                          min={0}
                          name={name}
                          className="w-full rounded-md bg-white border border-slate-300 px-2 py-1 text-base"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placements */}
                <div>
                  <label className="block text-base mb-2">Print Placements (choose all that apply)</label>
                  <div className="grid md:grid-cols-3 gap-2 text-base">
                    {[
                      "Left Chest",
                      "Right Chest",
                      "Full Chest / Full Front",
                      "Full Back",
                      "Left Sleeve",
                      "Right Sleeve",
                      "Other",
                    ].map((placement) => (
                      <label
                        key={placement}
                        className="flex items-center gap-2 rounded-md bg-white border border-slate-300 px-3 py-2"
                      >
                        <input
                          type="checkbox"
                          name="placements"
                          value={placement}
                          className="accent-yellow-400"
                        />
                        <span>{placement}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-base text-red-500 mt-1">
                    If you select &quot;Other&quot;, please explain in the notes below.
                  </p>
                </div>

                {/* Design-to-placement instructions */}
                <div>
                  <label className="block text-base mb-1">Design-to-Placement Instructions</label>
                  <textarea
                    name="designPlacementInstructions"
                    className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base min-h-[80px]"
                    placeholder={`Example:\n- \"logo_left.png\" → Left Chest\n- \"back_design.pdf\" → Full Back`}
                  />
                </div>
              </section>
              {step === 4 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={goToStepFromD}
                    className="mt-2 px-4 py-2 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
                  >
                    Continue to E
                  </button>
                </div>
              )}
            </>
          )}

          {/* Need-by date */}
          {step >= 5 && (
            <div className="max-w-xs">
              <label className="block text-xl font-semibold text-yellow-300 border-b border-slate-700 pb-2">E. Need-By Date</label>
              <input
                type="date"
                name="dueDate"
                onChange={(e) => {
                  const selected = new Date(e.target.value);
                  const today = new Date();
                  today.setHours(0,0,0,0);
                  if (selected < today) {
                    setDateError("Date cannot be in the past.");
                  } else {
                    setDateError(null);
                  }
                }}
                className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base"
              />
              {dateError && (
                <p className="text-base text-red-500 mt-1">{dateError}</p>
              )}
              <p className="text-base text-red-500 mt-1">
                ⚠ Rush orders (needed within 1–3 days) may require additional rush fees depending on
                complexity and availability.
              </p>
              {step === 5 && (
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={goToStepFromE}
                    className="px-4 py-2 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
                  >
                    Continue to F
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Extra notes */}
          {step >= 6 && (
            <div>
              <label className="block text-xl font-semibold text-yellow-300 border-b border-slate-700 pb-2">F. Extra Notes</label>
              <textarea
                name="notes"
                className="w-full rounded-md bg-white border border-slate-300 px-3 py-2 text-base min-h-[80px]"
                placeholder="Anything else we should know? Special instructions, mockup ideas, etc."
              />
              {step === 6 && (
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={goToStepFromF}
                    className="px-4 py-2 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 transition"
                  >
                    Continue to G
                  </button>
                </div>
              )}
            </div>
          )}

          {/* G) Approval */}
          {step >= 7 && (
            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-yellow-300 border-b border-slate-700 pb-2">
                G. Approval
              </h2>
              <label className="flex items-center gap-2 text-base">
                <input
                  type="checkbox"
                  name="approvalCheck"
                  required
                  className="accent-yellow-400"
                />
                <span>
                  I understand nothing will be printed until I approve the final mockup.
                </span>
              </label>
            </section>
          )}

          {error && (
            <p className="text-base text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || step < 7 || !!dateError}
            className="w-full md:w-auto px-6 py-2.5 rounded-md bg-yellow-400 text-slate-900 font-semibold hover:bg-yellow-300 disabled:opacity-60 transition"
          >
            {isSubmitting ? "Sending..." : "Send My Order Details ⚡"}
          </button>
        </form>
      </div>
    </main>
  );
}