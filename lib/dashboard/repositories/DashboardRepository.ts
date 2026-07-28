export interface DashboardRepository {
  getUser(userId: string): Promise<unknown>;

  getLatestAssessment(userId: string): Promise<unknown>;

  getJournalEntries(userId: string): Promise<unknown>;

  getLatestCheckIn(userId: string): Promise<unknown>;

  getGenesisProgress(userId: string): Promise<unknown>;

  getTherapySessions(userId: string): Promise<unknown>;

  getAchievements(userId: string): Promise<unknown>;
}