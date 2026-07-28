export enum HealingTaskType {
  ASSESSMENT,
  JOURNAL,
  GENESIS,
  AI,
  THERAPIST,
  HEALING_CIRCLE,
}

export interface HealingTask {
  id: string;
  type: HealingTaskType;
  title: string;
  description: string;
  priority: number;
  completed: boolean;
}

export interface HealingPlan {
  userId: string;
  generatedAt: Date;
  updatedAt: Date;
  tasks: HealingTask[];
}