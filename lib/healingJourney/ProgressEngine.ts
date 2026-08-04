import { JourneyProgress } from "./JourneyProgress";
import { JourneyState } from "./JourneyState";

export class ProgressEngine {
  buildProgress(
    state: JourneyState
  ): JourneyProgress {

    const consistency =
      this.calculateConsistency(state);

    const engagement =
      this.calculateEngagement(state);

    const progress =
      this.calculateOverallProgress(state);

    return {
      overallProgress: progress,

      consistencyScore: consistency,

      engagementScore: engagement,

      wellbeingScore: state.wellbeingScore,

      momentum:
        this.calculateMomentum(
          consistency,
          engagement
        ),

      nextMilestone:
        this.determineNextMilestone(state),

      completedMilestones:
        this.completedMilestones(state),
    };
  }

  // ---------------------------------------------

  private calculateConsistency(
    state: JourneyState
  ): number {

    return Math.min(
      state.checkInStreak * 10,
      100
    );
  }

  // ---------------------------------------------

  private calculateEngagement(
    state: JourneyState
  ): number {

    let score = 0;

    score += Math.min(
      state.assessmentsCompleted * 10,
      20
    );

    score += Math.min(
      state.journalEntries,
      20
    );

    score += Math.min(
      state.genesisProgress,
      40
    );

    score += Math.min(
      state.therapistSessions * 5,
      20
    );

    return Math.min(score, 100);
  }

  // ---------------------------------------------

  private calculateOverallProgress(
    state: JourneyState
  ): number {

    return Math.round(
      (
        state.wellbeingScore +
        this.calculateConsistency(state) +
        this.calculateEngagement(state)
      ) / 3
    );
  }

  // ---------------------------------------------

  private calculateMomentum(
    consistency: number,
    engagement: number
  ) {

    if (
      consistency >= 80 &&
      engagement >= 70
    )
      return "accelerating";

    if (
      consistency >= 50 &&
      engagement >= 40
    )
      return "steady";

    if (
      consistency >= 20
    )
      return "slowing";

    return "stalled";
  }

  // ---------------------------------------------

  private determineNextMilestone(
    state: JourneyState
  ): string {

    if (!state.hasCheckedInToday)
      return "Complete today's check-in";

    if (
      state.genesisStarted &&
      !state.genesisCompleted
    )
      return "Continue Genesis";

    if (
      state.assessmentsCompleted === 0
    )
      return "Complete your first assessment";

    if (
      state.journalEntries === 0
    )
      return "Write your first journal";

    return "Maintain your healing momentum";
  }

  // ---------------------------------------------

  private completedMilestones(
    state: JourneyState
  ): number {

    let completed = 0;

    if (state.hasCheckedInToday)
      completed++;

    if (
      state.assessmentsCompleted > 0
    )
      completed++;

    if (
      state.journalEntries > 0
    )
      completed++;

    if (
      state.genesisStarted
    )
      completed++;

    if (
      state.therapistSessions > 0
    )
      completed++;

    return completed;
  }
}

export const progressEngine =
  new ProgressEngine();