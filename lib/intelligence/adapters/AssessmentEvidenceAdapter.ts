import { WellbeingDimension } from "../framework/dimensions";
import { WellbeingEvidence } from "../types/evidence";

export interface AssessmentEvidenceInput {
  assessmentId: string;

  score: number;

  maxScore: number;

  wellbeingDimension?: WellbeingDimension;
}

export class AssessmentEvidenceAdapter {
  static build(
    input: AssessmentEvidenceInput
  ): WellbeingEvidence | null {

    if (!input.wellbeingDimension) {
      return null;
    }

const dimension = input.wellbeingDimension;

    if (!dimension) {
      return null;
    }

    return {
      source: "assessment",

      dimension,

      score:
        Math.round(
          (input.score / input.maxScore) * 100
        ),

      confidence: 0.8,

      evidenceId: input.assessmentId,

      createdAt: new Date(),

      metadata: {
        assessmentId: input.assessmentId,
      },
    };
  }
}