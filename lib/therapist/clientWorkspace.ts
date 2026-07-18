import { ClientStatsProps } from "@/components/therapist/workspace";
import { getClientHeader } from "./clientService";
import { getClinicalNotes } from "./notesService";
import type { TimelineEvent } from "@/types/therapist/timeline";
import {
  AssessmentResult,
  AssessmentSummary,
} from "@/components/therapist/workspace/sections/AssessmentsSection";
import {
  ClientSession,
} from "@/components/therapist/workspace/sections/SessionsSection";
import type { ClinicalNote } from "@/types/therapist/notes";
import {
  TreatmentGoal,
} from "@/components/therapist/workspace/sections/TreatmentSection";
import {
  HomeworkItem,
} from "@/components/therapist/workspace/sections/HomeworkSection";
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

  activities: TimelineEvent[];

  journey: {
    activeJourney: string;
    completion: number;
    currentExperience: string;
    xp: number;
    badges: number;
    reflections: number;
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

  console.log("Loading workspace for", clientId);

  return {
	header,
	
    stats: {
      totalSessions: 12,
      completedAssessments: 5,
      activeJourney: "Meeting Yourself",
      wellbeingScore: 74,
      streak: 9,
      lastSession: "12 Jul 2026",
    },

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
        totalCompleted: 5,
        latestAssessment: "10 Jul 2026",
        averageScore: 73,
        riskLevel: "Low",
      },

      history: [],
    },

    sessions: {
      nextSession: undefined,
      history: [],
    },

    notes: await getClinicalNotes(clientId),

    treatment: [],

    homework: [],

    resources: [],

    ai: [],
  };
}