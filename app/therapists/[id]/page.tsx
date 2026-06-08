"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

type Therapist = {
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
};

type Review = {
  therapistId?: string;
  rating: number;
  comment: string;
  therapistName?: string;
};

export default function TherapistProfilePage() {
  const params = useParams();
  console.log("params =", params);
  const therapistId = Array.isArray(params.id)
  ? params.id[0]
  : params.id;
  console.log("therapistId =", therapistId);

  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
		  
		if (!therapistId) {
          console.error("No therapistId found in route params:", params);
          setLoading(false);
          return;
        }
		
        console.log("Looking for therapist:", therapistId);

        const therapistRef = doc(db, "therapists", therapistId);

        const therapistSnap = await getDoc(therapistRef);

        console.log("Document exists?", therapistSnap.exists());

        if (therapistSnap.exists()) {
          console.log("Data =", therapistSnap.data());
          setTherapist(therapistSnap.data() as Therapist);
        }
		
	

        if (therapistSnap.exists()) {
          setTherapist(therapistSnap.data() as Therapist);
        }

        console.log("Firestore doc exists:", therapistSnap.exists());
        console.log("Document ID:", therapistId);
		
        const reviewsSnap = await getDocs(collection(db, "reviews"));

        const therapistReviews = reviewsSnap.docs
          .map((doc) => doc.data() as Review)
          .filter((review) => review.therapistId === therapistId);

        setReviews(therapistReviews);

        if (therapistReviews.length > 0) {
          const avg =
            therapistReviews.reduce((sum, review) => sum + review.rating, 0) /
            therapistReviews.length;

          setAverageRating(avg);
        }
      } catch (error) {
        console.error("Error loading therapist profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [therapistId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!therapist) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p>Therapist not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-8 shadow-lg md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {therapist.profilePhoto ? (
              <img
                src={therapist.profilePhoto}
                alt={therapist.fullName || "Therapist"}
                className="h-40 w-40 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#F7F3EC] text-5xl font-bold text-[#0F4C5C] shadow-lg">
                {therapist.fullName?.charAt(0)?.toUpperCase() || "T"}
              </div>
            )}

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-bold text-[#0F4C5C]">
                  {therapist.fullName || "Therapist"}
                </h1>

                {therapist.status === "approved" && (
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    ✓ Verified Therapist
                  </span>
                )}
              </div>

              <div className="mt-4">
                {reviews.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xl font-bold text-yellow-500">
                      ⭐ {averageRating.toFixed(1)}
                    </p>

                    <p className="text-gray-500">
                      {reviews.length} review{reviews.length === 1 ? "" : "s"}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">No reviews yet</p>
                )}
              </div>

              <p className="mt-4 text-gray-600">
                {[therapist.city, therapist.country].filter(Boolean).join(", ") ||
                  "Online"}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/book-session/${therapistId}`}
                  className="rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white hover:bg-[#0b3945]"
                >
                  Book Session
                </Link>

                <Link
                  href="/therapists"
                  className="rounded-full border border-[#0F4C5C] px-6 py-3 font-semibold text-[#0F4C5C]"
                >
                  Back to Therapists
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-3 text-2xl font-semibold text-[#0F4C5C]">
              About
            </h2>

            <p className="leading-7 text-gray-700">
              {therapist.bio || "No bio provided yet."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <InfoCard
              title="Specialties"
              value={
                therapist.specialties?.length
                  ? therapist.specialties.join(", ")
                  : "Not specified"
              }
            />

            <InfoCard
              title="Languages"
              value={
                therapist.languages?.length
                  ? therapist.languages.join(", ")
                  : "Not specified"
              }
            />

            <InfoCard
              title="Experience"
              value={`${therapist.yearsExperience || 0} years`}
            />

            <InfoCard
              title="Session Fee"
              value={`KES ${therapist.sessionFee || 0}`}
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-3xl font-bold text-[#0F4C5C]">
            Client Reviews
          </h2>

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="rounded-2xl bg-white p-6 shadow">
                <p className="text-gray-600">No reviews yet.</p>
              </div>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="rounded-2xl bg-white p-6 shadow">
                  <p className="font-bold text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </p>

                  <p className="mt-3 text-gray-700">
                    {review.comment || "No comment provided."}
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

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F7F3EC] p-6">
      <h3 className="mb-2 text-lg font-semibold text-[#0F4C5C]">{title}</h3>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}