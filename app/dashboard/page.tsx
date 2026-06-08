"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      if (!user.emailVerified) {
        await signOut(auth);
        router.push("/verify-email");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  if (loading) {
    return <div className="p-10">Loading dashboard...</div>;
  }

  return (
    <DashboardLayout
      userName={userData?.fullName}
      role={userData?.role}
      onLogout={handleLogout}
    >
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Welcome to MyDeepTalk</h1>
        <p className="mt-4 text-lg text-white/80">
          Supporting emotional wellness, healing, self-discovery and meaningful
          connection.
        </p>
      </div>

      {userData?.role === "client" && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">
                Find a Therapist
              </h2>
              <p className="mt-3 text-gray-600">
                Browse verified therapists by gender, language, specialty and
                experience.
              </p>

              <Link
                href="/therapists"
                className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 text-white hover:bg-[#0b3945]"
              >
                Find Therapist
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">My Bookings</h2>
              <p className="mt-3 text-gray-600">
                View your upcoming therapy sessions, booking status and payment
                details.
              </p>

              <Link
                href="/my-bookings"
                className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                View Bookings
              </Link>
            </div>
          </div>

          <WellnessTools />
        </>
      )}

      {userData?.role === "therapist" && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">Profile</h2>
              <p className="mt-3 text-gray-600">
                Complete your therapist profile so clients can discover and
                understand your work.
              </p>

              <Link
                href="/therapist-profile"
                className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 text-white hover:bg-[#0b3945]"
              >
                Complete Profile
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">
                Credentials
              </h2>
              <p className="mt-3 text-gray-600">
                Upload your license, certificate, photo and professional
                documents for verification.
              </p>

              <Link
                href="/therapist-credentials"
                className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                Upload
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">
                Availability
              </h2>
              <p className="mt-3 text-gray-600">
                Set your available days and times so clients can book suitable
                sessions.
              </p>

              <Link
                href="/therapist-availability"
                className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                Set Availability
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">Bookings</h2>
              <p className="mt-3 text-gray-600">
                View client bookings, session status and upcoming appointments.
              </p>

              <Link
                href="/my-bookings"
                className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                View Bookings
              </Link>

              <Link
                href="/therapist-bookings"
                className="ml-0 mt-4 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white lg:ml-0"
              >
                Manage Bookings
              </Link>
            </div>
          </div>

          <WellnessTools />
        </>
      )}

      {userData?.role === "admin" && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">
                Therapist Approvals
              </h2>
              <p className="mt-3 text-gray-600">
                Review therapist profiles, credentials and approval status before
                they appear publicly.
              </p>

              <Link
                href="/admin-therapists"
                className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 text-white hover:bg-[#0b3945]"
              >
                Review Therapists
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
              <h2 className="text-xl font-bold text-[#0F4C5C]">
                Assessment Analytics
              </h2>
              <p className="mt-3 text-gray-600">
                View self-assessment results, growth areas, anonymous check-ins
                and support trends.
              </p>

              <Link
                href="/admin-assessments"
                className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                View Analytics
              </Link>
            </div>
          </div>

          <WellnessTools />
        </>
      )}
    </DashboardLayout>
  );
}

function WellnessTools() {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-[#0F4C5C]">Wellness Tools</h2>

      <p className="mt-2 text-gray-600">
        Continue your self-discovery journey with private reflection and
        emotional check-ins.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Link
          href="/journal"
          className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-5xl">📖</div>

          <h3 className="mt-4 text-2xl font-bold text-[#0F4C5C]">
            My Journal
          </h3>

          <p className="mt-3 leading-7 text-gray-600">
            Record your thoughts, emotions and reflections in a safe and private
            space.
          </p>

          <div className="mt-6 font-semibold text-[#0F4C5C]">
            Open Journal →
          </div>
        </Link>

        <Link
          href="/self-assessment"
          className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-5xl">🧠</div>

          <h3 className="mt-4 text-2xl font-bold text-[#0F4C5C]">
            Self-Discovery Check-In
          </h3>

          <p className="mt-3 leading-7 text-gray-600">
            Understand your emotional wellbeing and identify areas where you may
            need support.
          </p>

          <div className="mt-6 font-semibold text-[#0F4C5C]">
            Start Assessment →
          </div>
        </Link>
      </div>
    </div>
  );
}