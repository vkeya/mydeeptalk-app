import { dashboardRepository } from "@/lib/dashboard/repositories/FirestoreDashboardRepository";
import { DashboardAction } from "@/lib/dashboard/contracts/DashboardAction";
import { DashboardDomainSummary } from "@/lib/dashboard/contracts/DashboardDomainSummary";

import { CheckIn } from "@/types/checkIn";
import { FirestoreCheckInRepository } from "@/lib/checkin/repositories/FirestoreCheckInRepository";

export interface CheckInDashboardSummary
  extends DashboardDomainSummary {
  latestCheckInDate: Date | null;
  currentMood: string | null;
  streak: number;
  nextRecommendedCheckIn: Date | null;
  nextAction: DashboardAction | null;
}

export class CheckInService {
  private repository = new FirestoreCheckInRepository();

  /**
   * Creates a new Daily Check-In.
   */
  async createCheckIn(checkIn: CheckIn): Promise<void> {
    await this.repository.create(checkIn);
  }

  /**
   * Returns the latest Daily Check-In.
   */
  async getLatestCheckIn(
    userId: string
  ): Promise<CheckIn | null> {
    return this.repository.getLatest(userId);
  }

  /**
   * Returns today's Daily Check-In.
   */
  async getTodayCheckIn(
    userId: string
  ): Promise<CheckIn | null> {
    return this.repository.getToday(userId);
  }

  /**
   * Returns a user's Daily Check-In history.
   */
  async getHistory(
    userId: string
  ): Promise<CheckIn[]> {
    return this.repository.getHistory(userId);
  }

  /**
   * Dashboard summary.
   * This will evolve as Dashboard Intelligence grows.
   */
  async getDashboardSummary(
    userId: string
  ): Promise<CheckInDashboardSummary> {
    await dashboardRepository.getUserProfile(userId);

    const latest = await this.repository.getLatest(userId);

    return {
      latestCheckInDate: latest?.completedAt ?? null,
      currentMood: latest?.mood ?? null,
      streak: 0,
      nextRecommendedCheckIn: null,
      nextAction: null,
    };
  }
}

export const checkInService = new CheckInService();