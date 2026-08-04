import { JourneyRecommendation } from "./JourneyRecommendation";
import { JourneyState } from "./JourneyState";

export class RecommendationEngine {
  buildRecommendation(
    state: JourneyState
  ): JourneyRecommendation {

    // --------------------------------------------------
    // Rule 1
    // Daily Check-In
    // --------------------------------------------------

    if (!state.hasCheckedInToday) {
      return {
        priority: "high",
        category: "checkin",
        title: "Complete Today's Check-In",
        description:
          "Take a moment to understand how you're feeling today.",
        actionLabel: "Begin Check-In",
        actionHref: "/check-in",
        reason:
          "Daily awareness builds emotional resilience over time.",
      };
    }

    // --------------------------------------------------
    // Rule 2
    // Genesis
    // --------------------------------------------------

    if (
      state.genesisStarted &&
      !state.genesisCompleted
    ) {
      return {
        priority: "high",
        category: "genesis",
        title: "Continue Your Genesis Journey",
        description:
          "Resume discovering yourself where you last stopped.",
        actionLabel: "Continue Genesis",
        actionHref: "/genesis",
        reason:
          "Consistency creates meaningful self-discovery.",
      };
    }

    // --------------------------------------------------
    // Rule 3
    // Assessments
    // --------------------------------------------------

    if (state.assessmentsCompleted === 0) {
      return {
        priority: "medium",
        category: "assessment",
        title: "Take Your First Assessment",
        description:
          "Understand your emotional wellbeing with a guided assessment.",
        actionLabel: "Start Assessment",
        actionHref: "/assessment",
        reason:
          "Assessments provide a baseline for your healing journey.",
      };
    }

    // --------------------------------------------------
    // Rule 4
    // Journal
    // --------------------------------------------------

    if (state.journalEntries === 0) {
      return {
        priority: "medium",
        category: "journal",
        title: "Start Journaling",
        description:
          "Capture today's thoughts and emotions.",
        actionLabel: "Open Journal",
        actionHref: "/journal",
        reason:
          "Reflection helps you recognize patterns and growth.",
      };
    }

    // --------------------------------------------------
    // Default
    // --------------------------------------------------

    return {
      priority: "low",
      category: "celebration",
      title: "Keep Going",
      description:
        "You're building healthy habits. Keep showing up for yourself.",
      actionLabel: "Open Dashboard",
      actionHref: "/dashboard",
      reason:
        "Healing happens through consistent small steps.",
    };
  }
}

export const recommendationEngine =
  new RecommendationEngine();