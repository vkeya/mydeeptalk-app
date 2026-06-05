"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReviewForm from "@/components/ReviewForm";
import TherapistReviews from "@/components/TherapistReviews";

export default function TherapistDetailPage() {
  const params = useParams();
  const therapistId = params.id as string;

  const [therapist, setTherapist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTherapist() {
      try {
        const therapistRef = doc(db, "therapists", therapistId);
        const therapistSnap = await getDoc(therapistRef);

        if (therapistSnap.exists()) {
          setTherapist({
            id: therapistSnap.id,
            ...therapistSnap.data(),
          });
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    if (therapistId) {
      fetchTherapist();
    }
  }, [therapistId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading therapist...
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Therapist not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            {therapist.photoUrl ? (
              <img
                src={therapist.photoUrl}
                alt={therapist.fullName}
                className="h-40 w-40 rounded-full object-cover shadow"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-[#E2954E]/20 text-6xl font-bold text-[#0F4C5C]">
                {therapist.fullName?.charAt(0)}
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#0F4C5C]">
                {therapist.fullName}
              </h1>

              <p className="mt-2 text-gray-500">
                {therapist.city}, {therapist.country}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {Array.isArray(therapist.specialties) &&
                  therapist.specialties.map((item: string) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#F7F3EC] px-4 py-2 text-sm text-[#0F4C5C]"
                    >
                      {item}
                    </span>
                  ))}
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[#F7F3EC] p-4">
                  <p className="text-sm text-gray-500">Experience</p>

                  <p className="text-xl font-bold text-[#0F4C5C]">
                    {therapist.yearsExperience} years
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F7F3EC] p-4">
                  <p className="text-sm text-gray-500">Session Fee</p>

                  <p className="text-xl font-bold text-[#0F4C5C]">
                    KES {therapist.sessionFee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">About</h2>

          <p className="mt-6 leading-8 text-gray-600">{therapist.bio}</p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">Languages</h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {Array.isArray(therapist.languages) &&
              therapist.languages.map((language: string) => (
                <span
                  key={language}
                  className="rounded-full border border-[#0F4C5C] px-4 py-2 text-[#0F4C5C]"
                >
                  {language}
                </span>
              ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold">
            Ready to Begin Your Healing Journey?
          </h2>

          <p className="mt-4 text-white/80">
            Schedule a session and take the first step toward emotional wellness.
          </p>

          <Link
            href={`/book-session/${therapist.id}`}
            className="mt-8 inline-block rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white hover:bg-[#d07f34]"
          >
            Book Session
          </Link>
        </div>

        <TherapistReviews therapistId={therapist.id} />

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Leave a Review
          </h2>

          <p className="mt-4 text-gray-600">
            Share your experience to help others find the right support.
          </p>

          <div className="mt-8">
            <ReviewForm therapistId={therapist.id} />
          </div>
        </div>
      </div>
    </div>
  );
}