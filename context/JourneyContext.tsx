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
import { memoryEngine } from "@/lib/genesis/memory/memoryEngine";
import { journeyProcessor } from "@/lib/genesis/journey/journeyProcessor";
import { buildMeetingYourselfResponse } from "@/lib/genesis/journey/builders/meetingYourselfBuilder";
import { JourneyReflection } from "@/types/genesisReflection";
import { GenesisMemory } from "@/types/genesisMemory";
import { buildReflection } from "@/lib/genesis/reflection/reflectionBuilder";

export interface JourneyState {
  experienceId: string;
  selectedGuide: string;
  currentScene: number;
  identityAnswer: string;
  journalEntry: string;
  
  completedExperiences: string[];
completed: boolean;

reflection?: JourneyReflection;
}

interface JourneyContextType {
  state: JourneyState;
  memory: GenesisMemory;
  
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
  
  reflection: undefined,
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
  
  const [memory, setMemory] = useState<GenesisMemory>(
  memoryEngine.createMemory()
);
  
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
  if (!state.experienceId) {
    return;
  }

  // Build a structured response from the completed journey
  const journeyResponse =
    buildMeetingYourselfResponse(state);

  // Process discoveries and update Genesis memory
  const updatedMemory = journeyProcessor.processJourney(
    journeyResponse,
    memory
  );

  setMemory(updatedMemory);
  
  const reflection = buildReflection(updatedMemory);

  // Update journey progress
  const progress = completeJourneyExperience(
    state.experienceId
  );

  // Mark experience as completed
  setState((prev) => ({
    ...prev,
    completed: true,
	 reflection,
    completedExperiences:
      progress.completedExperiences,
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
  memory,
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