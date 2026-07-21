// ======================================================
// Project Genesis
// Experience Domain Types
// ======================================================

import { GenesisMemory } from "./genesisMemory";

export type GenesisExperienceStatus =
  | "locked"
  | "available"
  | "in-progress"
  | "completed";

export interface GenesisReward {
  xp: number;
  badge?: string;
  achievement?: string;
}

export interface GenesisUnlockCondition {
  completedExperiences?: string[];
  minimumXP?: number;
}

export type GenesisSceneType =
  | "arrival"
  | "guide"
  | "intention"
  | "emotion"
  | "identity"
  | "public-self"
  | "private-self"
  | "labels"
  | "values"
  | "strengths"
  | "reflection"
  | "journal"
  | "discovery"
  | "celebration"
  | "intro"
  | "guide-selection"
  | "identity-card"
  | "insight"
  | "childhood"
  | "important-people"
  | "defining-moments"
  | "difficult-seasons"
  | "turning-points"
  | "life-lessons"
  | "timeline";

export interface GenesisSceneDefinition {
  id: string;
  type: GenesisSceneType;
  title?: string;
  description?: string;

  /**
   * Scene component key
   * Example:
   * arrival
   * identity
   * reflection
   * journal
   * insight
   * celebration
   */
  component: string;

  required?: boolean;
  next?: string;
}

export interface GenesisExperienceMetadata {
  title: string;
  subtitle: string;

  description: string;

  duration: string;

  difficulty: "Easy" | "Medium" | "Deep";

  coverImage?: string;

  color?: string;
}

export interface GenesisExperience {
  id: string;

  slug: string;

  metadata: GenesisExperienceMetadata;

  scenes: GenesisSceneDefinition[];

  rewards: GenesisReward;

  unlock?: GenesisUnlockCondition;

  /**
   * Memory domains this experience contributes to.
   *
   * Examples:
   * identity
   * values
   * emotions
   * strengths
   * relationships
   * purpose
   */
  memoryDomains: (keyof GenesisMemory)[];

  enabled: boolean;
}