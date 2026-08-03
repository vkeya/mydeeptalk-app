import { TodaysFocusModel } from "../types";

export interface RecommendationContext {
  userId: string;

  hasTherapyToday: boolean;

  hasIncompleteGenesis: boolean;

  needsDailyCheckIn: boolean;

  hasPendingAssessment: boolean;

  needsJournalReflection: boolean;
}

export interface RecommendationRule {
  priority: number;

  canHandle(
    context: RecommendationContext
  ): boolean;

  build(
    context: RecommendationContext
  ): TodaysFocusModel;
}