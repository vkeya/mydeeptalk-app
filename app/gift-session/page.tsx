"use client";

import { useState } from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { useSearchParams } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Gift, Check, Heart } from "lucide-react";

const giftPackages = [
  {
    name: "Hope Session",
    description: "Gift one therapy session to someone you care about.",
    numberOfSessions: 1,
    amount: 2000,
  },
  {
    name: "Healing Package",
    description: "Gift three therapy sessions for deeper support.",
    numberOfSessions: 3,
    amount: 5500,
  },
  {
    name: "Restoration Package",
    description: "Gift five therapy sessions for a longer healing journey.",
    numberOfSessions: 5,
    amount: 9000,
  },
];

function GiftSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const therapistId = searchParams.get("therapistId") || "";

  const [selectedPackage, setSelectedPackage] = useState(giftPackages[0]);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGiftSession(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    if (!recipientName || !recipientEmail) {
      alert("Please enter recipient name and email.");
      return;
    }

    setLoading(true);

    try {
      const giftRef = await addDoc(collection(db, "giftSessions"), {
		therapistId,
        giftType: therapistId ? "specific_therapist" : "general_credit",
        senderId: user.uid,
        senderEmail: user.email || "",
        senderName: user.displayName || "",

        recipientName,
        recipientEmail: recipientEmail.toLowerCase().trim(),

        message,
        anonymous,

        packageName: selectedPackage.name,
        packageDescription: selectedPackage.description,
        numberOfSessions: selectedPackage.numberOfSessions,
        remainingSessions: selectedPackage.numberOfSessions,

        amount: selectedPackage.amount,
        currency: "KES",

        status: "pending_payment",
        paymentStatus: "unpaid",
        redeemedBy: "",
        redeemedAt: null,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Gift session created. Continue to payment.");

      router.push(`/payment/gift/${giftRef.id}`);
    } catch (error: any) {
      console.error("Gift session error:", error);
      alert(error.message || "Could not create gift session.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-8 text-white md:p-12">
          <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
          <div className="animate-blob pointer-events-none absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-[#E2954E]/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white">
              <Gift className="h-4 w-4" /> Gift Therapy
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
              Gift someone a safe space to heal
            </h1>

            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/90 md:text-lg">
              Send a therapy session or healing package to someone you care
              about. They will be able to redeem the gift and choose a therapist
              when they are ready.
            </p>
          </div>
        </section>

        <form
          onSubmit={handleGiftSession}
          className="mt-8 rounded-xl border border-[#0F4C5C]/10 bg-white p-6 shadow-sm md:p-10"
        >
          <span className="eyebrow">Step 1</span>
          <h2 className="mt-3 text-2xl font-bold text-[#0F4C5C]">
            Choose a healing gift
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {giftPackages.map((giftPackage) => {
              const selected = selectedPackage.name === giftPackage.name;
              return (
                <button
                  key={giftPackage.name}
                  type="button"
                  onClick={() => setSelectedPackage(giftPackage)}
                  className={`relative rounded-xl border-2 p-6 text-left transition duration-300 ${
                    selected
                      ? "-translate-y-1 border-[#0F4C5C] bg-[#0F4C5C]/5 shadow-lg"
                      : "border-transparent bg-white shadow-[0_10px_30px_-18px_rgba(15,76,92,0.3)] hover:-translate-y-1 hover:border-[#0F4C5C]/30"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                      selected
                        ? "bg-[#0F4C5C] text-white"
                        : "bg-[#E2954E]/12 text-[#E2954E]"
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </span>

                  {selected && (
                    <span className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#0F4C5C] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  )}

                  <h3 className="mt-4 text-xl font-bold text-[#0F4C5C]">
                    {giftPackage.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                    {giftPackage.description}
                  </p>

                  <p className="mt-5 text-2xl font-bold text-[#0F4C5C]">
                    KES {giftPackage.amount}
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-600">
                    {giftPackage.numberOfSessions} session
                    {giftPackage.numberOfSessions > 1 ? "s" : ""}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />

            <input
              type="email"
              placeholder="Recipient email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />
          </div>

          <textarea
            rows={5}
            placeholder="Optional personal message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-5 w-full rounded-xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
          />

          <label className="mt-5 flex items-center gap-3 rounded-xl bg-[#F7F3EC] p-4 font-semibold text-gray-900">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Send this gift anonymously
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Gift..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </main>
  );
}
export default function GiftSessionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white p-10">Loading gift page...</div>}>
      <GiftSessionContent />
    </Suspense>
  );
}