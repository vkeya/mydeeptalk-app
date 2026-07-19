import { ClientStatsProps } from "@/components/therapist/workspace";
import { getClientHeader } from "./clientService";
import { getClinicalNotes } from "./notesService";
import type { TimelineEvent } from "@/types/therapist/timeline";
import type {
  AssessmentResult,
  AssessmentSummary,
} from "@/types/therapist/assessment";
import { buildRiskAnalytics } from "./riskAnalytics";
import {
  buildWorkspaceStats,
} from "./workspaceAnalytics";
import { buildProgressAnalytics } from "./progressAnalytics";
import { getClientTreatmentPlan } from "./treatmentService";
import { getClientHomework } from "./homeworkService";
import {
  getAssessmentHistory,
} from "./assessmentService";
import { getClientSessions } from "./sessionService";

import type { ClientSession } from "@/types/therapist/session";
import type { HomeworkItem } from "@/types/therapist/homework";

import type { ClinicalNote } from "@/types/therapist/notes";
import type {
  TreatmentGoal,
} from "@/types/therapist/treatment";

import {
  TherapyResource,
} from "@/components/therapist/workspace/sections/ResourcesSection";
import { getTimeline } from "./timelineService";
import {
  AIInsight,
} from "@/components/therapist/workspace/sections/AIAssistantSection";
import type { TherapistClientHeader } from "@/types/therapist/client";
export interface TherapistClientWorkspace {
	
  header: TherapistClientHeader;
  stats: ClientStatsProps;
  progress: {
  sessionAttendance: number;
  homeworkCompletion: number;
  treatmentCompletion: number;
  overallProgress: number;
};

  activities: TimelineEvent[];

  journey: {
    activeJourney: string;
    completion: number;
    currentExperience: string;
    xp: number;
    badges: number;
    reflections: number;
  };
  
  risk: {
  level: "low" | "medium" | "high";
  missedSessions: number;
  overdueHomework: number;
  stalledGoals: number;
  alerts: string[];
};

  assessments: {
    summary: AssessmentSummary;
    history: AssessmentResult[];
  };

  sessions: {
    nextSession?: ClientSession;
    history: ClientSession[];
  };

  notes: ClinicalNote[];

  treatment: TreatmentGoal[];

  homework: HomeworkItem[];

  resources: TherapyResource[];

  ai: AIInsight[];
}

/**
 * Temporary workspace loader.
 *
 * Phase 1:
 * Returns mock data so the UI can be assembled.
 *
 * Phase 2:
 * Replace each section with Firestore/service calls.
 */
export async function getClientWorkspace(
  
  clientId: string
): Promise<TherapistClientWorkspace> {

  const header = await getClientHeader(clientId);

if (!header) {
  throw new Error("Client not found");
}
  const assessmentHistory =
    await getAssessmentHistory(clientId);
	
  const sessionData =
    await getClientSessions(clientId);
	
  const homeworkData =
    await getClientHomework(clientId);
	
  const treatmentData =
    await getClientTreatmentPlan(clientId);
	
  const stats = buildWorkspaceStats({
  sessions: sessionData.history,

  assessments: assessmentHistory,

  homework: [
    ...homeworkData.active,
    ...homeworkData.completed,
  ],

  treatment: [
    ...treatmentData.activeGoals,
    ...treatmentData.completedGoals,
  ],
});

   const progress = buildProgressAnalytics({
  sessions: sessionData.history,
  homework: [
    ...homeworkData.active,
    ...homeworkData.completed,
  ],
  treatment: [
    ...treatmentData.activeGoals,
    ...treatmentData.completedGoals,
  ],
});

   const risk = buildRiskAnalytics({
  sessions: sessionData.history,
  homework: [
    ...homeworkData.active,
    ...homeworkData.completed,
  ],
  treatment: [
    ...treatmentData.activeGoals,
    ...treatmentData.completedGoals,
  ],
});

  
  console.log("Loading workspace for", clientId);

  return {
	header,
	
    stats: {
  totalSessions: stats.totalSessions,
  completedAssessments: stats.completedAssessments,

  // Journey module will provide this later
  activeJourney: "Meeting Yourself",

  wellbeingScore: stats.wellbeingScore,
  streak: stats.streak,
  lastSession: stats.lastSession ?? "-",
},
    progress,
	
	risk,
	
    activities: await getTimeline(clientId),

    journey: {
      activeJourney: "Meeting Yourself",
      completion: 42,
      currentExperience: "Identity & Self Awareness",
      xp: 1260,
      badges: 6,
      reflections: 14,
    },

    assessments: {
  summary: {
    totalCompleted: assessmentHistory.length,
    latestAssessment:
      assessmentHistory[0]?.completedAt ?? "-",
    averageScore: 0,
    riskLevel: "Low",
  },

  history: assessmentHistory,
},

    sessions: sessionData,

    notes: await getClinicalNotes(clientId),

    treatment: [
  ...treatmentData.activeGoals,
  ...treatmentData.completedGoals,
],

    homework: [
  ...homeworkData.active,
  ...homeworkData.completed,
],

    resources: [],

    ai: [],
  };
}