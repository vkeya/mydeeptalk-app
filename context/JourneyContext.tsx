"use client";

import {
  completeExperience as completeJourneyExperience,
} from "@/lib/journey/progressEngine";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface JourneyState {
  experienceId: string;
  selectedGuide: string;
  currentScene: number;
  identityAnswer: string;
  journalEntry: string;
  
  completedExperiences: string[];
completed: boolean;
}

interface JourneyContextType {
  state: JourneyState;
  
  startExperience: (experienceId: string) => void;

  setSelectedGuide: (guide: string) => void;
  setCurrentScene: (scene: number) => void;
  
  nextScene: () => void;
  previousScene: () => void;
  goToScene: (scene: number) => void;

  completeExperience: () => void;
  
  setIdentityAnswer: (answer: string) => void;
  setJournalEntry: (entry: string) => void;

  resetJourney: () => void;
}



const initialState: JourneyState = {
  experienceId: "",	

  selectedGuide: "",
  currentScene: 0,
  identityAnswer: "",
  journalEntry: "",
  
  completedExperiences: [],
  completed: false,
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
  
  const startExperience = useCallback((experienceId: string) => {
  setState((prev) => {
    if (prev.experienceId === experienceId) {
      return prev;
    }

    return {
      ...prev,
      experienceId,
      currentScene: 0,
      completed: false,
    };
  });
}, []);

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
  
  const nextScene = () => {
  setState((prev) => ({
    ...prev,
    currentScene: prev.currentScene + 1,
  }));
};

const previousScene = () => {
  setState((prev) => ({
    ...prev,
    currentScene: Math.max(0, prev.currentScene - 1),
  }));
};

const goToScene = (scene: number) => {
  setState((prev) => ({
    ...prev,
    currentScene: scene,
  }));
};

const completeExperience = () => {
  setState((prev) => {
    if (!prev.experienceId) {
      return prev;
    }

    const progress = completeJourneyExperience(
      prev.experienceId
    );

    return {
      ...prev,
      completed: true,
      completedExperiences:
        progress.completedExperiences,
    };
  });
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
  startExperience,
  setSelectedGuide,
  setCurrentScene,

  nextScene,
  previousScene,
  goToScene,
  completeExperience,

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