export type TreatmentGoalStatus =
  | "active"
  | "completed"
  | "paused";

export interface TreatmentGoal {
  id: string;

  clientId: string;
  therapistId: string;

  title: string;
  description: string;

  targetDate?: string;

  status: TreatmentGoalStatus;
  progress: number; // 0–100

  completedAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface TreatmentWorkspaceData {
  activeGoals: TreatmentGoal[];
  completedGoals: TreatmentGoal[];
}