"use client";

import {
  completeExperience as completeJourneyExperience,
} from "@/lib/journey/progressEngine";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { memoryEngine } from "@/lib/genesis/memory/memoryEngine";
import { journeyProcessor } from "@/lib/genesis/journey/journeyProcessor";
import { buildMeetingYourselfResponse } from "@/lib/genesis/journey/builders/meetingYourselfBuilder";
import { JourneyReflection } from "@/types/genesisReflection";
import { GenesisMemory } from "@/types/genesisMemory";
import { buildReflection } from "@/lib/genesis/reflection/reflectionBuilder";
import { auth } from "@/lib/firebase";
import { profileService } from "@/lib/genesis/profile/profileService";
import { JourneyScene } from "@/types/journey";

export interface JourneyState {
  experienceId: string;

  selectedGuide: string;
  currentScene: number;

  identityAnswer: string;
  publicSelf: string[];
  privateSelf: string[];
  
  identityLabels: string[];
  
  coreValues: string[];
  
  strengths: string[];

  selectedEmotion: string;
  desiredEmotion: string;

  journeyIntention: string;
  
  childhoodReflection: string;
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
  setJourneyIntention: (intention: string) => void;
  setDesiredEmotion: (emotion: string) => void;
  setPublicSelf: (value: string[]) => void;
  setPrivateSelf: (value: string[]) => void;
  
  setIdentityLabels: (labels: string[]) => void;
  
  setCoreValues: (values: string[]) => void;
  
  setStrengths: (strengths: string[]) => void;
  
  nextScene: (
  nextSceneType?: JourneyScene["type"]
) => void;
  previousScene: () => void;
  goToScene: (scene: number) => void;
  selectGuide: (guideId: string) => void;
  completeExperience: () => Promise<void>;
  
  setIdentityAnswer: (answer: string) => void;
  setJournalEntry: (entry: string) => void;
  setChildhoodReflection: (
  childhoodReflection: string
) => void;

  resetJourney: () => void;
}


const initialState: JourneyState = {
  experienceId: "",

  selectedGuide: "",
  currentScene: 0,
  publicSelf: [],
  privateSelf: [],
  
  identityLabels: [],
  
  coreValues: [],
  
  strengths: [],

  identityAnswer: "",
  selectedEmotion: "",
  journeyIntention: "",
  desiredEmotion: "",
  
  childhoodReflection: "",
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
  
  const setPublicSelf = (value: string[]) => {
  setState((prev) => ({
    ...prev,
    publicSelf: value,
  }));
};

const setPrivateSelf = (value: string[]) => {
  setState((prev) => ({
    ...prev,
    privateSelf: value,
  }));
};

const setIdentityLabels = (labels: string[]) => {
  setState((prev) => ({
    ...prev,
    identityLabels: labels,
  }));
};

const setCoreValues = (values: string[]) => {
  setState((prev) => ({
    ...prev,
    coreValues: values,
  }));
};

const setStrengths = (strengths: string[]) => {
  setState((prev) => ({
    ...prev,
    strengths,
  }));
};

const setChildhoodReflection = (
  childhoodReflection: string
) => {
  setState((prev) => ({
    ...prev,
    childhoodReflection,
  }));
};
  
  const selectGuide = (guideId: string) => {
  setState((prev) => ({
    ...prev,
    selectedGuide: guideId,
  }));
};
  
  const setJourneyIntention = (intention: string) => {
  setState((prev) => ({
    ...prev,
    journeyIntention: intention,
  }));
};

const setDesiredEmotion = (emotion: string) => {
  setState((prev) => ({
    ...prev,
    desiredEmotion: emotion,
  }));
};
  
  const [memory, setMemory] = useState<GenesisMemory>(
  memoryEngine.createMemory()
);

  useEffect(() => {
  const loadGenesisProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    try {
      const profile = await profileService.getProfile(user.uid);

      if (profile) {
        setMemory(profile);
      }
    } catch (error) {
      console.error("Failed to load Genesis profile:", error);
    }
  };

  loadGenesisProfile();
}, []);
  
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
  
  const nextScene = (
  nextSceneType?: JourneyScene["type"]
) => {
  if (nextSceneType === "reflection") {
    const {
      updatedMemory,
      reflection,
    } = buildJourneyReflection();

    setMemory(updatedMemory);

    setState((prev) => ({
      ...prev,
      reflection,
      currentScene: prev.currentScene + 1,
    }));

    return;
  }

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

const buildJourneyReflection = () => {
  const journeyResponse =
    buildMeetingYourselfResponse(state);

  const processResult =
  journeyProcessor.processJourney(
    journeyResponse,
    memory
  );

const updatedMemory = processResult;

  const reflection =
    buildReflection(updatedMemory);

  return {
    updatedMemory,
    reflection,
  };
};

const completeExperience = async () => {
  if (!state.experienceId) {
    return;
  }

  // Build a structured response from the completed journey
  const {
  updatedMemory,
  reflection,
} = buildJourneyReflection();

const user = auth.currentUser;

if (user) {
  try {
    await profileService.updateMemory(
      user.uid,
      updatedMemory
    );
  } catch (error) {
    console.error(
      "Failed to save Genesis memory:",
      error
    );
  }
}

setMemory(updatedMemory);

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
  selectGuide,
  setJourneyIntention,
  setDesiredEmotion,
  nextScene,
  previousScene,
  goToScene,
  completeExperience,
  setPublicSelf,
  setPrivateSelf,
  setIdentityLabels,
  setCoreValues,
  setStrengths,

  setIdentityAnswer,
  setChildhoodReflection,
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