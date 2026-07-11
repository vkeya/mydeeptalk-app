import { Chapter } from "./chapter";

export interface Journey {

  id: string;

  slug: string;

  title: string;

  subtitle?: string;

  description: string;

  version: number;

  estimatedDurationDays: number;

  coverImage?: string;

  chapters: Chapter[];

  published: boolean;
}