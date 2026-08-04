import { HealingJourney } from "./HealingJourney";

export class DashboardJourneyAdapter {
  toProgress(journey: HealingJourney) {
    return {
      wellbeingScore: journey.progress.wellbeingScore,

      streak: Math.round(
        journey.progress.consistencyScore / 10
      ),

      journalEntries:
        journey.progress.engagementScore,

      genesisProgress:
        journey.progress.overallProgress,

      assessmentsCompleted:
        journey.milestones.filter(
          (m) => m.category === "assessment" && m.achieved
        ).length,

      therapistSessions:
        journey.milestones.filter(
          (m) => m.category === "therapy" && m.achieved
        ).length,
    };
  }
}

export const dashboardJourneyAdapter =
  new DashboardJourneyAdapter();