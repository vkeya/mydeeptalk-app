import { Chapter } from "./chapter";
import { IdentityCardOption, EmotionOption } from "@/types/genesis";

export type JourneyOption =
  | IdentityCardOption
  | EmotionOption;
  
export type JourneySceneType =
  | "arrival"
  | "guide"
  | "intention"
  | "identity"
  | "emotion"
  | "public-self"
  | "private-self"
  | "labels"
  | "values"
  | "strengths"
  | "reflection"
  | "journal"
  | "discovery"
  | "celebration";
  
export type QuestionPresentation =
  | "default"
  | "identity-cards"
  | "emotion-compass"
  | "trait-selector"
  | "label-selector"
  | "values-selector"
  | "strength-selector"
  | "multiple-choice"
  | "scale"
  | "timeline"
  | "backpack";

export interface JourneyScene {
  id: string;

  type: JourneySceneType;

  title: string;

  subtitle?: string;

  content?: string;

  image?: string;

  // Question scenes
  question?: string;
  
  presentation?: QuestionPresentation;

  options?: JourneyOption[];

  // Reflection / Journal scenes
  prompt?: string;
  placeholder?: string;

  // Insight scenes
  insight?: string;

  // Celebration scenes
  celebrationMessage?: string;

  xpReward?: number;

  nextSceneId?: string;

  metadata?: Record<string, unknown>;
}

export interface JourneyExperience {
  id: string;

  title: string;

  description: string;

  xpReward: number;

  badge: string;

  scenes: JourneyScene[];
}

export interface JourneyProgress {
  userId: string;

  totalXP: number;

  level: number;

  currentStreak: number;

  longestStreak: number;

  currentExperienceId: string;

  completedExperiences: string[];

  unlockedExperiences: string[];

  achievements: Achievement[];

  moodHistory: MoodEntry[];

  recentReflections: ReflectionSummary[];

  lastActivityAt?: string;

  createdAt: string;

  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
}

export interface MoodEntry {
  mood: string;
  recordedAt: string;
}

export interface ReflectionSummary {
  id: string;
  experienceId: string;
  sceneId: string;
  text: string;
  createdAt: string;
}