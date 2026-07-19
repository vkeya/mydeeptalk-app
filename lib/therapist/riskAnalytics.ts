import type { ClientSession } from "@/types/therapist/session";
import type { HomeworkItem } from "@/types/therapist/homework";
import type { TreatmentGoal } from "@/types/therapist/treatment";

export type RiskLevel = "low" | "medium" | "high";

export interface RiskAnalytics {
  level: RiskLevel;
  missedSessions: number;
  overdueHomework: number;
  stalledGoals: number;
  alerts: string[];
}

export function buildRiskAnalytics(params: {
  sessions: ClientSession[];
  homework: HomeworkItem[];
  treatment: TreatmentGoal[];
}): RiskAnalytics {
  const { sessions, homework, treatment } = params;

  const missedSessions = sessions.filter(
    session => session.status === "missed"
  ).length;

  const overdueHomework = homework.filter(item => {
  if (item.status === "completed") {
    return false;
  }

  if (!item.dueDate) {
    return false;
  }

  return new Date(item.dueDate) < new Date();
}).length;

  const stalledGoals = treatment.filter(
    goal => goal.status === "active"
  ).length;

  const alerts: string[] = [];

  if (missedSessions >= 2) {
    alerts.push("Client has missed multiple sessions.");
  }

  if (overdueHomework >= 2) {
    alerts.push("Homework completion is falling behind.");
  }

  if (stalledGoals >= 5) {
    alerts.push("Treatment goals require review.");
  }

  let level: RiskLevel = "low";

  if (alerts.length >= 3) {
    level = "high";
  } else if (alerts.length >= 1) {
    level = "medium";
  }

  return {
    level,
    missedSessions,
    overdueHomework,
    stalledGoals,
    alerts,
  };
}