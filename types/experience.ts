import { Activity } from "./activity";

export interface Experience {

  id: string;

  chapterId: string;

  order: number;

  title: string;

  subtitle?: string;

  description: string;

  estimatedMinutes: number;

  coverImage?: string;

  activities: Activity[];

  xpReward: number;

  completionMessage?: string;
}