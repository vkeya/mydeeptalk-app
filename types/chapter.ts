import { Experience } from "./experience";

export interface Chapter {

  id: string;

  journeyId: string;

  order: number;

  title: string;

  subtitle?: string;

  description: string;

  coverImage?: string;

  estimatedMinutes: number;

  experiences: Experience[];

  xpReward: number;

  isLocked: boolean;
}