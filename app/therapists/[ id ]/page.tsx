"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

type Therapist = {
  fullName?: string;
  bio?: string;
  specialties?: string[];
  languages?: string[];
  yearsExperience?: number;
  sessionFee?: number;
  country?: string;
  city?: string;
};

type Review = {
  rating: number;
  comment: string;
  therapistName?: string;
};

export default function TherapistProfilePage() {
  const params = useParams();
  const therapistId = params.id as string;

  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Therapist
        const therapistRef = doc(db, "therapists", therapistId);
        const therapistSnap = await getDoc(therapistRef);

        if (therapistSnap.exists()) {
          setTherapist(therapistSnap.data() as Therapist);
        }

        // Reviews
        const reviewsSnap = await getDocs(collection(db, "reviews"));

        const therapistReviews = reviewsSnap.docs
          .map((doc) => doc.data() as Review)
          .filter(
            (review: any) =>
              review.therapistId === therapistId
          );

        setReviews(therapistReviews);

        if (therapistReviews.length > 0) {
          const avg =
            therapistReviews.reduce(
              (sum, review) => sum + review.rating,
              0
            ) / therapistReviews.length;

          setAverageRating(avg);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [therapistId]);

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!therapist) {
    return (
      <main className="p-6">
        <p>Therapist not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">

        <div className="bg-white rounded-xl shadow p-8">

          <h1 className="text-4xl font-bold">
            {therapist.fullName}
          </h1>

          <div className="mt-3">
            {reviews.length > 0 ? (
              <>
                <p className="text-yellow-500 font-bold text-xl">
                  ⭐ {averageRating.toFixed(1)}
                </p>

                <p className="text-gray-500">
                  {reviews.length} reviews
                </p>
              </>
            ) : (
              <p className="text-gray-400">
                No reviews yet
              </p>
            )}
          </div>

          <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-3">
              About
            </h2>

            <p className="text-gray-700">
              {therapist.bio}
            </p>

          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Specialties
              </h3>

              <p>
                {therapist.specialties?.join(", ")}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Languages
              </h3>

              <p>
                {therapist.languages?.join(", ")}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Experience
              </h3>

              <p>
                {therapist.yearsExperience} years
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Session Fee
              </h3>

              <p>
                KES {therapist.sessionFee}
              </p>
            </div>

          </div>

          <div className="mt-10">
            <Link
              href={`/book-session/${therapistId}`}
              className="bg-blue-600 text-white px-6 py-3 rounded"
            >
              Book Session
            </Link>
          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Client Reviews
          </h2>

          <div className="space-y-4">

            {reviews.length === 0 ? (
              <div className="bg-white p-5 rounded-xl shadow">
                No reviews yet.
              </div>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <p className="text-yellow-500 font-bold">
                    {"⭐".repeat(review.rating)}
                  </p>

                  <p className="mt-3 text-gray-700">
                    {review.comment}
                  </p>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </main>
  );
}