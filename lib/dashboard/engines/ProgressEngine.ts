import { JourneyProgressModel } from "../types";

export interface ProgressContext {
  wellbeingScore: number;
  currentStreak: number;
  journalEntries: number;
  completedAssessments: number;
  completedGenesisChapters: number;
  totalGenesisChapters: number;
  therapistSessions: number;
}

export class ProgressEngine {
  build(
    context: ProgressContext
  ): JourneyProgressModel {
    const genesisProgress =
      context.totalGenesisChapters === 0
        ? 0
        : Math.round(
            (context.completedGenesisChapters /
              context.totalGenesisChapters) *
              100
          );

    return {
      wellbeingScore: context.wellbeingScore,

      streak: context.currentStreak,

      journalEntries: context.journalEntries,

      genesisProgress,

      assessmentsCompleted:
        context.completedAssessments,

      therapistSessions:
        context.therapistSessions,
    };
  }
}

export const progressEngine =
  new ProgressEngine();