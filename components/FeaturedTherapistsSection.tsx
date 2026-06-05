"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FeaturedTherapistsSection() {
  const [therapists, setTherapists] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTherapists() {
      const q = query(
        collection(db, "therapists"),
        where("status", "==", "approved"),
        limit(3)
      );

      const snapshot = await getDocs(q);

      const list: any[] = [];

      snapshot.forEach((docItem) => {
        list.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setTherapists(list);
    }

    fetchTherapists();
  }, []);

  return (
    <section className="px-8 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <p className="font-semibold text-[#E2954E]">
            Verified Support
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Featured Therapists
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Connect with approved professionals ready to support your
            emotional wellness journey.
          </p>
        </div>

        {therapists.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="text-gray-600">
              Featured therapists will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">

            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Photo */}

                <div className="mb-6 flex items-center gap-4">

                  {therapist.photoUrl ? (
                    <img
                      src={therapist.photoUrl}
                      alt={therapist.fullName}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E2954E]/20 text-xl font-bold text-[#0F4C5C]">
                      {therapist.fullName?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-bold text-[#0F4C5C]">
                      {therapist.fullName}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {therapist.city}, {therapist.country}
                    </p>
                  </div>
                </div>

                {/* Bio */}

                <p className="line-clamp-3 text-gray-600">
                  {therapist.bio}
                </p>

                {/* Specialties */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {Array.isArray(therapist.specialties) &&
                    therapist.specialties
                      .slice(0, 3)
                      .map((item: string) => (
                        <span
                          key={item}
                          className="rounded-full bg-[#F7F3EC] px-3 py-1 text-xs text-[#0F4C5C]"
                        >
                          {item}
                        </span>
                      ))}

                </div>

                {/* Buttons */}

                <div className="mt-8 flex gap-3">

                  <Link
                    href={`/therapists/${therapist.id}`}
                    className="flex-1 rounded-full border border-[#0F4C5C] px-4 py-3 text-center text-sm font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
                  >
                    View
                  </Link>

                  <Link
                    href={`/book-session/${therapist.id}`}
                    className="flex-1 rounded-full bg-[#0F4C5C] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0b3945]"
                  >
                    Book
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