import type { ClientSession } from "@/types/therapist/session";
import type { AssessmentResult } from "@/types/therapist/assessment";
import type { HomeworkItem } from "@/types/therapist/homework";
import type { TreatmentGoal } from "@/types/therapist/treatment";

export interface WorkspaceStats {
  totalSessions: number;
  completedAssessments: number;

  activeTreatmentGoals: number;
  completedHomework: number;

  wellbeingScore: number;
  streak: number;
  lastSession?: string;
}

export function buildWorkspaceStats(params: {
  sessions: ClientSession[];
  assessments: AssessmentResult[];
  homework: HomeworkItem[];
  treatment: TreatmentGoal[];
}): WorkspaceStats {
  const {
    sessions,
    assessments,
    homework,
    treatment,
  } = params;

  return {
  totalSessions: sessions.length,

  completedAssessments: assessments.length,

  activeTreatmentGoals: treatment.filter(
    goal => goal.status === "active"
  ).length,

  completedHomework: homework.filter(
    item => item.status === "completed"
  ).length,

  // Placeholder until Progress Analytics exists
  wellbeingScore: 0,

  // Placeholder until Journey Analytics exists
  streak: 0,

  lastSession:
    sessions.length > 0
      ? sessions[0].date
      : undefined,
};
}