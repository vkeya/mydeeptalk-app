/**
 * Assessment Framework 3.0
 * Core enums used across the assessment system.
 */

export enum AssessmentCategory {
  MentalWellbeing = "mental-wellbeing",

  EmotionalWellbeing = "emotional-wellbeing",

  PhysicalWellbeing = "physical-wellbeing",

  Relationships = "relationships",

  Lifestyle = "lifestyle",

  PersonalGrowth = "personal-growth",
}

export enum ScoringDirection {
  Positive = "positive",
  Negative = "negative",

  Normal = "positive",
  Reverse = "negative",
}

export enum AssessmentStatus {
  Draft = "draft",
  Active = "active",
  Deprecated = "deprecated",
}

export enum RecommendationPriority {
  Critical = "critical",
  High = "high",
  Medium = "medium",
  Low = "low",
  Optional = "optional",
}

export enum InsightConfidence {
  Low = "low",
  Medium = "medium",
  High = "high",
}