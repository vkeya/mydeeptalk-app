export type ExperienceDifficulty =
  | "gentle"
  | "moderate"
  | "deep";

export type ExperienceCategory =
  | "identity"
  | "life-story"
  | "emotions"
  | "healing"
  | "resilience"
  | "boundaries"
  | "relationships"
  | "purpose"
  | "wholeness";

export enum SceneType {
  Arrival = "arrival",
  Guide = "guide",
  Reflection = "reflection",
  Question = "question",
  Exercise = "exercise",
  Journal = "journal",
  Insight = "insight",
  Celebration = "celebration",
}

export interface GenesisScene {
  id: string;

  type: SceneType;

  title?: string;

  next?: string;

  data: Record<string, unknown>;
}

export interface GenesisExperience {
  id: string;

  slug: string;

  title: string;

  subtitle: string;

  description: string;

  category: ExperienceCategory;

  difficulty: ExperienceDifficulty;

  estimatedMinutes: number;

  xpReward: number;

  badge?: string;

  scenes: GenesisScene[];
}