export interface JourneyAnswer {
  questionId: string;
  value: string;
}

export interface JournalEntry {
  sceneId: string;
  content: string;
  createdAt: string;
}

export interface JourneyProgress {
  currentExperience: string;
  currentScene: string;
  xp: number;
  level: number;
}

export type JourneySceneType =
  | "arrival"
  | "question"
  | "reflection"
  | "journal"
  | "insight"
  | "celebration";

export interface JourneyScene {
  id: string;
  type: JourneySceneType;
  title: string;
  subtitle?: string;
  content?: string;
  question?: string;
}

export interface JourneyExperience {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  badge?: string;
  scenes: JourneyScene[];
}