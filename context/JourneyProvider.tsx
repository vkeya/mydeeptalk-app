"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  JourneyProgress,
  getJourneyProgress,
} from "@/lib/journey/progressEngine";

import { loadJourneyProgress } from "@/lib/journey/storage";

interface JourneyProviderValue {
  progress: JourneyProgress;

  setProgress: React.Dispatch<
    React.SetStateAction<JourneyProgress>
  >;
}

const JourneyProgressContext =
  createContext<JourneyProviderValue | null>(null);

export function JourneyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [progress, setProgress] =
    useState<JourneyProgress>(getJourneyProgress());

  useEffect(() => {
    const saved = loadJourneyProgress();

    if (saved) {
      setProgress(saved);
    }
  }, []);

  return (
    <JourneyProgressContext.Provider
      value={{
        progress,
        setProgress,
      }}
    >
      {children}
    </JourneyProgressContext.Provider>
  );
}

export function useJourneyProgress() {
  const context = useContext(
    JourneyProgressContext
  );

  if (!context) {
    throw new Error(
      "useJourneyProgress must be used inside JourneyProvider."
    );
  }

  return context;
}