import { AssessmentDefinition } from "./AssessmentDefinition";
import { AssessmentResponse } from "./AssessmentResponse";
import { AssessmentScore } from "./AssessmentScore";
import { AssessmentResult } from "./AssessmentResult";
import { RecommendationBundle } from "./AssessmentRecommendation";

export interface AssessmentSession {
  id: string;

  userId?: string;

  assessment: AssessmentDefinition;

  responses: AssessmentResponse;

  score: AssessmentScore;

  result: AssessmentResult;

  recommendations: RecommendationBundle;

  startedAt: Date;

  completedAt: Date;

  durationSeconds: number;

  version: number;

  metadata?: Record<string, unknown>;
}