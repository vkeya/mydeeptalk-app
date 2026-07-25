export interface AssessmentResultLevel {
  id: string;
  title: string;
  minScore: number;
  maxScore: number;
}

export interface AssessmentScoreInput {
  values: number[];
  levels?: AssessmentResultLevel[];
  maxScorePerQuestion?: number;
}

export interface AssessmentScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level?: AssessmentResultLevel;
}

export class AssessmentScoringEngine {

  calculate(
    input: AssessmentScoreInput
  ): AssessmentScoreResult {

    const totalScore = input.values.reduce(
      (sum, value) => sum + value,
      0
    );

    const maxScore =
  input.values.length *
  (input.maxScorePerQuestion ?? 3);

    const percentage =
      maxScore === 0
        ? 0
        : Math.round((totalScore / maxScore) * 100);

    const level = this.resolveLevel(
      totalScore,
      input.levels
    );

    return {
      totalScore,
      maxScore,
      percentage,
      level,
    };
  }

private resolveLevel(
    score: number,
    levels?: AssessmentResultLevel[]
  ): AssessmentResultLevel | undefined {
    if (!levels) {
      return undefined;
    }

    return levels.find(
      (level) =>
        score >= level.minScore &&
        score <= level.maxScore
    );
  }
}



