"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



import { completeExperience } from "@/lib/journey/progressEngine";

import ArrivalScene from "./components/ArrivalScene";
import IdentityQuestionScene from "./components/IdentityQuestionScene";
import ReflectionScene from "./components/ReflectionScene";
import JournalScene from "./components/JournalScene";
import InsightScene from "./components/InsightScene";
import CelebrationScene from "./components/CelebrationScene";

export default function MeetingYourselfPage() {
  const [scene, setScene] = useState(0);
  
  const router = useRouter();

  const nextScene = () => {
    setScene((prev) => Math.min(prev + 1, 5));
  };

  const previousScene = () => {
    setScene((prev) => Math.max(prev - 1, 0));
  };
  
  const finishJourney = () => {
  completeExperience("meeting-yourself");

router.push("/journey/dashboard");
  };
  switch (scene) {
    case 0:
      return (
        <ArrivalScene
          onContinue={nextScene}
        />
      );

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
  onContinue={finishJourney}
  onBack={previousScene}
/>
      );

    default:
      return null;
  }
}