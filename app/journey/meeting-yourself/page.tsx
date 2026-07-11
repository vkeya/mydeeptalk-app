"use client";

import { useState } from "react";

import ArrivalScene from "./components/ArrivalScene";
import IdentityQuestionScene from "./components/IdentityQuestionScene";
import ReflectionScene from "./components/ReflectionScene";
import JournalScene from "./components/JournalScene";
import InsightScene from "./components/InsightScene";
import CelebrationScene from "./components/CelebrationScene";

export default function MeetingYourselfPage() {
  const [scene, setScene] = useState(0);

  switch (scene) {
    case 0:
      return (
        <ArrivalScene
          onContinue={() => setScene(1)}
        />
      );

    case 1:
      return (
        <IdentityQuestionScene
          onContinue={() => setScene(2)}
        />
      );

    case 2:
      return (
        <ReflectionScene
          onContinue={() => setScene(3)}
        />
      );

    case 3:
      return (
        <JournalScene
          onContinue={() => setScene(4)}
        />
      );

    case 4:
      return (
        <InsightScene
          onContinue={() => setScene(5)}
        />
      );

    case 5:
      return (
        <CelebrationScene
          onContinue={() => {
            // We'll connect this later
            alert("Experience Complete!");
          }}
        />
      );

    default:
      return null;
  }
}