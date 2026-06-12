"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContributePage() {
  const params = useParams();

  const circleId = params.circleId as string;

  const [contributorName, setContributorName] = useState("");
  const [contributorEmail, setContributorEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleContribution(e: React.FormEvent) {
    e.preventDefault();

    if (!contributorName || !contributorEmail || !amount) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const contributionRef = await addDoc(
        collection(db, "healingCircleContributions"),
        {
          circleId,

          contributorName,
          contributorEmail,

          amount: Number(amount),

          message,
          anonymous,

          paymentStatus: "unpaid",

          createdAt: serverTimestamp(),
        }
      );

      alert("Contribution created.");

      // Later we will redirect to IntaSend payment
      window.location.href = `/payment/contribution/${contributionRef.id}`;
    } catch (error) {
      console.error(error);
      alert("Unable to create contribution.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            ❤️ Contribute to a Healing Circle
          </h1>

          <p className="mt-4">
            Every contribution helps someone access support and healing.
          </p>
        </section>

        <form
          onSubmit={handleContribution}
          className="mt-8 rounded-3xl bg-white p-10 shadow-lg space-y-6"
        >
          <input
            type="text"
            placeholder="Your name"
            value={contributorName}
            onChange={(e) => setContributorName(e.target.value)}
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            type="email"
            placeholder="Your email"
            value={contributorEmail}
            onChange={(e) => setContributorEmail(e.target.value)}
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            type="number"
            placeholder="Contribution amount (KES)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-2xl border p-4"
            required
          />

          <textarea
            rows={4}
            placeholder="Encouraging message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-2xl border p-4"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Contribute anonymously ❤️
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white"
          >
            {loading ? "Creating..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </main>
  );
}