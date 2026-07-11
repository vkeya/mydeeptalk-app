// types/activity.ts

export enum ActivityType {
  CONVERSATION = "conversation",
  ASSESSMENT = "assessment",
  REFLECTION = "reflection",
  JOURNAL = "journal",
  CHALLENGE = "challenge",
  VIDEO = "video",
  AUDIO = "audio",
  EXERCISE = "exercise",
  QUIZ = "quiz",
  TIMELINE = "timeline",
  MEDITATION = "meditation",
}

export interface Activity {
  id: string;

  experienceId: string;

  order: number;

  type: ActivityType;

  title: string;

  subtitle?: string;

  description: string;

  estimatedMinutes: number;

  xpReward: number;

  isRequired: boolean;

  unlockAfter?: string;

  createdAt: Date;

  updatedAt: Date;
}