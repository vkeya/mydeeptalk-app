import { HealingActivity } from "../types";

export interface DashboardRepository {
  getUserProfile(userId: string): Promise<any>;

  getLatestAssessment(userId: string): Promise<unknown>;

  getLatestCheckIn(userId: string): Promise<unknown>;

  getJournalSummary(userId: string): Promise<unknown>;

  getGenesisProgress(userId: string): Promise<unknown>;

  getUpcomingTherapySessions(userId: string): Promise<unknown>;

  getHealingActivities(userId: string): Promise<HealingActivity[]>;

  getToolkit(userId: string): Promise<unknown>;
}