
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function MyHealingCirclesPage() {
  const [circles, setCircles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCircles() {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const circlesQuery = query(
          collection(db, "healingCircles"),
          where("creatorId", "==", user.uid)
        );

        const circlesSnap = await getDocs(circlesQuery);

        setCircles(
          circlesSnap.docs.map((docItem) => ({
            id: docItem.id,
            ...docItem.data(),
          }))
        );
      } catch (error) {
        console.error("Error loading circles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCircles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10 text-[#0F4C5C]">
        Loading healing circles...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">

          <p className="mb-3 font-bold uppercase tracking-wide">
            Community Healing
          </p>

          <h1 className="text-4xl font-bold">
            My Healing Circles
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8">
            Track circles you created, monitor contributions,
            and share links with family and friends.
          </p>

        </section>

        {circles.length === 0 ? (
          <section className="mt-8 rounded-3xl bg-white p-10 text-center shadow-lg">

            <h2 className="text-3xl font-bold text-[#0F4C5C]">
              No Healing Circles Yet
            </h2>

            <p className="mt-4 text-gray-700">
              Start a community-funded healing journey for someone you care about.
            </p>

            <Link
              href="/healing-circle"
              className="mt-8 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white hover:bg-[#0b3945]"
            >
              Start a Healing Circle
            </Link>

          </section>
        ) : (
          <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {circles.map((circle) => {
              const progress =
                ((circle.currentAmount || 0) /
                  (circle.targetAmount || 1)) *
                100;

              return (
                <article
                  key={circle.id}
                  className="rounded-3xl bg-white p-6 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-[#0F4C5C]">
                    ❤️ {circle.packageName}
                  </h2>

                  <p className="mt-3 font-semibold text-gray-700">
                    Supporting {circle.recipientName}
                  </p>

                  <p className="mt-5 text-gray-700">
                    Raised:
                    <strong>
                      {" "}
                      KES {circle.currentAmount || 0}
                    </strong>
                  </p>

                  <p className="mt-2 text-gray-700">
                    Goal:
                    <strong>
                      {" "}
                      KES {circle.targetAmount}
                    </strong>
                  </p>

                  <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-[#0F4C5C]"
                      style={{
                        width: `${Math.min(progress, 100)}%`,
                      }}
                    />
                  </div>

                  <p className="mt-4 font-bold text-[#0F4C5C]">
                    {progress.toFixed(0)}% funded
                  </p>

                  <div className="mt-6 flex gap-3">

                    <Link
                      href={`/healing-circle/${circle.id}`}
                      className="flex-1 rounded-full border-2 border-[#0F4C5C] px-4 py-3 text-center font-bold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
                    >
                      View Circle
                    </Link>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/healing-circle/${circle.id}`
                        );

                        alert("Link copied successfully.");
                      }}
                      className="flex-1 rounded-full bg-[#0F4C5C] px-4 py-3 font-bold text-white hover:bg-[#0b3945]"
                    >
                      Copy Link
                    </button>

                  </div>
                </article>
              );
            })}

          </section>
        )}
      </div>
    </main>
  );
}

