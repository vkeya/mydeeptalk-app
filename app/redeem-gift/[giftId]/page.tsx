"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export default function RedeemGiftDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const giftId = params.giftId as string;

  const [gift, setGift] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);

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

  async function handleRedeem() {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      router.push("/login");
      return;
    }
	
	if (gift.status === "redeemed") {
      alert("This gift has already been redeemed.");
      return;
    }

    if (gift.paymentStatus !== "paid") {
      alert("This gift has not been paid for yet.");
      return;
    }

    setRedeeming(true);

    try {
      await setDoc(doc(db, "therapyCredits", user.uid), {
		giftType: gift.giftType || "general_credit",
        therapistId: gift.therapistId || "",
        userId: user.uid,
        giftId,
        totalSessions: gift.numberOfSessions,
        remainingSessions: gift.remainingSessions,
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "giftSessions", giftId), {
        status: "redeemed",
        redeemedBy: user.uid,
        redeemedAt: serverTimestamp(),
      });

      alert("Gift redeemed successfully.");

      router.push("/therapists");
    } catch (error) {
      console.error(error);
      alert("Could not redeem gift.");
    } finally {
      setRedeeming(false);
    }
  }

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

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            Someone Gifted You Support ❤️
          </h1>

          <p className="mt-4">
            Healing is easier when we don't walk alone.
          </p>

        </section>

        <section className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            {gift.packageName}
          </h2>

          <div className="mt-6 space-y-3">

            <p>
              <strong>Sessions:</strong> {gift.numberOfSessions}
            </p>

            <p>
              <strong>Remaining Sessions:</strong> {gift.remainingSessions}
            </p>
			
			<p>
              <strong>Gift Type:</strong>{" "}
              {gift.giftType === "specific_therapist"
                ? "Specific therapist gift"
                : "General healing credit"}
            </p>

          </div>

          <div className="mt-8 rounded-2xl bg-[#F7F3EC] p-6">
            <h3 className="font-bold text-[#0F4C5C]">
               Gifted By
            </h3>

            <p className="mt-3 font-semibold text-gray-800">
               {gift.anonymous
                 ? "Someone who cares about you ❤️"
                 : gift.senderName || gift.senderEmail || "Someone who cares about you ❤️"}
            </p>

            {gift.message && (
             <>
               <h3 className="mt-6 font-bold text-[#0F4C5C]">
                  Personal Message
               </h3>

               <p className="mt-4 italic text-gray-700">
                 "{gift.message}"
               </p>
             </>
          )}
      </div>

          <button
            onClick={handleRedeem}
            disabled={redeeming}
            className="mt-10 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945]"
          >
            {redeeming
              ? "Redeeming Gift..."
              : "Accept Gift and Begin Healing"}
          </button>

        </section>

      </div>
    </main>
  );
}