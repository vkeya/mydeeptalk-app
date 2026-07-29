import { GenesisDashboardSummary } from "@/lib/genesis/GenesisService";
import { AssessmentDashboardSummary } from "@/lib/assessment/AssessmentService";
import { JournalDashboardSummary } from "@/lib/journal/JournalService";
import { TherapyDashboardSummary } from "@/lib/therapy/TherapyService";
import { CheckInDashboardSummary } from "@/lib/checkin/CheckInService";

// lib/dashboard/dashboardIntelligence.ts

export type DashboardInsightType =
  | "welcome"
  | "continueJourney"
  | "assessment"
  | "journal"
  | "therapist"
  | "celebration"
  | "reflection";

export type DashboardRecommendationType =
  | "startJourney"
  | "continueJourney"
  | "takeAssessment"
  | "bookTherapist"
  | "writeJournal";

export type DashboardAlertType =
  | "info"
  | "success"
  | "warning"
  | "error";

export interface DashboardInsight {
  id: string;
  type: DashboardInsightType;
  title: string;
  description: string;
  priority: number;
}

export interface DashboardRecommendation {
  id: string;
  type: DashboardRecommendationType;
  title: string;
  description: string;
  priority: number;
}

export interface DashboardAlert {
  id: string;
  type: DashboardAlertType;
  title: string;
  description: string;
}

export interface DashboardIntelligenceInput {
  genesis: GenesisDashboardSummary;
  assessment: AssessmentDashboardSummary;
  journal: JournalDashboardSummary;
  therapy: TherapyDashboardSummary;
  checkIn: CheckInDashboardSummary;
}

export interface DashboardIntelligence {
  insights: DashboardInsight[];
  recommendations: DashboardRecommendation[];
  alerts: DashboardAlert[];
}

function hasActiveJourney(
  input: DashboardIntelligenceInput
): boolean {
  return (
    input.genesis.progress > 0 &&
    input.genesis.progress < 100
  );
}

export function generateDashboardIntelligence(
  input: DashboardIntelligenceInput
): DashboardIntelligence {
  const insights: DashboardInsight[] = [];
  const recommendations: DashboardRecommendation[] = [];
  const alerts: DashboardAlert[] = [];

  // Welcome
  insights.push({
    id: "welcome",
    type: "welcome",
    title: "Welcome back",
    description:
      "Every small step in your healing journey matters.",
    priority: 100,
  });

  // Journey
  if (hasActiveJourney(input)) {
    insights.push({
      id: "continue-journey",
      type: "continueJourney",
      title: "Continue your healing journey",
      description: `You're ${input.genesis.progress}% through your current journey.`,
      priority: 90,
    });

    recommendations.push({
      id: "resume-journey",
      type: "continueJourney",
      title: "Resume Journey",
      description:
        "Pick up where you left off and continue discovering yourself.",
      priority: 90,
    });
  }

  if (input.genesis.progress <= 0) {
    recommendations.push({
      id: "start-journey",
      type: "startJourney",
      title: "Begin Your First Journey",
      description:
        "Start your guided self-discovery experience.",
      priority: 100,
    });
  }

  // Assessment
  if (input.assessment.completedAssessments <= 0)  {
    recommendations.push({
      id: "assessment",
      type: "takeAssessment",
      title: "Take Your First Assessment",
      description:
        "Gain insights into your emotional wellbeing.",
      priority: 80,
    });
  }

  // Journal
  if (input.journal.journalEntries <= 0) {
    recommendations.push({
      id: "journal",
      type: "writeJournal",
      title: "Write Today's Reflection",
      description:
        "Journaling helps strengthen your healing journey.",
      priority: 70,
    });
  }

  // Therapist
  if (
  input.therapy.completedSessions <= 0 &&
  input.therapy.upcomingSessions <= 0
) {
    recommendations.push({
      id: "therapist",
      type: "bookTherapist",
      title: "Connect With a Therapist",
      description:
        "Professional guidance can accelerate your healing.",
      priority: 60,
    });
  }

  return {
  insights: insights.sort((a, b) => b.priority - a.priority),
  recommendations: recommendations.sort(
    (a, b) => b.priority - a.priority
  ),
  alerts,
};
}