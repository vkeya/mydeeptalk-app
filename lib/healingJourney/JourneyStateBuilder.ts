import { JourneyState } from "./JourneyState";

export interface JourneyStateSource {
  userId: string;

  // Wellbeing
  wellbeingScore?: number;
  currentMood?: string | null;
  emotionalTrend?: "improving" | "stable" | "declining";

  // Check-In
  hasCheckedInToday?: boolean;
  checkInStreak?: number;
  lastCheckInDate?: Date;

  // Assessments
  assessmentsCompleted?: number;
  lastAssessmentDate?: Date;

  // Genesis
  genesisStarted?: boolean;
  genesisCompleted?: boolean;
  genesisProgress?: number;

  // Journal
  journalEntries?: number;
  lastJournalDate?: Date;

  // Therapy
  therapistSessions?: number;
  lastTherapySession?: Date;

  // Healing
  currentHealingArea?: string;
  activeGoals?: string[];

  // Metadata
  accountCreatedAt?: Date;
  lastSeenAt?: Date;
}

export class JourneyStateBuilder {

  build(
    source: JourneyStateSource
  ): JourneyState {

    return {

      userId: source.userId,

      wellbeingScore:
        source.wellbeingScore ?? 50,

      currentMood:
  source.currentMood ?? undefined,

      emotionalTrend:
        source.emotionalTrend ?? "unknown",

      hasCheckedInToday:
        source.hasCheckedInToday ?? false,

      checkInStreak:
        source.checkInStreak ?? 0,

      lastCheckInDate:
        source.lastCheckInDate,

      assessmentsCompleted:
        source.assessmentsCompleted ?? 0,

      lastAssessmentDate:
        source.lastAssessmentDate,

      genesisStarted:
        source.genesisStarted ?? false,

      genesisCompleted:
        source.genesisCompleted ?? false,

      genesisProgress:
        source.genesisProgress ?? 0,

      journalEntries:
        source.journalEntries ?? 0,

      lastJournalDate:
        source.lastJournalDate,

      therapistSessions:
        source.therapistSessions ?? 0,

      lastTherapySession:
        source.lastTherapySession,

      currentHealingArea:
        source.currentHealingArea,

      activeGoals:
        source.activeGoals ?? [],

      accountCreatedAt:
        source.accountCreatedAt ?? new Date(),

      lastSeenAt:
        source.lastSeenAt ?? new Date(),
    };
  }

}

export const journeyStateBuilder =
  new JourneyStateBuilder();