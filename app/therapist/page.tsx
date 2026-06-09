"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

type Therapist = {
  id: string;
  fullName?: string;
  bio?: string;
  specialties?: string[];
  languages?: string[];
  yearsExperience?: number;
  sessionFee?: number;
  country?: string;
  city?: string;
  status?: string;
  profilePhoto?: string;
  averageRating?: number;
  reviewCount?: number;
};

type Review = {
  therapistId: string;
  rating: number;
};

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTherapists() {
      try {
        const therapistsQuery = query(
          collection(db, "therapists"),
          where("status", "==", "approved")
        );

        const therapistsSnap = await getDocs(therapistsQuery);
        const reviewsSnap = await getDocs(collection(db, "reviews"));

        const reviews = reviewsSnap.docs.map((doc) => doc.data()) as Review[];

        const therapistList = therapistsSnap.docs.map((docItem) => {
          const therapist = {
            id: docItem.id,
            ...docItem.data(),
          } as Therapist;

          const therapistReviews = reviews.filter(
            (review) => review.therapistId === therapist.id
          );

          const reviewCount = therapistReviews.length;

          const averageRating =
            reviewCount > 0
              ? therapistReviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
                ) / reviewCount
              : 0;

          return {
            ...therapist,
            averageRating,
            reviewCount,
          };
        });

        therapistList.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );

        setTherapists(therapistList);
      } catch (error) {
        console.error("Error loading therapists:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTherapists();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#E2954E]">
            MyDeepTalk Therapist Network
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Find Support That Fits Your Journey
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-white/85">
            Browse verified therapists, explore their specialties, and book a
            private online session when you are ready for deeper support.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="text-gray-600">Loading verified therapists...</p>
          </div>
        ) : therapists.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#E2954E]">
              Therapist onboarding in progress
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
              We Are Building a Trusted Therapist Network
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
              MyDeepTalk is carefully onboarding and verifying qualified
              professionals before making them available for bookings. This
              helps us protect trust, safety, and quality.
            </p>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
              While therapist profiles are being reviewed, you can begin with a
              free self-discovery check-in and guided reflection.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/self-assessment"
                className="rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white hover:bg-[#0b3945]"
              >
                Begin Free Check-In
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
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                className="rounded-3xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center gap-4">
                  {therapist.profilePhoto ? (
                    <img
                      src={therapist.profilePhoto}
                      alt={therapist.fullName || "Therapist"}
                      className="h-20 w-20 rounded-full object-cover shadow"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F3EC] text-2xl font-bold text-[#0F4C5C] shadow">
                      {therapist.fullName?.charAt(0)?.toUpperCase() || "T"}
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {therapist.fullName || "Verified Therapist"}
                    </h2>

                    <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      ✓ Verified Therapist
                    </span>
                  </div>
                </div>

                {therapist.reviewCount && therapist.reviewCount > 0 ? (
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-yellow-500">
                      ⭐ {therapist.averageRating?.toFixed(1)}
                    </p>

                    <p className="text-sm text-gray-500">
                      ({therapist.reviewCount} reviews)
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No reviews yet</p>
                )}

                <p className="mt-4 line-clamp-3 text-gray-600">
                  {therapist.bio ||
                    "A verified therapist ready to support your emotional wellness journey."}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Experience:</strong>{" "}
                    {therapist.yearsExperience || 0} years
                  </p>

                  <p>
                    <strong>Languages:</strong>{" "}
                    {therapist.languages?.length
                      ? therapist.languages.join(", ")
                      : "Not specified"}
                  </p>

                  <p>
                    <strong>Specialties:</strong>{" "}
                    {therapist.specialties?.length
                      ? therapist.specialties.join(", ")
                      : "Not specified"}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {[therapist.city, therapist.country]
                      .filter(Boolean)
                      .join(", ") || "Online"}
                  </p>

                  <p className="text-base font-semibold text-[#0F4C5C]">
                    {therapist.sessionFee
                      ? `KES ${therapist.sessionFee}`
                      : "Fee not specified"}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/therapist/${therapist.id}`}
                    className="rounded-full border border-[#0F4C5C] px-4 py-2 text-sm font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
                  >
                    View Profile
                  </Link>

                  <Link
                    href={`/book-session/${therapist.id}`}
                    className="rounded-full bg-[#0F4C5C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b3945]"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}