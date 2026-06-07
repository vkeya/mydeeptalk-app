"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

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
        const therapistsSnap = await getDocs(
          collection(db, "therapists")
        );

        const reviewsSnap = await getDocs(
          collection(db, "reviews")
        );

        const reviews = reviewsSnap.docs.map(
          (doc) => doc.data()
        ) as Review[];

        const therapistList = therapistsSnap.docs.map((doc) => {
          const therapist = {
            id: doc.id,
            ...doc.data(),
          } as Therapist;

          const therapistReviews = reviews.filter(
            (review) =>
              review.therapistId === therapist.id
          );

          const reviewCount = therapistReviews.length;

          const averageRating =
            reviewCount > 0
              ? therapistReviews.reduce(
                  (sum, review) =>
                    sum + review.rating,
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
          (a, b) =>
            (b.averageRating || 0) -
            (a.averageRating || 0)
        );

        setTherapists(therapistList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTherapists();
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading therapists...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">
          Find a Therapist
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {therapists.map((therapist) => (
            <div
              key={therapist.id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <h2 className="text-2xl font-bold">
                {therapist.fullName}
              </h2>

              <div className="mt-2">
                {therapist.reviewCount! > 0 ? (
                  <>
                    <p className="font-semibold text-yellow-500">
                      ⭐ {therapist.averageRating?.toFixed(1)}
                    </p>

                    <p className="text-sm text-gray-500">
                      ({therapist.reviewCount} reviews)
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">
                    No reviews yet
                  </p>
                )}
              </div>

              <p className="mt-4 text-gray-600">
                {therapist.bio}
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Experience:</strong>{" "}
                  {therapist.yearsExperience} years
                </p>

                <p>
                  <strong>Languages:</strong>{" "}
                  {therapist.languages?.join(", ")}
                </p>

                <p>
                  <strong>Fee:</strong> KES{" "}
                  {therapist.sessionFee}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/therapists/${therapist.id}`}
                  className="rounded bg-gray-700 px-4 py-2 text-white"
                >
                  View Profile
                </Link>

                <Link
                  href={`/book-session/${therapist.id}`}
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Book Session
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}