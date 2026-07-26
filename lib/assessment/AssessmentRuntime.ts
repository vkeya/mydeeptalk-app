import { randomUUID } from "crypto";

import { AssessmentCatalogService } from "./AssessmentCatalog";
import { scoreAssessment } from "./scoring/AssessmentScoringEngine";
import { AssessmentResultBuilder } from "./AssessmentResultBuilder";
import { AssessmentRecommendationEngine } from "./AssessmentRecommendationEngine";

import { AssessmentResponse } from "./types/AssessmentResponse";
import { AssessmentSession } from "./types/AssessmentSession";


export interface AssessmentRuntimeOptions {
  userId: string;
  startedAt?: Date;
}

export class AssessmentRuntime {
 static run(
  assessmentSlug: string,
  response: AssessmentResponse,
  options: AssessmentRuntimeOptions
): AssessmentSession {

    const assessment =
      AssessmentCatalogService.getBySlug(assessmentSlug);

    if (!assessment) {
      throw new Error(
        `Assessment "${assessmentSlug}" not found.`
      );
    }

    const score = scoreAssessment(
      assessment,
      response
    );

    const result =
      AssessmentResultBuilder.build(
        assessment,
        score
      );

    const recommendations =
      AssessmentRecommendationEngine.build(
        result
      );

    const completedAt = new Date();

const startedAt =
  options.startedAt ?? completedAt;

const durationSeconds =
  Math.max(
    0,
    Math.floor(
      (completedAt.getTime() -
        startedAt.getTime()) /
        1000
    )
  );

    return {

      id: randomUUID(),

      userId: options.userId,

      assessment,

      version: assessment.metadata.version,

      responses: response,

      score,

      result,

      recommendations,

      startedAt,

completedAt,

durationSeconds,
    };
  }
}

export default AssessmentRuntime;