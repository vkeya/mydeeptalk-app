import {
  AssessmentDefinition,
  AssessmentQuestion,
} from "../types/AssessmentDefinition";

import {
  AssessmentResponse,
  AssessmentAnswer,
} from "../types/AssessmentResponse";

import {
  AssessmentScore,
  DimensionScore,
} from "../types/AssessmentScore";

import {
  ScoringDirection,
} from "../types/AssessmentEnums";

import {
  WellbeingDimensionId,
} from "../types/AssessmentDimensions";

/**
 * Score an assessment response.
 */
export function scoreAssessment(
  definition: AssessmentDefinition,
  response: AssessmentResponse
): AssessmentScore {

  validateResponse(definition, response);

  let rawScore = 0;

  const dimensionTotals = new Map<
    WellbeingDimensionId,
    {
      earned: number;
      possible: number;
    }
  >();

  let totalPossible = 0;

  for (const question of definition.questions) {

    const answer = findAnswer(question.id, response.answers);

    const questionScore = scoreQuestion(question, answer);

    rawScore += questionScore.earned;

    totalPossible += questionScore.possible;

    for (const dimension of question.wellbeingDimensions) {

      const current =
        dimensionTotals.get(dimension) ?? {
          earned: 0,
          possible: 0,
        };

      current.earned += questionScore.earned;
      current.possible += questionScore.possible;

      dimensionTotals.set(dimension, current);
    }
  }

  const normalizedScore =
    totalPossible === 0
      ? 0
      : Math.round((rawScore / totalPossible) * 100);

  const dimensionScores: DimensionScore[] =
    Array.from(dimensionTotals.entries()).map(
      ([dimension, values]) => ({
        dimension,
        rawScore: values.earned,
        normalizedScore:
          values.possible === 0
            ? 0
            : Math.round(
                (values.earned / values.possible) * 100
              ),
      })
    );

  const result =
    definition.results.find(
      (result) =>
        normalizedScore >= result.minScore &&
        normalizedScore <= result.maxScore
    );

  if (!result) {
    throw new Error(
      `No result definition matches score ${normalizedScore}`
    );
  }

  return {
    assessmentId: response.assessmentId,

    assessmentVersion: response.assessmentVersion,

    rawScore,

    normalizedScore,

    resultId: result.id,

    dimensionScores,

    calculatedAt: new Date().toISOString(),
  };
}

/**
 * Validate the submitted response.
 */
function validateResponse(
  definition: AssessmentDefinition,
  response: AssessmentResponse
) {
  if (
    response.answers.length !==
    definition.questions.length
  ) {
    throw new Error(
      "Assessment response is incomplete."
    );
  }
}

/**
 * Locate the submitted answer.
 */
function findAnswer(
  questionId: string,
  answers: AssessmentAnswer[]
): AssessmentAnswer {

  const answer = answers.find(
    (answer) => answer.questionId === questionId
  );

  if (!answer) {
    throw new Error(
      `Missing answer for question ${questionId}`
    );
  }

  return answer;
}

/**
 * Score a single question.
 */
function scoreQuestion(
  question: AssessmentQuestion,
  answer: AssessmentAnswer
) {

  const weight = question.weight ?? 1;

  const maxOption =
    Math.max(
      ...question.options.map(
        (option) => option.value
      )
    );

  const adjusted =
    question.scoringDirection ===
    ScoringDirection.Positive
      ? answer.value
      : maxOption - answer.value;

  return {
    earned: adjusted * weight,
    possible: maxOption * weight,
  };
}