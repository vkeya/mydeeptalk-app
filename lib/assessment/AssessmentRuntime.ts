import { randomUUID } from "crypto";

import { AssessmentDefinition } from "./types/AssessmentDefinition";
import { AssessmentResponse } from "./types/AssessmentResponse";
import { AssessmentSession } from "./types/AssessmentSession";
import { AssessmentStatus } from "./types/AssessmentEnums";

import { scoreAssessment } from "./scoring/AssessmentScoringEngine";
import { buildAssessmentResult } from "./builders/AssessmentResultBuilder";
import { buildRecommendations } from "./recommendations/AssessmentRecommendationEngine";

export class AssessmentRuntime {
  completeAssessment(
    userId: string,
    definition: AssessmentDefinition,
    response: AssessmentResponse
  ): AssessmentSession {
    const score = scoreAssessment(
      definition,
      response
    );

    const result = buildAssessmentResult(
      definition,
      score
    );

    const recommendations =
      buildRecommendations(result);

    const now = new Date().toISOString();

    return {
  id: randomUUID(),

  userId,

  assessmentId: definition.metadata.id,

  assessmentVersion: definition.metadata.version,

  status: "completed",

  response,

  score,

  result,

  recommendations,

  startedAt: now,

  completedAt: now,

  createdAt: now,

  updatedAt: now,
};
  }
}
export const assessmentRuntime =
  new AssessmentRuntime();