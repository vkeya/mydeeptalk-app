import { JourneyState } from "./JourneyState";
import {
  JourneyRisk,
  RiskIndicator,
  RiskLevel,
  RiskAction,
} from "./JourneyRisk";

export class RiskEngine {

  buildRisk(
    state: JourneyState
  ): JourneyRisk {

    const indicators: RiskIndicator[] = [];

    // ------------------------------------
    // Missed Daily Check-In
    // ------------------------------------

    if (!state.hasCheckedInToday) {
      indicators.push({
        id: "missed-checkin",
        title: "Missed Daily Check-In",
        description:
          "The user has not completed today's emotional check-in.",
        weight: 10,
      });
    }

    // ------------------------------------
    // Low Wellbeing
    // ------------------------------------

    if (state.wellbeingScore < 40) {
      indicators.push({
        id: "low-wellbeing",
        title: "Low Wellbeing Score",
        description:
          "Recent wellbeing score is below the healthy range.",
        weight: 35,
      });
    }

    // ------------------------------------
    // No Journal Activity
    // ------------------------------------

    if (state.journalEntries === 0) {
      indicators.push({
        id: "no-journal",
        title: "No Journaling",
        description:
          "Reflection activity has not yet begun.",
        weight: 10,
      });
    }

    // ------------------------------------
    // Genesis Not Started
    // ------------------------------------

    if (!state.genesisStarted) {
      indicators.push({
        id: "genesis",
        title: "Self-Discovery Not Started",
        description:
          "The Genesis journey has not yet begun.",
        weight: 10,
      });
    }

    const score =
      indicators.reduce(
        (sum, indicator) =>
          sum + indicator.weight,
        0
      );

    const level =
      this.determineRiskLevel(score);

    return {
      level,

      score,

      indicators,

      recommendedAction:
        this.determineAction(level),
    };
  }

  // ------------------------------------

  private determineRiskLevel(
    score: number
  ): RiskLevel {

    if (score >= 60)
      return "high";

    if (score >= 30)
      return "moderate";

    return "low";
  }

  // ------------------------------------

  private determineAction(
    level: RiskLevel
  ): RiskAction {

    switch (level) {

      case "high":
        return "therapist";

      case "moderate":
        return "assessment";

      default:
        return "continue";
    }
  }

}

export const riskEngine =
  new RiskEngine();