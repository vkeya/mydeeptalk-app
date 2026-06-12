"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ContributionPaymentPage() {
  const params = useParams();

  const contributionId = params.contributionId as string;

  const [contribution, setContribution] = useState<any>(null);

  useEffect(() => {
    async function fetchContribution() {
      try {
        const snap = await getDoc(
          doc(db, "healingCircleContributions", contributionId)
        );

        if (snap.exists()) {
          setContribution({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (contributionId) {
      fetchContribution();
    }
  }, [contributionId]);

  if (!contribution) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading contribution...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            ❤️ Complete Contribution
          </h1>

          <p className="mt-4">
            Thank you for supporting someone's healing journey.
          </p>

        </section>

        <section className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Contribution Summary
          </h2>

          <div className="mt-6 space-y-4">

            <p>
              <strong>Name:</strong> {contribution.contributorName}
            </p>

            <p>
              <strong>Amount:</strong> KES {contribution.amount}
            </p>

            <p>
              <strong>Status:</strong> {contribution.paymentStatus}
            </p>

          </div>

          <div className="mt-10">
            {/* Existing IntaSend payment button goes here */}
          </div>

        </section>

      </div>
    </main>
  );
}