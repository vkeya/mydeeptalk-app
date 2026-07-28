"use client";

import { useEffect, useState } from "react";
import GuideCard from "./GuideCard";

import OnboardingLayout from "./OnboardingLayout";
import OnboardingNavigation from "./OnboardingNavigation";
import {
  getOnboardingData,
  saveOnboardingData,
} from "@/lib/onboarding/onboardingStorage";

export default function GuideScreen() {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
useEffect(() => {
  const data = getOnboardingData();

  if (data.guide) {
    setSelectedGuide(data.guide);
  }
}, []);
  return (
    <OnboardingLayout step={4} totalSteps={6}>
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Meet Your Guide
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Throughout your journey you'll have a guide who shapes the tone of
          your reflections and conversations. Choose the one that feels right
          for you.
        </p>

        <div className="mt-12 space-y-6">
  <GuideCard
    name="Amani"
    title="The Compassionate Listener"
    emoji="🌿"
    description="Creates a calm, supportive space where you can express yourself freely. Ideal if you're seeking understanding, emotional safety, and gentle guidance."
    selected={selectedGuide === "amani"}
    onClick={() => {
  setSelectedGuide("amani");
  saveOnboardingData({ guide: "amani" });
}}
  />

  <GuideCard
    name="Sage"
    title="The Wise Mentor"
    emoji="🧭"
    description="Encourages thoughtful reflection and helps you uncover deeper patterns, values, and meaning in your experiences."
    selected={selectedGuide === "sage"}
    onClick={() => {
  setSelectedGuide("sage");
  saveOnboardingData({ guide: "sage" });
}}
  />

  <GuideCard
    name="Nova"
    title="The Growth Coach"
    emoji="🚀"
    description="Focuses on progress, resilience, and actionable steps. Best if you're ready to build habits and move confidently toward your goals."
    selected={selectedGuide === "nova"}
    onClick={() => {
  setSelectedGuide("nova");
  saveOnboardingData({ guide: "nova" });
}}
  />
</div>

        <div className="mt-12">
          <OnboardingNavigation
            back="/onboarding/intent"
            next="/onboarding/check-in"
            nextDisabled={!selectedGuide}
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}