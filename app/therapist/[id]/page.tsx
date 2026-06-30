"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

type SessionFees = {
  individual?: number;
  couple?: number;
  parentChild?: number;
  family?: number;
};

type Therapist = {
  fullName?: string;
  bio?: string;
  specialties?: string[];
  languages?: string[];
  yearsExperience?: number;
  sessionFee?: number;
  sessionFees?: SessionFees;
  sessionFeeCurrency?: "KES" | "USD";
  country?: string;
  city?: string;
  status?: string;
  profilePhoto?: string;
  photoPositionX?: number;
  photoPositionY?: number;
};

type Review = {
  therapistId?: string;
  clientAlias?: string;
  rating: number;
  comment: string;
  therapistName?: string;
};

export default function TherapistProfilePage() {
  const params = useParams();

  const therapistId = Array.isArray(params.id) ? params.id[0] : params.id;

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

        const therapistRef = doc(db, "therapists", therapistId);
        const therapistSnap = await getDoc(therapistRef);

        if (therapistSnap.exists()) {
  const data = therapistSnap.data();

  console.log("THERAPIST PROFILE DATA:", data);

  setTherapist(data as Therapist);
}
		
		console.log("Therapist data:", therapist);

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
  }, [therapistId, params]);

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

  const currency = therapist.sessionFeeCurrency || "KES";
  
  

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
                style={{
                  objectPosition: `${therapist.photoPositionX || 50}% ${
                    therapist.photoPositionY || 50
					}%`,
                }}
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

            <SessionFeesCard therapist={therapist} currency={currency} />
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
                  <p className="font-bold text-[#0F4C5C]">
                    {review.clientAlias || "Anonymous Client"}
                  </p>

                  <p className="mt-2 font-bold text-yellow-500">
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

function SessionFeesCard({
  therapist,
  currency,
}: {
  therapist: Therapist;
  currency: string;
}) {
  const fees = therapist.sessionFees;

  const hasNewFees =
    fees &&
    (fees.individual || fees.couple || fees.parentChild || fees.family);

  return (
    <div className="rounded-2xl bg-[#F7F3EC] p-6">
      <h3 className="mb-4 text-lg font-semibold text-[#0F4C5C]">
        Session Fees
      </h3>

      <div className="space-y-3">
        {hasNewFees ? (
          <>
            {fees?.individual ? (
              <FeeRow label="Individual Session" amount={fees.individual} currency={currency} />
            ) : null}

            {fees?.couple ? (
              <FeeRow label="Couple Session" amount={fees.couple} currency={currency} />
            ) : null}

            {fees?.parentChild ? (
              <FeeRow label="Parent + Child Session" amount={fees.parentChild} currency={currency} />
            ) : null}

            {fees?.family ? (
              <FeeRow label="Family Session" amount={fees.family} currency={currency} />
            ) : null}
          </>
        ) : (
          <FeeRow
            label="Session Fee"
            amount={therapist.sessionFee || 0}
            currency={currency}
          />
        )}
      </div>
    </div>
  );
}

function FeeRow({
  label,
  amount,
  currency,
}: {
  label: string;
  amount: number;
  currency: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="font-bold text-[#0F4C5C]">
        {currency} {amount.toLocaleString()}
      </span>
    </div>
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