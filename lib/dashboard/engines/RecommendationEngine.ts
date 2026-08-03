import { TherapyTodayRule } from "../rules/TherapyTodayRule";

import {
  RecommendationContext,
  RecommendationRule,
} from "../recommendations/RecommendationRule";

export class RecommendationEngine {
  private readonly rules: RecommendationRule[] = [
    new TherapyTodayRule(),
  ];

  build(context: RecommendationContext) {
    const rule = this.rules.find((r) => r.canHandle(context));

    if (!rule) {
      throw new Error("No recommendation rule matched.");
    }

    return rule.build(context);
  }
}

export const recommendationEngine = new RecommendationEngine();