"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function MyCreditsPage() {
  const [credits, setCredits] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const creditsSnap = await getDoc(
          doc(db, "therapyCredits", user.uid)
        );

        if (creditsSnap.exists()) {
          setCredits(creditsSnap.data());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading credits...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">

          <p className="font-bold uppercase tracking-wide">
            MyDeepTalk
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            ❤️ My Healing Credits
          </h1>

          <p className="mt-4 text-white/90">
            View gifted therapy sessions available for your healing journey.
          </p>

        </section>

        {!credits ? (
          <section className="mt-8 rounded-3xl bg-white p-10 text-center shadow-lg">

            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              No Healing Credits Yet
            </h2>

            <p className="mt-4 text-gray-700">
              You currently do not have any gifted therapy sessions.
            </p>

          </section>
        ) : (
          <section className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

            <div className="grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl bg-[#F7F3EC] p-6">
                <p className="text-gray-700">
                  Total Sessions
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
                  {credits.totalSessions}
                </h2>
              </div>

              <div className="rounded-2xl bg-[#F7F3EC] p-6">
                <p className="text-gray-700">
                  Remaining Sessions
                </p>

                <h2 className="mt-3 text-4xl font-bold text-green-700">
                  {credits.remainingSessions}
                </h2>
              </div>

              <div className="rounded-2xl bg-[#F7F3EC] p-6">
                <p className="text-gray-700">
                  Sessions Used
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
                  {credits.totalSessions - credits.remainingSessions}
                </h2>
              </div>

            </div>

            <div className="mt-10 rounded-3xl bg-[#F7F3EC] p-8">

              <h3 className="text-2xl font-bold text-[#0F4C5C]">
                ❤️ Your Healing Journey
              </h3>

              <p className="mt-4 text-gray-800 leading-8">
                Someone cared enough to invest in your healing and emotional
                wellbeing. These sessions are here to support you, one step
                at a time.
              </p>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}