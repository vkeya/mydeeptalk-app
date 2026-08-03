// lib/dashboard/dashboardRepository.ts

export interface DashboardRepositoryData {
  hasJourney: boolean;
  journeyProgress: number;

  hasAssessment: boolean;

  hasTherapist: boolean;

  hasJournalEntries: boolean;

  wellbeingScore: number | null;

  streak: number;

  journalEntries: number;
}

export async function getDashboardRepositoryData(): Promise<DashboardRepositoryData> {
  return {
    hasJourney: false,
    journeyProgress: 0,

    hasAssessment: false,

    hasTherapist: false,

    hasJournalEntries: false,

    wellbeingScore: null,

    streak: 0,

    journalEntries: 0,
  };
}