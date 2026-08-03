import {
  RecommendationContext,
  RecommendationRule,
} from "../recommendations/RecommendationRule";

import { TodaysFocusModel } from "../types";

export class TherapyTodayRule
  implements RecommendationRule
{
  priority = 100;

  canHandle(
    context: RecommendationContext
  ): boolean {
    return context.hasTherapyToday;
  }

  build(): TodaysFocusModel {
    return {
      title: "You have therapy today",

      description:
        "Take a few minutes to prepare for your session.",

      actionLabel: "View Session",

      href: "/sessions",

      priority: this.priority,
    };
  }
}