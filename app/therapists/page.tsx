"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Therapist = {
  id: string;
  fullName?: string;
  gender?: string;
  bio?: string;
  specialties?: string[];
  languages?: string[];
  yearsExperience?: number;
  sessionFee?: number;
  feeCurrency?: string;
  currency?: string;
  country?: string;
  city?: string;
  status?: string;
  profilePhoto?: string;
  photoPositionX?: number;
  photoPositionY?: number;
  averageRating?: number;
  reviewCount?: number;
};

type Review = {
  therapistId: string;
  rating: number;
};

function normalizeGender(value: any) {
  const text = String(value || "").trim().toLowerCase();

  if (
    text.includes("no preference") ||
    text.includes("any") ||
    text.includes("either")
  ) {
    return "";
  }

  if (text.includes("female") || text.includes("woman")) {
    return "female";
  }

  if (text.includes("male") || text.includes("man")) {
    return "male";
  }

  return text;
}

export default function TherapistsPage() {
  const router = useRouter();

  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const intakeSnap = await getDoc(doc(db, "preBookingIntakes", user.uid));

        if (!intakeSnap.exists()) {
          router.push("/pre-booking-intake");
          return;
        }

        const intakeData = intakeSnap.data();

        const preferredGender = normalizeGender(
          intakeData?.therapistPreferences?.gender ||
            intakeData?.preferredGender ||
            intakeData?.therapistGender ||
            intakeData?.genderPreference ||
            intakeData?.preferredTherapistGender ||
            intakeData?.preferredTherapist ||
            intakeData?.gender ||
            ""
        );

        const therapistsQuery = query(
          collection(db, "therapists"),
          where("status", "==", "approved")
        );

        const therapistsSnap = await getDocs(therapistsQuery);
        const reviewsSnap = await getDocs(collection(db, "reviews"));

        const reviews = reviewsSnap.docs.map((docItem) =>
          docItem.data()
        ) as Review[];

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

        const filteredTherapists = therapistList.filter((therapist) => {
          const therapistGender = normalizeGender(therapist.gender);

          if (!preferredGender) {
            return true;
          }

          return therapistGender === preferredGender;
        });

        filteredTherapists.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );

        setTherapists(filteredTherapists);
      } catch (error) {
        console.error("Error loading therapists:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            MyDeepTalk Therapist Network
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Find Support That Fits Your Journey
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Browse verified therapists, explore their specialties, and book a
            private online session when you are ready for deeper support.
          </p>
        </section>

        {loading ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="font-bold text-[#0F4C5C]">
              Loading verified therapists...
            </p>
          </div>
        ) : therapists.length === 0 ? (
          <section className="mt-10 rounded-3xl bg-white p-8 text-center shadow-lg md:p-10">
            <p className="font-bold uppercase tracking-wide text-[#0F4C5C]">
              No matching therapists found
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
              We Could Not Find a Therapist Matching Your Preference Yet
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-8 text-gray-900">
              MyDeepTalk is carefully onboarding and verifying qualified
              professionals. You can update your preferences or begin with a
              free self-discovery check-in.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/pre-booking-intake"
                className="rounded-full bg-[#0F4C5C] px-6 py-3 font-bold text-white hover:bg-[#0b3945]"
              >
                Update Preferences
              </Link>

              <Link
                href="/self-assessment"
                className="rounded-full border-2 border-[#0F4C5C] bg-white px-6 py-3 font-bold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                Begin Free Check-In
              </Link>
            </div>
          </section>
        ) : (
          <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {therapists.map((therapist) => {
              const currency =
                therapist.feeCurrency || therapist.currency || "KES";

              return (
                <article
                  key={therapist.id}
                  className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-5 flex items-center gap-4">
                    {therapist.profilePhoto ? (
                      <img
                        src={therapist.profilePhoto}
                        alt={therapist.fullName || "Therapist"}
                        className="h-20 w-20 rounded-full object-cover shadow"
                        style={{
                          objectPosition: `${
                            therapist.photoPositionX ?? 50
                          }% ${therapist.photoPositionY ?? 50}%`,
                        }}
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F3EC] text-2xl font-bold text-[#0F4C5C] shadow">
                        {therapist.fullName?.charAt(0)?.toUpperCase() || "T"}
                      </div>
                    )}

                    <div>
                      <h2 className="text-2xl font-bold text-[#0F4C5C]">
                        {therapist.fullName || "Verified Therapist"}
                      </h2>

                      <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-gray-900">
                        ✓ Verified Therapist
                      </span>
                    </div>
                  </div>

                  {therapist.reviewCount && therapist.reviewCount > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#0F4C5C]">
                        ⭐ {therapist.averageRating?.toFixed(1)}
                      </p>

                      <p className="text-sm font-bold text-gray-900">
                        ({therapist.reviewCount} reviews)
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-gray-900">
                      No reviews yet
                    </p>
                  )}

                  <p className="mt-4 line-clamp-3 text-base font-semibold leading-7 text-gray-900">
                    {therapist.bio ||
                      "A verified therapist ready to support your emotional wellness journey."}
                  </p>

                  <div className="mt-5 space-y-2 text-sm font-semibold text-gray-900">
                    <p>
                      <strong>Gender:</strong>{" "}
                      {therapist.gender || "Not specified"}
                    </p>

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

                    <p className="pt-2 text-lg font-bold text-[#0F4C5C]">
                      {therapist.sessionFee
                        ? `${currency} ${therapist.sessionFee}`
                        : "Fee not specified"}
                    </p>
                  </div>

                  <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-3">
                  <Link
                     href={`/therapist/${therapist.id}`}
                     className="rounded-full border-2 border-[#0F4C5C] bg-white px-4 py-3 text-center text-sm font-bold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
                  >
                     View
                  </Link>

                  <Link
                     href={`/book-session/${therapist.id}`}
                     className="rounded-full bg-[#0F4C5C] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#0b3945]"
                  >
                     Book
                  </Link>

                  <Link
                     href={`/gift-session?therapistId=${therapist.id}`}
                     className="rounded-full bg-[#F7F3EC] px-4 py-3 text-center text-sm font-bold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
                  >
                     Gift
                    </Link>
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