"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardAnnouncement from "@/components/DashboardAnnouncement";
import WellbeingDashboard from "@/components/intelligence/WellbeingDashboard";
import { DashboardCard } from "@/components/dashboard/types";
import DashboardCardGrid from "@/components/dashboard/DashboardCardGrid";
import LatestCheckIn from "@/components/dashboard/LatestCheckIn";
import WelcomeHero from "@/components/dashboard/client/WelcomeHero";
import TodaysFocus from "@/components/dashboard/client/TodaysFocus";
import JourneyProgress from "@/components/dashboard/client/JourneyProgress";
import InsightCard from "@/components/dashboard/client/InsightCard";
import ContinueHealing from "@/components/dashboard/client/ContinueHealing";
import ToolkitGrid from "@/components/dashboard/client/ToolkitGrid";
import { dashboardService } from "@/lib/dashboard/dashboardService";
import { DashboardViewModel } from "@/lib/dashboard/types";
import ComingSoonModal from "@/components/common/ComingSoonModal";

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] =
  useState<DashboardViewModel | null>(null);
  
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      if (!user.emailVerified) {
        
        router.push("/verify-email");
        return;
      }

     const userRef = doc(db, "users", user.uid);
const userSnap = await getDoc(userRef);

console.log("DASHBOARD USER CHECK:", {
  authUid: user.uid,
  authEmail: user.email,
  firestoreExists: userSnap.exists(),
  firestoreData: userSnap.exists() ? userSnap.data() : null,
});

if (!userSnap.exists()) {
  router.push("/onboarding");
  return;
}

const userData = userSnap.data();

if (!userData.onboardingCompleted) {
  router.push("/onboarding");
  return;
}

if (!userData.profile?.completed) {
  router.push("/profile-completion");
  return;
}

const dashboardData = await dashboardService.build(user.uid);

setDashboard(dashboardData);

setUserData(userData);
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
  
  const displayName =
  role === "client"
    ? userData?.profile?.privacyName ||
      userData?.fullName ||
      "Friend"
    : userData?.fullName || "Friend";

  return (
    <DashboardLayout
      userName={displayName}
      role={role}
      onLogout={handleLogout}
    >
      <WelcomeHero
  name={dashboard?.welcome.userName ?? displayName}
/>


<JourneyProgress
    wellbeingScore={
        dashboard?.progress.wellbeingScore ?? 72
    }
    streak={
        dashboard?.progress.streak ?? 14
    }
    journalEntries={
        dashboard?.progress.journalEntries ?? 18
    }
    genesisProgress={
        dashboard?.progress.genesisProgress ?? 42
    }
/>

<InsightCard
    title={
        dashboard?.insight.title ??
        "You're building consistency"
    }
    message={
        dashboard?.insight.message ??
        "Over the past week you've taken time to check in with yourself several times. Small moments of reflection often become the foundation for lasting emotional growth. Keep showing up for yourself."
    }
    actionText="Open Journal"
/>

<ContinueHealing
  activities={
    dashboard?.continueHealing.activities ?? [
      {
  id: "genesis",
  icon: "🌱",
  title: "Continue Genesis",
  description: "Resume Chapter 4: Meeting Yourself.",
  actionLabel: "Continue",
  href: "/genesis",
  badge: "In Progress",
},
      {
  id: "journal",
  icon: "📖",
  title: "Journal Reflection",
  description: "Your last reflection was two days ago.",
  actionLabel: "Write",
  href: "/journal",
},
      {
  id: "therapy",
  icon: "👩‍⚕️",
  title: "Upcoming Therapy Session",
  description: "Tomorrow at 2:00 PM.",
  actionLabel: "View",
  href: "/my-bookings",
},
    ]
  }
/>

<ToolkitGrid
    items={
        dashboard?.toolkit.tools ?? [
            {
                id: "journal",
                title: "Journal",
                description: "Capture your thoughts and reflections.",
                href: "/journal",
                icon: "📖",
            },
            {
                id: "ai",
                title: "AI Companion",
                description: "Talk through what is on your mind.",
                href: "/ai",
                icon: "🤖",
            },
            {
                id: "assessments",
                title: "Assessments",
                description: "Understand yourself through guided assessments.",
                href: "/assessment",
                icon: "🧠",
            },
            {
                id: "therapists",
                title: "Find a Therapist",
                description: "Connect with licensed professionals.",
                href: "/therapists",
                icon: "👩‍⚕️",
            },
            {
                id: "circles",
                title: "Healing Circles",
                description: "Grow together with your community.",
                href: "/healing-circle",
                icon: "🤝",
            },
            {
                id: "sessions",
                title: "My Sessions",
                description: "View your upcoming and past sessions.",
                href: "/my-bookings",
                icon: "📅",
            },
            {
                id: "gift",
                title: "Gift Therapy",
                description: "Support someone else's healing journey.",
                href: "/gift-session",
                icon: "🎁",
            },
            {
                id: "profile",
                title: "My Profile",
                description: "Manage your account and preferences.",
                href: "/profile-completion",
                icon: "⚙️",
            },
        ]
    }
/>
	  
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
      icon: "📅",
      title: "My Sessions",
      description:
        "View your upcoming sessions, booking status, payment details, and session history.",
      href: "/my-bookings",
      buttonText: "View Sessions",
    },
	
	{
  icon: "📈",
  title: "My Check-Ins",
  description:
    "Review all your emotional wellness assessments, monitor your progress over time, and revisit previous insights.",
  href: "/my-checkins",
  buttonText: "View History",
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
  title="Your Wellness Journey"
  description="Start with awareness, then connect with support when you need it."
/>

<WellbeingDashboard />

<LatestCheckIn />

<HealingHub />

<SectionTitle
  title="My Workspace"
  description="Manage your sessions, history, healing circles, gifts, and other tools."
/>
<div className="mt-10">
  <DashboardCardGrid cards={cards} />
</div>


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

function HealingHub() {
	const [comingSoon, setComingSoon] = useState({
  open: false,
  title: "",
  description: "",
});
	
	const handleComingSoon = (
  title: string,
  description: string
) => {
  setComingSoon({
    open: true,
    title,
    description,
  });
};
  return (
    <section className="mt-12">
      <SectionTitle
        title="Continue Your Wellness Journey"
        description="Choose the next step in your journey of healing, growth, and self-discovery."
      />

      <div className="grid gap-6 md:grid-cols-2">
		
		<div className="card-soft rounded-3xl p-8">
  <div className="text-5xl">👩‍⚕️</div>

  <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
    Find a Therapist
  </h3>

  <p className="mt-3 text-base leading-7 text-gray-700">
    Connect with a verified therapist whenever you need professional guidance and support.
  </p>

  <Link
  href="/therapists"
  className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-bold text-white"
>
  Find a Therapist →
</Link>
</div>
		
        <div className="card-soft rounded-3xl p-8">
          <div className="text-5xl">🤖</div>

          <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
            MyDeepTalk AI
          </h3>

          <p className="mt-3 text-base leading-7 text-gray-700">
            Continue exploring today's emotions through an AI-guided conversation.
          </p>
		  
		  <button
  onClick={() =>
    handleComingSoon(
      "MyDeepTalk AI",
      "Your personalized AI companion is currently under development. It will help you understand your emotions, explore your thoughts, and support your healing journey."
    )
  }
  className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b3945]"
>
  Coming Soon →
</button>
        </div>
		
		<div className="card-soft rounded-3xl p-8">
  <div className="text-5xl">🌱</div>

  <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
    Continue Genesis
  </h3>

  <p className="mt-3 text-base leading-7 text-gray-700">
    Continue your guided self-discovery journey and unlock the next chapter of personal growth.
  </p>

  <button
  onClick={() =>
    handleComingSoon(
      "Project Genesis",
      "Project Genesis is our guided self-discovery journey. We're carefully crafting this experience to help you discover yourself one meaningful step at a time."
    )
  }
  className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0b3945]"
>
  Coming Soon →
</button>
</div>


      </div>
	  
	  <ComingSoonModal
  open={comingSoon.open}
  title={comingSoon.title}
  description={comingSoon.description}
  onClose={() =>
    setComingSoon({
      open: false,
      title: "",
      description: "",
    })
  }
/>
    </section>
  );
}


function WellnessTools({ title = "Wellness Tools" }: { title?: string }) {
  return (
  <>
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
          href="/assessment"
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
	
	<section className="card-soft mt-8 rounded-3xl p-8">
  <p className="eyebrow">
    Continue Your Wellness Journey
  </p>

  <h2 className="mt-2 text-3xl font-bold text-slate-900">
    Your next steps
  </h2>

  <p className="mt-4 max-w-2xl text-slate-600">
    Continue your growth through journaling, guided conversations,
    Genesis experiences, or professional support.
  </p>
</section>
</>
  );
}