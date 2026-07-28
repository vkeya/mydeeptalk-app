import { dashboardRepository } from "@/lib/dashboard/repositories/FirestoreDashboardRepository";
import { DashboardAction } from "@/lib/dashboard/contracts/DashboardAction";
import { DashboardDomainSummary } from "@/lib/dashboard/contracts/DashboardDomainSummary";


export interface TherapyDashboardSummary
  extends DashboardDomainSummary {
  upcomingSessions: number;
  nextSessionDate: Date | null;
  assignedTherapist: string | null;
  completedSessions: number;
  nextAction: DashboardAction | null;
}

export class TherapyService {
  async getDashboardSummary(
    userId: string
  ): Promise<TherapyDashboardSummary> {
    // Placeholder until the Therapy repository is implemented.

    await dashboardRepository.getUser(userId);

    return {
      upcomingSessions: 0,
      nextSessionDate: null,
      assignedTherapist: null,
      completedSessions: 0,
      nextAction: null,
    };
  }
}

export const therapyService = new TherapyService();