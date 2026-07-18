export type HomeworkStatus =
  | "assigned"
  | "in_progress"
  | "completed";

export interface HomeworkItem {
  id: string;

  clientId: string;
  therapistId: string;

  title: string;
  description: string;

  assignedDate: string;
  dueDate?: string;

  status: HomeworkStatus;

  submittedAt?: string;
  therapistFeedback?: string;

  createdAt: string;
  updatedAt: string;
}

export interface HomeworkWorkspaceData {
  active: HomeworkItem[];
  completed: HomeworkItem[];
}