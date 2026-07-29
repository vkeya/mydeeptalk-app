import { dashboardRepository } from "@/lib/dashboard/repositories/FirestoreDashboardRepository";
import { DashboardAction } from "@/lib/dashboard/contracts/DashboardAction";
import { DashboardDomainSummary } from "@/lib/dashboard/contracts/DashboardDomainSummary";


export interface GenesisDashboardSummary
  extends DashboardDomainSummary {
  currentJourney: string | null;
  currentChapter: string | null;
  progress: number;
  xp: number;
  streak: number;
  nextAction: DashboardAction | null;
}

export class GenesisService {
  async getDashboardSummary(
    userId: string
  ): Promise<GenesisDashboardSummary> {
    // Placeholder until the Genesis repository is implemented.
    // This method defines the contract the dashboard will consume.

    await dashboardRepository.getUserProfile(userId);

    return {
      currentJourney: null,
      currentChapter: null,
      progress: 0,
      xp: 0,
      streak: 0,
      nextAction: null,
    };
  }
}

export const genesisService = new GenesisService();