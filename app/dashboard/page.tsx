"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardAnnouncement from "@/components/DashboardAnnouncement";

type DashboardCard = {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  primary?: boolean;
  icon: string;
};

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
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-10">
        <p className="font-bold text-[#0F4C5C]">Loading dashboard...</p>
      </main>
    );
  }

  const role = userData?.role;

  return (
    <DashboardLayout
      userName={userData?.alias || userData?.fullName}
      role={role}
      onLogout={handleLogout}
    >
      <section className="mb-10 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
        <p className="mb-3 font-bold uppercase tracking-wide text-white">
          MyDeepTalk Dashboard
        </p>

        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
          Welcome, {userData?.alias || userData?.fullName || "Friend"}
        </h1>

        <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
          Supporting emotional wellness, healing, self-discovery, and meaningful
          connection.
        </p>
      </section>
	  
	  <DashboardAnnouncement />

      {role === "client" && <ClientDashboard />}
      {role === "therapist" && <TherapistDashboard />}
      {role === "admin" && <AdminDashboard />}
    </DashboardLayout>
  );
}

function ClientDashboard() {
  const cards: DashboardCard[] = [
    {
      icon: "🧑‍⚕️",
      title: "Find a Therapist",
      description:
        "Answer a few preparation questions, then browse verified therapists by specialty, language, gender, experience, and availability.",
      href: "/pre-booking-intake",
      buttonText: "Start Booking",
      primary: true,
    },
    {
      icon: "📅",
      title: "My Sessions",
      description:
        "View your upcoming sessions, booking status, payment details, and session history.",
      href: "/my-bookings",
      buttonText: "View Sessions",
    },
	{
      icon: "🎁",
      title: "Gift Therapy",
      description:
       "Gift a therapy session or healing package to someone you care about.",
      href: "/gift-session",
      buttonText: "Gift a Session",
    },
	
    {
      icon: "🎁",
      title: "My Gifts & Credits",
      description:
       "View gifted therapy sessions available and track your healing journey.",
      href: "/my-credits",
      buttonText: "View Credits",
    },
	
	{
      icon: "❤️",
      title: "My Healing Circle",
      description:
        "Bring together family, friends, churches, or workplaces to support someone's healing journey through community-funded therapy.",
      href: "/healing-circle",
      buttonText: "Start a Circle",
    },
  ];

  return (
    <>
      <SectionTitle
        title="Your Healing Journey"
        description="Start with awareness, then connect with support when you need it."
      />

      <DashboardCardGrid cards={cards} />

      <WellnessTools />
    </>
  );
}

function TherapistDashboard() {
  const cards: DashboardCard[] = [
    {
      icon: "👤",
      title: "Profile",
      description:
        "Complete and update your professional profile so clients can understand your work.",
      href: "/therapist-profile",
      buttonText: "Update Profile",
      primary: true,
    },
    {
      icon: "📄",
      title: "Credentials",
      description:
        "Upload your license, certificate, profile photo, and professional documents for verification.",
      href: "/therapist-credentials",
      buttonText: "Upload Documents",
    },
    {
      icon: "🕒",
      title: "Availability",
      description:
        "Set your available days and time ranges so clients can book suitable sessions.",
      href: "/therapist-availability",
      buttonText: "Set Availability",
    },
    {
      icon: "📆",
      title: "Bookings",
      description:
        "Manage client bookings, session status, completed sessions, and earnings.",
      href: "/therapist-bookings",
      buttonText: "Manage Bookings",
    },
  ];

  return (
    <>
      <SectionTitle
        title="Professional Practice"
        description="Manage your profile, credentials, availability, and therapy sessions."
      />

      <DashboardCardGrid cards={cards} />

      <WellnessTools title="Personal Wellness" />
    </>
  );
}

function AdminDashboard() {
  const cards: DashboardCard[] = [
    {
      icon: "✅",
      title: "Therapist Approvals",
      description:
        "Review therapist profiles, credentials, verification status, and approval decisions.",
      href: "/admin-therapists",
      buttonText: "Review Therapists",
      primary: true,
    },
    {
      icon: "📊",
      title: "Assessment Analytics",
      description:
        "View self-assessment results, growth areas, anonymous check-ins, and platform trends.",
      href: "/admin-assessments",
      buttonText: "View Analytics",
    },
  ];

  return (
    <>
      <SectionTitle
        title="Admin Center"
        description="Manage platform quality, approvals, and emotional wellness insights."
      />

      <DashboardCardGrid cards={cards} />

      <WellnessTools />
    </>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-[#0F4C5C]">{title}</h2>

      <p className="mt-2 max-w-3xl text-base font-semibold leading-7 text-gray-900">
        {description}
      </p>
    </div>
  );
}

function DashboardCardGrid({ cards }: { cards: DashboardCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-4xl">{card.icon}</div>

          <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
            {card.title}
          </h3>

          <p className="mt-3 min-h-[84px] text-base font-semibold leading-7 text-gray-900">
            {card.description}
          </p>

          <div
            className={`mt-auto inline-block w-fit rounded-full px-5 py-3 text-sm font-bold transition ${
              card.primary
                ? "bg-[#0F4C5C] text-white group-hover:bg-[#0b3945]"
                : "border-2 border-[#0F4C5C] text-[#0F4C5C] group-hover:bg-[#0F4C5C] group-hover:text-white"
            }`}
          >
            {card.buttonText}
          </div>
        </Link>
      ))}
    </div>
  );
}

function WellnessTools({ title = "Wellness Tools" }: { title?: string }) {
  return (
    <section className="mt-12">
      <SectionTitle
        title={title}
        description="Continue your self-discovery journey with private reflection and emotional check-ins."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/journal"
          className="group flex h-full flex-col rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-5xl">📖</div>

          <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
            My Journal
          </h3>

          <p className="mt-3 text-base font-semibold leading-7 text-gray-900">
            Record your thoughts, emotions, and reflections in a safe and private
            space.
          </p>

          <div className="mt-auto inline-block w-fit rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-bold text-white group-hover:bg-[#0b3945]">
            Open Journal →
          </div>
        </Link>

        <Link
          href="/self-assessment"
          className="group rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="text-5xl">🧠</div>

          <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
            Self-Discovery Check-In
          </h3>

          <p className="mt-3 text-base font-semibold leading-7 text-gray-900">
            Understand your emotional wellbeing and identify areas where you may
            need more support.
          </p>

          <div className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-bold text-white group-hover:bg-[#0b3945]">
            Start Assessment →
          </div>
        </Link>
      </div>
    </section>
  );
}