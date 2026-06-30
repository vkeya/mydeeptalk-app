"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Therapist = {
  id: string;
  fullName?: string;
  photoUrl?: string;
  city?: string;
  country?: string;
  bio?: string;
  specialties?: string[];
};

export default function FeaturedTherapistsSection() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTherapists() {
      try {
        const q = query(
          collection(db, "therapists"),
          where("status", "==", "approved"),
          limit(3)
        );

        const snapshot = await getDocs(q);

        const list: Therapist[] = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...(docItem.data() as Omit<Therapist, "id">),
        }));

        setTherapists(list);
      } catch (error) {
        console.error("Error fetching featured therapists:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTherapists();
  }, []);

  return (
    <section className="bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="font-semibold text-[#E2954E]">Verified Support</p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Connect With Human Support When You Need It
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            MyDeepTalk begins with self-discovery, but healing does not have to
            happen alone. Connect with approved professionals when deeper support
            is needed.
          </p>
        </div>

        {loading ? (
          <div className="rounded-xl border border-[#0F4C5C]/10 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600">Loading verified therapists...</p>
          </div>
        ) : therapists.length === 0 ? (
          <div className="rounded-xl border border-[#0F4C5C]/10 bg-white p-10 text-center shadow-sm">
            <p className="font-script text-2xl capitalize text-[#E2954E]">
              Therapist onboarding in progress
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#0F4C5C]">
              Building Our Verified Therapist Network
            </h3>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              We are carefully onboarding qualified professionals so that every
              therapist on MyDeepTalk meets the trust, care, and quality our
              users deserve.
            </p>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              While therapist profiles are being verified, you can begin with a
              gentle self-discovery check-in and guided reflection.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/self-assessment"
                className="rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white hover:bg-[#0b3945]"
              >
                Begin Self-Assessment
              </Link>

              <Link
                href="/for-therapists"
                className="rounded-full border border-[#0F4C5C] px-6 py-3 font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                Join as a Therapist
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                className="rounded-xl border border-[#0F4C5C]/10 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-6 flex items-center gap-4">
                  {therapist.photoUrl ? (
                    <img
                      src={therapist.photoUrl}
                      alt={therapist.fullName || "Therapist profile photo"}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E2954E]/20 text-xl font-bold text-[#0F4C5C]">
                      {therapist.fullName?.charAt(0) || "T"}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-[#0F4C5C]">
                      {therapist.fullName || "Verified Therapist"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {[therapist.city, therapist.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <p className="line-clamp-3 text-gray-600">
                  {therapist.bio ||
                    "A verified therapist ready to support your emotional wellness journey."}
                </p>

                {Array.isArray(therapist.specialties) &&
                  therapist.specialties.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {therapist.specialties.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-[#F7F3EC] px-3 py-1 text-xs text-[#0F4C5C]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                <div className="mt-8 flex gap-3">
                  <Link
                    href={`/therapist/${therapist.id}`}
                    className="flex-1 rounded-full border border-[#0F4C5C] px-4 py-3 text-center text-sm font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
                  >
                    View Profile
                  </Link>

                  <Link
                    href={`/book-session/${therapist.id}`}
                    className="flex-1 rounded-full bg-[#0F4C5C] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0b3945]"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/therapists"
            className="inline-block rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white hover:bg-[#0b3945]"
          >
            View All Therapists
          </Link>
        </div>
      </div>
    </section>
  );
}