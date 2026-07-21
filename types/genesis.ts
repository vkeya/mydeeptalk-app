/**
 * ------------------------------------------------------------
 * Project Genesis
 * Core Types
 * ------------------------------------------------------------
 */

export interface GenesisChapter {
  id: string;

  number: number;

  title: string;

  subtitle: string;

  description: string;

  icon: string;

  estimatedMinutes: number;

  totalScenes: number;

  xpReward: number;

  badge: string;

  theme: GenesisTheme;
}

export type GenesisTheme =
  | "discovery"
  | "reflection"
  | "awareness"
  | "healing"
  | "protection"
  | "connection"
  | "purpose"
  | "vision"
  | "wholeness";
  
  export interface EmotionOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface Discovery {
  title: string;
  message: string;
  xpReward?: number;
  badge?: string;
}

export interface IdentityCardOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  category?: string;
}

