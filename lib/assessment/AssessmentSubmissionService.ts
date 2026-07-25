import {
  AssessmentScoringEngine,
  AssessmentResultLevel,
} from "./AssessmentScoringEngine";

export interface AssessmentResultDefinition {
  level: string;
  minScore: number;
  maxScore: number;
}

export interface SubmitAssessmentInput {
  values: number[];
  maxScorePerQuestion?: number;
  results: AssessmentResultDefinition[];
}

export interface SubmitAssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  matchingResult?: AssessmentResultDefinition;
}

export class AssessmentSubmissionService {
  private scoringEngine = new AssessmentScoringEngine();

  async submitAssessment(
    input: SubmitAssessmentInput
  ): Promise<SubmitAssessmentResult> {
    const scoring =
      this.scoringEngine.calculate({
        values: input.values,
        maxScorePerQuestion:
          input.maxScorePerQuestion ?? 3,
        levels: input.results.map(
          (result): AssessmentResultLevel => ({
            id: result.level,
            title: result.level,
            minScore: result.minScore,
            maxScore: result.maxScore,
          })
        ),
      });

    const matchingResult =
      input.results.find(
        (result) =>
          result.level ===
          scoring.level?.title
      );

    return {
      totalScore: scoring.totalScore,
      maxScore: scoring.maxScore,
      percentage: scoring.percentage,
      matchingResult,
    };
  }
}