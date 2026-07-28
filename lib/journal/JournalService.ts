import { dashboardRepository } from "@/lib/dashboard/repositories/FirestoreDashboardRepository";
import { DashboardAction } from "@/lib/dashboard/contracts/DashboardAction";
import { DashboardDomainSummary } from "@/lib/dashboard/contracts/DashboardDomainSummary";

export interface JournalDashboardSummary
  extends DashboardDomainSummary {
  latestEntryDate: Date | null;
  journalEntries: number;
  streak: number;
  moodTrend: "improving" | "stable" | "declining" | null;
  nextAction: DashboardAction | null;
}

export class JournalService {
  async getDashboardSummary(
    userId: string
  ): Promise<JournalDashboardSummary> {
    // Placeholder until the Journal repository is implemented.

    await dashboardRepository.getUser(userId);

    return {
      latestEntryDate: null,
      journalEntries: 0,
      streak: 0,
      moodTrend: null,
      nextAction: null,
    };
  }
}

export const journalService = new JournalService();