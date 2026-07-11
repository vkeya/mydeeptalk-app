"use client";

import { useState } from "react";

interface ExperiencePlayerProps {
  scenes: ((onContinue: () => void) => React.ReactNode)[];
}

export default function ExperiencePlayer({
  scenes,
}: ExperiencePlayerProps) {
  const [currentScene, setCurrentScene] = useState(0);

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene((prev) => prev + 1);
    }
  };

  return <>{scenes[currentScene](nextScene)}</>;
}