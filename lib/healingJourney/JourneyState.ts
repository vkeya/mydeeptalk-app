// ======================================================
// Healing Journey State
// ======================================================

export interface JourneyState {
  // Identity
  userId: string;

  // Wellbeing
  wellbeingScore: number;
  currentMood?: string;
  emotionalTrend: EmotionalTrend;

  // Daily Check-In
  hasCheckedInToday: boolean;
  checkInStreak: number;
  lastCheckInDate?: Date;

  // Assessments
  assessmentsCompleted: number;
  lastAssessmentDate?: Date;

  // Genesis Journey
  genesisStarted: boolean;
  genesisCompleted: boolean;
  genesisProgress: number;

  // Journal
  journalEntries: number;
  lastJournalDate?: Date;

  // Therapy
  therapistSessions: number;
  lastTherapySession?: Date;

  // Healing
  currentHealingArea?: string;
  activeGoals: string[];

  // Engagement
  accountCreatedAt: Date;
  lastSeenAt: Date;
}

export type EmotionalTrend =
  | "improving"
  | "stable"
  | "declining"
  | "unknown";