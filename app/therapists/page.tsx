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
import {
  BadgeCheck,
  Star,
  Briefcase,
  Languages,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

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
  offersPhysicalSessions?: boolean;
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
		
		const preferredLanguage = String(
          intakeData?.therapistPreferences?.language || ""
        )
          .trim()
          .toLowerCase();
		  
		const preferredSessionMode = String(
  intakeData?.therapistPreferences?.sessionMode || ""
)
  .trim()
  .toLowerCase();

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

  if (
    preferredGender &&
    therapistGender !== preferredGender
  ) {
    return false;
  }

  if (preferredLanguage) {
    const therapistLanguages =
      therapist.languages?.map((language) =>
        language.toLowerCase()
      ) ?? [];

    if (!therapistLanguages.includes(preferredLanguage)) {
      return false;
    }
  }
   if (
  preferredSessionMode === "in person" &&
  !therapist.offersPhysicalSessions
) {
  return false;
}
  

  return true;
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
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Our Therapists"
        subtitle="Browse verified therapists, explore their specialties, and book a private online session when you are ready for deeper support."
        crumbs={[{ label: "Find a Therapist" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="card-soft animate-pulse p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-[#0F4C5C]/8" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-[#0F4C5C]/8" />
                    <div className="h-3 w-1/2 rounded bg-[#0F4C5C]/8" />
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <div className="h-3 w-full rounded bg-[#0F4C5C]/8" />
                  <div className="h-3 w-5/6 rounded bg-[#0F4C5C]/8" />
                  <div className="h-3 w-2/3 rounded bg-[#0F4C5C]/8" />
                </div>
              </div>
            ))}
          </div>
        ) : therapists.length === 0 ? (
          <section className="card-soft mt-10 p-8 text-center md:p-10">
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
                href="/assessments"
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
                  className="card-soft flex h-full flex-col p-6"
                >
                  <div className="mb-5 flex items-center gap-4">
                    {therapist.profilePhoto ? (
                      <img
                        src={therapist.profilePhoto}
                        alt={therapist.fullName || "Therapist"}
                        className="h-20 w-20 rounded-full object-cover shadow ring-2 ring-[#0F4C5C]/10"
                        style={{
                          objectPosition: `${
                            therapist.photoPositionX ?? 50
                          }% ${therapist.photoPositionY ?? 50}%`,
                        }}
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0F4C5C]/8 text-2xl font-bold text-[#0F4C5C] shadow ring-2 ring-[#0F4C5C]/10">
                        {therapist.fullName?.charAt(0)?.toUpperCase() || "T"}
                      </div>
                    )}

                    <div>
                      <h2 className="text-xl font-bold text-[#0F4C5C]">
                        {therapist.fullName || "Verified Therapist"}
                      </h2>

                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#2C7A7B]/12 px-3 py-1 text-xs font-bold text-[#2C7A7B]">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified Therapist
                      </span>
                    </div>
                  </div>

                  {therapist.reviewCount && therapist.reviewCount > 0 ? (
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-[#E2954E] text-[#E2954E]" />
                      <span className="font-bold text-[#0F4C5C]">
                        {therapist.averageRating?.toFixed(1)}
                      </span>
                      <span className="text-sm font-semibold text-gray-500">
                        ({therapist.reviewCount} reviews)
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-gray-500">
                      No reviews yet
                    </p>
                  )}

                  <p className="mt-4 line-clamp-3 leading-7 text-gray-600">
                    {therapist.bio ||
                      "A verified therapist ready to support your emotional wellness journey."}
                  </p>

                  <div className="mt-5 space-y-2.5 text-sm text-gray-700">
                    <p className="flex items-center gap-2.5">
                      <Briefcase className="h-4 w-4 shrink-0 text-[#0F4C5C]" />
                      {therapist.yearsExperience || 0} years experience
                    </p>

                    <p className="flex items-center gap-2.5">
                      <Languages className="h-4 w-4 shrink-0 text-[#0F4C5C]" />
                      {therapist.languages?.length
                        ? therapist.languages.join(", ")
                        : "Languages not specified"}
                    </p>

                    <p className="flex items-start gap-2.5">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#0F4C5C]" />
                      <span>
                        {therapist.specialties?.length
                          ? therapist.specialties.join(", ")
                          : "Specialties not specified"}
                      </span>
                    </p>

                    <p className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 shrink-0 text-[#0F4C5C]" />
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
                     className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0F4C5C] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#0b3945]"
                  >
                     Book
                     <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
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