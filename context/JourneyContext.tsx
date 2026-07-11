"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface JourneyState {
  selectedGuide: string;
  currentScene: number;
  identityAnswer: string;
  journalEntry: string;
}

interface JourneyContextType {
  state: JourneyState;

  setSelectedGuide: (guide: string) => void;
  setCurrentScene: (scene: number) => void;
  setIdentityAnswer: (answer: string) => void;
  setJournalEntry: (entry: string) => void;

  resetJourney: () => void;
}

const initialState: JourneyState = {
  selectedGuide: "",
  currentScene: 0,
  identityAnswer: "",
  journalEntry: "",
};

const JourneyContext = createContext<JourneyContextType | undefined>(
  undefined
);

export function JourneyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState(initialState);

  const setSelectedGuide = (guide: string) => {
    setState((prev) => ({
      ...prev,
      selectedGuide: guide,
    }));
  };

  const setCurrentScene = (scene: number) => {
    setState((prev) => ({
      ...prev,
      currentScene: scene,
    }));
  };

  const setIdentityAnswer = (answer: string) => {
    setState((prev) => ({
      ...prev,
      identityAnswer: answer,
    }));
  };

  const setJournalEntry = (entry: string) => {
    setState((prev) => ({
      ...prev,
      journalEntry: entry,
    }));
  };

  const resetJourney = () => {
    setState(initialState);
  };

  return (
    <JourneyContext.Provider
      value={{
        state,
        setSelectedGuide,
        setCurrentScene,
        setIdentityAnswer,
        setJournalEntry,
        resetJourney,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);

  if (!context) {
    throw new Error(
      "useJourney must be used inside JourneyProvider"
    );
  }

  return context;
}