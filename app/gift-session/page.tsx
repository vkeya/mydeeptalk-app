"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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

export default function GiftSessionPage() {
  const router = useRouter();

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
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Gift Therapy
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Gift Someone a Safe Space to Heal
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Send a therapy session or healing package to someone you care about.
            They will be able to redeem the gift and choose a therapist when
            they are ready.
          </p>
        </section>

        <form
          onSubmit={handleGiftSession}
          className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-10"
        >
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Choose a Healing Gift
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {giftPackages.map((giftPackage) => (
              <button
                key={giftPackage.name}
                type="button"
                onClick={() => setSelectedPackage(giftPackage)}
                className={`rounded-3xl border-2 p-6 text-left transition ${
                  selectedPackage.name === giftPackage.name
                    ? "border-[#0F4C5C] bg-[#F7F3EC]"
                    : "border-gray-200 bg-white hover:border-[#0F4C5C]"
                }`}
              >
                <h3 className="text-xl font-bold text-[#0F4C5C]">
                  {giftPackage.name}
                </h3>

                <p className="mt-3 text-sm font-semibold leading-6 text-gray-900">
                  {giftPackage.description}
                </p>

                <p className="mt-5 text-2xl font-bold text-[#0F4C5C]">
                  KES {giftPackage.amount}
                </p>

                <p className="mt-1 text-sm font-bold text-gray-700">
                  {giftPackage.numberOfSessions} session
                  {giftPackage.numberOfSessions > 1 ? "s" : ""}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />

            <input
              type="email"
              placeholder="Recipient email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />
          </div>

          <textarea
            rows={5}
            placeholder="Optional personal message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-5 w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
          />

          <label className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F7F3EC] p-4 font-semibold text-gray-900">
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