"use client";

import { useState } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function RedeemGiftPage() {
  const [email, setEmail] = useState("");
  const [gifts, setGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const giftsQuery = query(
        collection(db, "giftSessions"),
        where("recipientEmail", "==", email.toLowerCase().trim()),
        where("paymentStatus", "==", "paid")
      );

      const snapshot = await getDocs(giftsQuery);

      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGifts(results);
    } catch (error) {
      console.error(error);
      alert("Could not retrieve gifts.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Redeem a Therapy Gift
          </h1>

          <p className="mt-4">
            Someone may have gifted you support and healing.
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

          <form onSubmit={handleSearch}>

            <label className="mb-3 block font-bold text-[#0F4C5C]">
              Enter your email address
            </label>

            <input
              type="email"
              className="w-full rounded-2xl border border-gray-300 p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white"
            >
              {loading ? "Searching..." : "Find My Gifts"}
            </button>

          </form>

        </section>

        {gifts.length > 0 && (
          <section className="mt-8 space-y-6">

            {gifts.map((gift) => (
              <div
                key={gift.id}
                className="rounded-3xl bg-white p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-[#0F4C5C]">
                  {gift.packageName}
                </h2>

                <p className="mt-4 text-gray-700">
                  {gift.numberOfSessions} session
                  {gift.numberOfSessions > 1 ? "s" : ""}
                </p>

                {gift.message && (
                  <div className="mt-5 rounded-2xl bg-[#F7F3EC] p-5">
                    <p className="italic text-gray-800">
                      "{gift.message}"
                    </p>
                  </div>
                )}

                <Link
                  href={`/redeem-gift/${gift.id}`}
                  className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white"
                >
                  Redeem Gift
                </Link>
              </div>
            ))}

          </section>
        )}

      </div>
    </main>
  );
}