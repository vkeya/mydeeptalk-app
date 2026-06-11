"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function GiftPaymentPage() {
  const params = useParams();

  const giftId = params.giftId as string;

  const [gift, setGift] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGift() {
      try {
        const giftRef = doc(db, "giftSessions", giftId);
        const giftSnap = await getDoc(giftRef);

        if (giftSnap.exists()) {
          setGift({
            id: giftSnap.id,
            ...giftSnap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (giftId) {
      fetchGift();
    }
  }, [giftId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading gift...
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Gift not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Complete Your Gift
          </h1>

          <p className="mt-4">
            You are gifting support and healing to someone you care about.
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            {gift.packageName}
          </h2>

          <div className="mt-6 space-y-3 text-gray-800">

            <p>
              <strong>Recipient:</strong> {gift.recipientName}
            </p>

            <p>
              <strong>Email:</strong> {gift.recipientEmail}
            </p>

            <p>
              <strong>Sessions:</strong> {gift.numberOfSessions}
            </p>

            <p>
              <strong>Amount:</strong> {gift.currency} {gift.amount}
            </p>

          </div>

          <button
            className="mt-10 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945]"
          >
            Pay With IntaSend
          </button>

        </section>

      </div>
    </main>
  );
}