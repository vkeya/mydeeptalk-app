/**
 * ------------------------------------------------------------------
 * MyDeepTalk Intelligence Layer
 * Session Preparation Types
 * ------------------------------------------------------------------
 */

export interface PreparationInput {
  clientId: string;
  therapistId: string;

  sessionId?: string;

  includeAssessments?: boolean;
  includeJournal?: boolean;
  includeHomework?: boolean;
  includePreviousSessions?: boolean;
}

export interface PreparationSummary {
  clientId: string;
  therapistId: string;

  clientOverview: string;

  recentMood?: string;

  assessmentSummary?: string;

  journalHighlights: string[];

  activeGoals: string[];

  homeworkStatus?: string;

  suggestedTopics: string[];

  riskFlags: string[];

  recommendations: string[];

  generatedAt: Date;
}