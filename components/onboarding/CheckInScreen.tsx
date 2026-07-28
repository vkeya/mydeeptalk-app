"use client";

import { useEffect, useState } from "react";
import EmotionCard from "./EmotionCard";

import {
  getOnboardingData,
  saveOnboardingData,
} from "@/lib/onboarding/onboardingStorage";
import OnboardingLayout from "./OnboardingLayout";
import OnboardingNavigation from "./OnboardingNavigation";

export default function CheckInScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

useEffect(() => {
  const data = getOnboardingData();

  if (data.checkIn) {
    setSelectedEmotion(data.checkIn);
  }
}, []);

  return (
    <OnboardingLayout step={5} totalSteps={6}>
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          How are you feeling today?
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          There are no right or wrong answers. Choose the emotion that best
          reflects how you're feeling right now.
        </p>

        <div className="mt-12 space-y-5">
  <EmotionCard
    emoji="😊"
    emotion="Peaceful"
    description="I feel calm, grounded, and emotionally balanced."
    selected={selectedEmotion === "peaceful"}
    onClick={() => {
      setSelectedEmotion("peaceful");
      saveOnboardingData({ checkIn: "peaceful" });
    }}
  />

  <EmotionCard
    emoji="😄"
    emotion="Hopeful"
    description="I'm optimistic and looking forward to what's ahead."
    selected={selectedEmotion === "hopeful"}
    onClick={() => {
      setSelectedEmotion("hopeful");
      saveOnboardingData({ checkIn: "hopeful" });
    }}
  />

  <EmotionCard
    emoji="😐"
    emotion="Okay"
    description="I'm neither great nor struggling—just somewhere in the middle."
    selected={selectedEmotion === "okay"}
    onClick={() => {
      setSelectedEmotion("okay");
      saveOnboardingData({ checkIn: "okay" });
    }}
  />

  <EmotionCard
    emoji="😟"
    emotion="Anxious"
    description="My thoughts feel unsettled, and I'm carrying some worry."
    selected={selectedEmotion === "anxious"}
    onClick={() => {
      setSelectedEmotion("anxious");
      saveOnboardingData({ checkIn: "anxious" });
    }}
  />

  <EmotionCard
    emoji="😔"
    emotion="Sad"
    description="I'm feeling down, hurt, or emotionally heavy today."
    selected={selectedEmotion === "sad"}
    onClick={() => {
      setSelectedEmotion("sad");
      saveOnboardingData({ checkIn: "sad" });
    }}
  />

  <EmotionCard
    emoji="😤"
    emotion="Frustrated"
    description="Something is weighing on me, and I feel tense or irritated."
    selected={selectedEmotion === "frustrated"}
    onClick={() => {
      setSelectedEmotion("frustrated");
      saveOnboardingData({ checkIn: "frustrated" });
    }}
  />

  <EmotionCard
    emoji="😴"
    emotion="Exhausted"
    description="I'm mentally or physically drained and need to recharge."
    selected={selectedEmotion === "exhausted"}
    onClick={() => {
      setSelectedEmotion("exhausted");
      saveOnboardingData({ checkIn: "exhausted" });
    }}
  />

  <EmotionCard
    emoji="😕"
    emotion="Overwhelmed"
    description="Life feels like a lot right now, and I'm struggling to process everything."
    selected={selectedEmotion === "overwhelmed"}
    onClick={() => {
      setSelectedEmotion("overwhelmed");
      saveOnboardingData({ checkIn: "overwhelmed" });
    }}
  />
</div>

        <div className="mt-12">
          <OnboardingNavigation
            back="/onboarding/guide"
            next="/onboarding/starting-point"
            nextDisabled={!selectedEmotion}
          />
        </div>
      </div>
    </OnboardingLayout>
  );
}