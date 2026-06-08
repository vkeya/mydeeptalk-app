"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

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
        const therapistsSnap = await getDocs(collection(db, "therapists"));
        const reviewsSnap = await getDocs(collection(db, "reviews"));

        const reviews = reviewsSnap.docs.map((doc) => doc.data()) as Review[];

        const therapistList = therapistsSnap.docs.map((doc) => {
          const therapist = {
            id: doc.id,
            ...doc.data(),
          } as Therapist;

          const therapistReviews = reviews.filter(
            (review) => review.therapistId === therapist.id
          );

          const reviewCount = therapistReviews.length;

          const averageRating =
            reviewCount > 0
              ? therapistReviews.reduce((sum, review) => sum + review.rating, 0) /
                reviewCount
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

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p>Loading therapists...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#2C7A7B]">
            MyDeepTalk Therapist Network
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Find a Therapist
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Browse verified therapists, explore their specialties, read reviews,
            and book a private online session.
          </p>
        </div>

        {therapists.length === 0 ? (
          <div className="rounded-xl bg-white p-8 shadow">
            <p className="text-gray-600">No therapists available yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {therapists.map((therapist) => (
              <div
                key={therapist.id}
                className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
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
                      {therapist.fullName || "Therapist"}
                    </h2>

                    {therapist.status === "approved" && (
                      <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        ✓ Verified Therapist
                      </span>
                    )}
                  </div>
                </div>

                <div>
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
                </div>

                <p className="mt-4 line-clamp-3 text-gray-600">
                  {therapist.bio || "No bio provided yet."}
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
                    KES {therapist.sessionFee || 0}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/therapists/${therapist.id}`}
                    className="rounded-full bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
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