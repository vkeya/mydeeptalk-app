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
          Supporting emotional wellness, healing, self-discovery and meaningful connection.
        </p>
      </div>

      {userData?.role === "client" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
            <h2 className="text-xl font-bold text-[#0F4C5C]">Find a Therapist</h2>
            <p className="mt-3 text-gray-600">
              Browse verified therapists by gender, language, specialty and experience.
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
              View your upcoming therapy sessions, booking status and payment details.
            </p>

            <Link
              href="/my-bookings"
              className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
            >
              View Bookings
            </Link>
          </div>
        </div>
      )}

      {userData?.role === "therapist" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
            <h2 className="text-xl font-bold text-[#0F4C5C]">Profile</h2>
            <p className="mt-3 text-gray-600">
              Complete your therapist profile so clients can discover and understand your work.
            </p>

            <Link
              href="/therapist-profile"
              className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 text-white hover:bg-[#0b3945]"
            >
              Complete Profile
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
            <h2 className="text-xl font-bold text-[#0F4C5C]">Credentials</h2>
            <p className="mt-3 text-gray-600">
              Upload your license, certificate, photo and professional documents for verification.
            </p>

            <Link
              href="/therapist-credentials"
              className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
            >
              Upload
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
            <h2 className="text-xl font-bold text-[#0F4C5C]">Availability</h2>
            <p className="mt-3 text-gray-600">
              Set your available days and times so clients can book suitable sessions.
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
              className="mt-6 inline-block rounded-full border border-[#0F4C5C] px-6 py-3 text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
            >
              Manage Bookings
            </Link>
          </div>
        </div>
      )}

      {userData?.role === "admin" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl">
            <h2 className="text-xl font-bold text-[#0F4C5C]">
              Therapist Approvals
            </h2>
            <p className="mt-3 text-gray-600">
              Review therapist profiles, credentials and approval status before they appear publicly.
            </p>

            <Link
              href="/admin-therapists"
              className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 text-white hover:bg-[#0b3945]"
            >
              Review Therapists
            </Link>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}