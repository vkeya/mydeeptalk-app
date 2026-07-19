import type { ClientSession } from "@/types/therapist/session";
import type { HomeworkItem } from "@/types/therapist/homework";
import type { TreatmentGoal } from "@/types/therapist/treatment";

export interface ProgressAnalytics {
  sessionAttendance: number;
  homeworkCompletion: number;
  treatmentCompletion: number;
  overallProgress: number;
}

function percentage(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;

  return Math.round((completed / total) * 100);
}

export function buildProgressAnalytics(params: {
  sessions: ClientSession[];
  homework: HomeworkItem[];
  treatment: TreatmentGoal[];
}): ProgressAnalytics {
  const { sessions, homework, treatment } = params;

  const completedSessions = sessions.filter(
    session => session.status === "completed"
  ).length;

  const completedHomework = homework.filter(
    item => item.status === "completed"
  ).length;

  const completedGoals = treatment.filter(
    goal => goal.status === "completed"
  ).length;

  const sessionAttendance = percentage(
    completedSessions,
    sessions.length
  );

  const homeworkCompletion = percentage(
    completedHomework,
    homework.length
  );

  const treatmentCompletion = percentage(
    completedGoals,
    treatment.length
  );

  const overallProgress = Math.round(
    (
      sessionAttendance +
      homeworkCompletion +
      treatmentCompletion
    ) / 3
  );

  return {
    sessionAttendance,
    homeworkCompletion,
    treatmentCompletion,
    overallProgress,
  };
}