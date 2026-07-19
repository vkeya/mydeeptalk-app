"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useJourney } from "@/context/JourneyContext";

import ArrivalScene from "./components/ArrivalScene";
import IdentityQuestionScene from "./components/IdentityQuestionScene";
import ReflectionScene from "./components/ReflectionScene";
import JournalScene from "./components/JournalScene";
import InsightScene from "./components/InsightScene";
import CelebrationScene from "./components/CelebrationScene";
import ReflectionCard from "@/components/genesis/ReflectionCard";

export default function MeetingYourselfPage() {
  const router = useRouter();

  const {
    state,
    startExperience,
    nextScene,
    previousScene,
    completeExperience,
  } = useJourney();

  useEffect(() => {
    startExperience("meeting-yourself");
  }, [startExperience]);

if (state.completed && state.reflection) {
  return (
    <ReflectionCard
      reflection={state.reflection}
      onContinue={() => router.push("/journey/dashboard")}
    />
  );
}

  switch (state.currentScene) {
    case 0:
      return <ArrivalScene onContinue={nextScene} />;

    case 1:
      return (
        <IdentityQuestionScene
          onContinue={nextScene}
          onBack={previousScene}
        />
      );

    case 2:
      return (
        <ReflectionScene
          onContinue={nextScene}
          onBack={previousScene}
        />
      );

    case 3:
      return (
        <JournalScene
          onContinue={nextScene}
          onBack={previousScene}
        />
      );

    case 4:
      return (
        <InsightScene
          onContinue={nextScene}
          onBack={previousScene}
        />
      );

    case 5:
      return (
        <CelebrationScene
          onContinue={completeExperience}
          onBack={previousScene}
        />
      );

    default:
      return null;
  }
}