import { dashboardBuilder } from "./builders/DashboardBuilder";
import { DashboardViewModel } from "./types";

export class DashboardService {
  async build(userId: string): Promise<DashboardViewModel> {
    return dashboardBuilder.build({
      welcome: {
        greeting: "Good afternoon",
        userName: "Victor",
        encouragement: "Every small step you take today matters.",
      },

      todaysFocus: {
        title: "Complete today's emotional check-in",
        description:
          "Take a few minutes to reflect on how you're feeling today.",
        actionLabel: "Start Check-In",
        href: "/check-in",
        priority: 80,
      },

      progress: {
        wellbeingScore: 72,
        streak: 14,
        journalEntries: 18,
        genesisProgress: 42,
        assessmentsCompleted: 5,
        therapistSessions: 3,
      },

      insight: {
        title: "You're building consistency",
        message:
          "You've continued showing up for yourself this week. Keep going.",
        confidence: 0.9,
        generatedAt: new Date(),
      },

      continueHealing: {
        activities: [],
      },

      toolkit: {
        tools: [],
      },

      timeline: {
        milestones: [],
      },
    });
  }
}

export const dashboardService = new DashboardService();