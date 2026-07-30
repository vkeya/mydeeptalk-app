export interface CheckIn {
  id?: string;

  userId: string;

  mood: string;

  emotions: string[];

  reflection: string;

  currentNeed?: string;

  completedAt?: Date;
}