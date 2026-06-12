"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export default function HealingCircleDetailsPage() {
  const params = useParams();

  const circleId = params.circleId as string;

  const [circle, setCircle] = useState<any>(null);
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCircle() {
      try {
        const circleSnap = await getDoc(doc(db, "healingCircles", circleId));

        if (circleSnap.exists()) {
          setCircle({
            id: circleSnap.id,
            ...circleSnap.data(),
          });
        }

        const contributionsQuery = query(
          collection(db, "healingCircleContributions"),
          where("circleId", "==", circleId)
        );

        const contributionsSnap = await getDocs(contributionsQuery);

        setContributors(
          contributionsSnap.docs.map((docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (circleId) {
      fetchCircle();
    }
  }, [circleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading Healing Circle...
      </div>
    );
  }

  if (!circle) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Healing Circle not found.
      </div>
    );
  }

  const progress =
    (circle.currentAmount / circle.targetAmount) * 100;

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">

          <h1 className="text-4xl font-bold">
            ❤️ Healing Circle
          </h1>

          <p className="mt-4">
            Supporting {circle.recipientName}'s healing journey.
          </p>

        </section>

        <section className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            {circle.packageName}
          </h2>

          <p className="mt-5 text-gray-700">
            Goal:
            <strong> KES {circle.targetAmount}</strong>
          </p>

          <p className="mt-2 text-gray-700">
            Raised:
            <strong> KES {circle.currentAmount}</strong>
          </p>

          <div className="mt-8 h-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#0F4C5C]"
              style={{
                width: `${Math.min(progress, 100)}%`,
              }}
            />
          </div>

          <p className="mt-4 font-semibold text-[#0F4C5C]">
            {progress.toFixed(0)}% funded
          </p>
		  
		  <div className="mt-8">
           <a
            href={`/contribute/${circle.id}`}
            className="inline-block rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white hover:bg-[#0b3945]"
           >
             ❤️ Contribute to this Circle
           </a>
         </div>

        </section>

        {contributors.length > 0 && (
          <section className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Contributors ❤️
            </h2>

            <div className="mt-6 space-y-4">

              {contributors.map((contributor) => (
                <div
                  key={contributor.id}
                  className="rounded-2xl bg-[#F7F3EC] p-5"
                >
                  <p className="font-bold text-[#0F4C5C]">
                    {contributor.anonymous
                      ? "Anonymous ❤️"
                      : contributor.contributorName}
                  </p>

                  <p className="mt-2 text-gray-700">
                    KES {contributor.amount}
                  </p>
                </div>
              ))}

            </div>

          </section>
        )}

      </div>
    </main>
  );
}