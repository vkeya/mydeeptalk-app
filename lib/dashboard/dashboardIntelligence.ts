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
  | "writeJournal"
  | "dailyCheckIn";;

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

interface HealingContext {
  hasStartedGenesis: boolean;
  hasCompletedGenesis: boolean;

  hasAssessment: boolean;

  checkedInToday: boolean;

  hasJournalEntries: boolean;

  hasTherapistRelationship: boolean;
}

function buildHealingContext(
  input: DashboardIntelligenceInput
): HealingContext {
  const lastCheckIn = input.checkIn.latestCheckInDate;

  return {
    hasStartedGenesis: input.genesis.progress > 0,
    hasCompletedGenesis: input.genesis.progress >= 100,

    hasAssessment:
      input.assessment.completedAssessments > 0,

    checkedInToday:
      !!lastCheckIn &&
      new Date(lastCheckIn).toDateString() ===
        new Date().toDateString(),

    hasJournalEntries:
      input.journal.journalEntries > 0,

    hasTherapistRelationship:
      input.therapy.completedSessions > 0 ||
      input.therapy.upcomingSessions > 0,
  };
}

interface StageResult {
  insights?: DashboardInsight[];
  recommendations?: DashboardRecommendation[];
  alerts?: DashboardAlert[];
}

type StageEvaluator = (
  input: DashboardIntelligenceInput
) => StageResult | null;

function createDashboardResponse(
  insights: DashboardInsight[],
  alerts: DashboardAlert[],
  stage: StageResult
): DashboardIntelligence {
  return {
    insights: [
      ...insights,
      ...(stage.insights ?? []),
    ].sort((a, b) => b.priority - a.priority),

    recommendations: (
      stage.recommendations ?? []
    ).sort((a, b) => b.priority - a.priority),

    alerts: [
      ...alerts,
      ...(stage.alerts ?? []),
    ],
  };
}

function evaluateGenesisStage(
  input: DashboardIntelligenceInput
): StageResult | null {
  if (input.genesis.progress <= 0) {
    return {
      recommendations: [
        {
          id: "start-journey",
          type: "startJourney",
          title: "Begin Your First Journey",
          description: "Start your guided self-discovery experience.",
          priority: 100,
        },
      ],
    };
  }

  if (hasActiveJourney(input)) {
    return {
      insights: [
        {
          id: "continue-journey",
          type: "continueJourney",
          title: "Continue your healing journey",
          description: `You're ${input.genesis.progress}% through your current journey.`,
          priority: 90,
        },
      ],
      recommendations: [
        {
          id: "resume-journey",
          type: "continueJourney",
          title: "Resume Journey",
          description: "Pick up where you left off and continue discovering yourself.",
          priority: 90,
        },
      ],
    };
  }

  return null;
}

function evaluateAssessmentStage(
  input: DashboardIntelligenceInput
): StageResult | null {
  if (input.assessment.completedAssessments <= 0) {
    return {
      recommendations: [
        {
          id: "assessment",
          type: "takeAssessment",
          title: "Take Your First Assessment",
          description:
            "Gain insights into your emotional wellbeing.",
          priority: 80,
        },
      ],
    };
  }

  return null;
}

function evaluateCheckInStage(
  input: DashboardIntelligenceInput
): StageResult | null {
  const lastCheckIn = input.checkIn.latestCheckInDate;

  const checkedInToday =
    !!lastCheckIn &&
    new Date(lastCheckIn).toDateString() ===
      new Date().toDateString();

  if (!checkedInToday) {
    return {
      recommendations: [
        {
          id: "daily-checkin",
          type: "dailyCheckIn",
          title: "Complete Today's Check-In",
          description:
            "Take a moment to understand how you're feeling today.",
          priority: 75,
        },
      ],
    };
  }

  return null;
}

function evaluateJournalStage(
  input: DashboardIntelligenceInput
): StageResult | null {
  if (input.journal.journalEntries <= 0) {
    return {
      recommendations: [
        {
          id: "journal",
          type: "writeJournal",
          title: "Write Today's Reflection",
          description:
            "Journaling helps strengthen your healing journey.",
          priority: 70,
        },
      ],
    };
  }

  return null;
}

function evaluateTherapyStage(
  input: DashboardIntelligenceInput
): StageResult | null {
  if (
    input.therapy.completedSessions <= 0 &&
    input.therapy.upcomingSessions <= 0
  ) {
    return {
      recommendations: [
        {
          id: "therapist",
          type: "bookTherapist",
          title: "Connect With a Therapist",
          description:
            "Professional guidance can accelerate your healing.",
          priority: 60,
        },
      ],
    };
  }

  return null;
}

const stageEvaluators: StageEvaluator[] = [
  evaluateGenesisStage,
  evaluateAssessmentStage,
  evaluateCheckInStage,
  evaluateJournalStage,
  evaluateTherapyStage,
];

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
  
for (const evaluateStage of stageEvaluators) {
  const result = evaluateStage(input);

  if (result) {
    return createDashboardResponse(
      insights,
      alerts,
      result
    );
  }
}  

return {
  insights: insights.sort((a, b) => b.priority - a.priority),
  recommendations: recommendations.sort(
    (a, b) => b.priority - a.priority
  ),
  alerts,
};
}