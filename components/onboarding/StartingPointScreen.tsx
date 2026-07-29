"use client";

import { auth, db } from "@/lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import StartingPointCard from "./StartingPointCard";
import { useRouter } from "next/navigation";

import {
  getOnboardingData,
  saveOnboardingData,
  clearOnboardingData,
} from "@/lib/onboarding/onboardingStorage";
import OnboardingLayout from "./OnboardingLayout";
import OnboardingNavigation from "./OnboardingNavigation";

export default function StartingPointScreen() {
	  const router = useRouter();
	  
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

useEffect(() => {
  const data = getOnboardingData();

  if (data.startingPoint) {
    setSelectedPath(data.startingPoint);
  }
}, []);

async function handleFinish() {
 

  const user = auth.currentUser;

  if (!user) {
    
    router.push("/login");
    return;
  }

  const docRef = doc(db, "users", user.uid);

  const onboarding = getOnboardingData();
 

  await updateDoc(docRef, {
  onboardingCompleted: true,

  "onboarding.guide": onboarding.guide,
  "onboarding.checkIn": onboarding.checkIn,
  "onboarding.startingPoint": onboarding.startingPoint,
  "onboarding.completedAt": serverTimestamp(),
});



  clearOnboardingData();

 

  router.push("/dashboard");
}

  return (
    <OnboardingLayout step={6} totalSteps={6}>
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Where would you like to begin?
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Choose the area you'd most like to focus on first. This helps us
          personalize your first experience inside MyDeepTalk.
        </p>

        <div className="mt-12 space-y-5">
  <StartingPointCard
    icon="🌱"
    title="Discover Myself"
    description="Learn more about your personality, emotions, values, and strengths."
    selected={selectedPath === "discover-myself"}
    onClick={() => {
      setSelectedPath("discover-myself");
      saveOnboardingData({ startingPoint: "discover-myself" });
    }}
  />

  <StartingPointCard
    icon="❤️"
    title="Heal Emotionally"
    description="Work through difficult emotions and build emotional resilience."
    selected={selectedPath === "heal-emotionally"}
    onClick={() => {
      setSelectedPath("heal-emotionally");
      saveOnboardingData({ startingPoint: "heal-emotionally" });
    }}
  />

  <StartingPointCard
    icon="🤝"
    title="Strengthen Relationships"
    description="Improve how you connect and communicate with the important people in your life."
    selected={selectedPath === "relationships"}
    onClick={() => {
      setSelectedPath("relationships");
      saveOnboardingData({ startingPoint: "relationships" });
    }}
  />

  <StartingPointCard
    icon="🧠"
    title="Build Better Habits"
    description="Develop routines and habits that support your wellbeing and growth."
    selected={selectedPath === "habits"}
    onClick={() => {
      setSelectedPath("habits");
      saveOnboardingData({ startingPoint: "habits" });
    }}
  />

  <StartingPointCard
    icon="🎯"
    title="Find My Purpose"
    description="Clarify what matters most to you and create meaningful direction."
    selected={selectedPath === "purpose"}
    onClick={() => {
      setSelectedPath("purpose");
      saveOnboardingData({ startingPoint: "purpose" });
    }}
  />

  <StartingPointCard
    icon="💬"
    title="Talk to a Therapist"
    description="Connect with a licensed professional for personalized support."
    selected={selectedPath === "therapist"}
    onClick={() => {
      setSelectedPath("therapist");
      saveOnboardingData({ startingPoint: "therapist" });
    }}
  />
</div>

        <div className="mt-12">
          <div className="mt-12 flex items-center justify-between">
  <button
    type="button"
    onClick={() => router.push("/onboarding/check-in")}
    className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
  >
    ← Back
  </button>

  <button
    type="button"
    disabled={!selectedPath}
    onClick={handleFinish}
    className={`rounded-xl px-8 py-3 font-semibold transition ${
      !selectedPath
        ? "cursor-not-allowed bg-slate-200 text-slate-500"
        : "bg-[#0B5D6B] text-white hover:bg-[#094955]"
    }`}
  >
    Finish →
  </button>
</div>
        </div>
      </div>
    </OnboardingLayout>
  );
}