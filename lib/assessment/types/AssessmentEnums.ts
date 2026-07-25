/**
 * Assessment Framework 3.0
 * Core enums used across the assessment system.
 */

export enum AssessmentCategory {
  Clinical = "clinical",
  EmotionalSkills = "emotional-skills",
  Identity = "identity",
  Relationships = "relationships",
  Lifestyle = "lifestyle",
  Flourishing = "flourishing",
}

export enum ScoringDirection {
  Positive = "positive",
  Negative = "negative",
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