import {
  AssessmentCategory,
  AssessmentStatus,
  ScoringDirection,
} from "./AssessmentEnums";

import { WellbeingDimensionId } from "./AssessmentDimensions";

/**
 * Metadata describing an assessment.
 */
export interface AssessmentMetadata {
  id: string;
  slug: string;
  version: number;

  title: string;
  description: string;
  shortDescription?: string;

  estimatedMinutes: number;

  category: AssessmentCategory;

  status: AssessmentStatus;

  tags?: string[];

  createdAt?: string;
  updatedAt?: string;
}

/**
 * A selectable answer option.
 */
export interface AssessmentOption {
  id: string;

  label: string;

  value: number;

  description?: string;
}

/**
 * A single assessment question.
 */
export interface AssessmentQuestion {
  id: string;

  text: string;

  description?: string;

  options: AssessmentOption[];

  /**
   * Positive = higher score improves wellbeing.
   * Negative = higher score indicates greater concern.
   */
  scoringDirection: ScoringDirection;

  /**
   * One or more wellbeing dimensions influenced
   * by this question.
   */
  wellbeingDimensions: WellbeingDimensionId[];

  /**
   * Default = 1
   */
  weight?: number;

  tags?: string[];
}

/**
 * One result band.
 */
export interface AssessmentResultDefinition {
  id: string;

  title: string;

  observation: string;

  meaning: string;

  strengths: string[];

  growthAreas: string[];

  reflectionQuestion: string;

  minScore: number;

  maxScore: number;
}

/**
 * Complete assessment definition.
 */
export interface AssessmentDefinition {
  metadata: AssessmentMetadata;

  primaryDimension: WellbeingDimensionId;

  secondaryDimensions?: WellbeingDimensionId[];

  questions: AssessmentQuestion[];

  results: AssessmentResultDefinition[];
}