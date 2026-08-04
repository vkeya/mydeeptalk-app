import { JourneyState } from "./JourneyState";
import { JourneyMilestone } from "./JourneyMilestone";

export class MilestoneEngine {

  buildMilestones(
    state: JourneyState
  ): JourneyMilestone[] {

    return [

      {
        id: "first-checkin",

        title: "First Check-In",

        description:
          "You completed your first emotional check-in.",

        icon: "💙",

        achieved:
          state.checkInStreak > 0,

        category: "checkin",
      },

      {
        id: "7-day-streak",

        title: "7 Day Consistency",

        description:
          "You checked in for seven consecutive days.",

        icon: "🔥",

        achieved:
          state.checkInStreak >= 7,

        category: "consistency",
      },

      {
        id: "first-assessment",

        title: "First Assessment",

        description:
          "You completed your first wellbeing assessment.",

        icon: "📝",

        achieved:
          state.assessmentsCompleted > 0,

        category: "assessment",
      },

      {
        id: "first-journal",

        title: "First Reflection",

        description:
          "You wrote your first journal entry.",

        icon: "📖",

        achieved:
          state.journalEntries > 0,

        category: "journal",
      },

      {
        id: "genesis-begins",

        title: "Journey Begins",

        description:
          "You started your Genesis self-discovery journey.",

        icon: "🌱",

        achieved:
          state.genesisStarted,

        category: "genesis",
      },

      {
        id: "genesis-complete",

        title: "Genesis Complete",

        description:
          "You completed your Genesis journey.",

        icon: "🏆",

        achieved:
          state.genesisCompleted,

        category: "genesis",
      },

      {
        id: "first-therapy",

        title: "Reached Out",

        description:
          "You attended your first therapy session.",

        icon: "🤝",

        achieved:
          state.therapistSessions > 0,

        category: "therapy",
      },

      {
        id: "wellbeing-80",

        title: "Thriving",

        description:
          "Your wellbeing score reached 80 or above.",

        icon: "✨",

        achieved:
          state.wellbeingScore >= 80,

        category: "wellbeing",
      },

    ];

  }

}

export const milestoneEngine =
  new MilestoneEngine();