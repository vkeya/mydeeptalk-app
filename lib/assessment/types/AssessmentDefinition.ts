import {
  AssessmentCategory,
  AssessmentStatus,
  ScoringDirection,
} from "./AssessmentEnums";

import { WellbeingDimensionId } from "./AssessmentDimensions";

/**
 * Assessment metadata
 */
export interface AssessmentMetadata {
  id: string;
  slug: string;
  version: number;

  title: string;
  description: string;
  shortDescription?: string;

  estimatedDurationMinutes: number;

  category: AssessmentCategory;

  status?: AssessmentStatus;

  icon?: string;
  color?: string;

  tags?: string[];

  createdAt?: string;
  updatedAt?: string;
}

/**
 * One answer option
 */
export interface AssessmentQuestionOption {
  id: string;

  text: string;

  value: number;

  description?: string;
}

/**
 * One assessment question
 */
export interface AssessmentQuestion {
  id: string;

  text: string;

  description?: string;

  options: AssessmentQuestionOption[];

  scoringDirection: ScoringDirection;

  wellbeingDimensions: WellbeingDimensionId[];

  weight?: number;

  tags?: string[];
}

/**
 * Assessment result band
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
 * Complete assessment definition
 */
export interface AssessmentDefinition {
  metadata: AssessmentMetadata;

  wellbeingDimensions: WellbeingDimensionId[];

  questions: AssessmentQuestion[];

  results: AssessmentResultDefinition[];
}