import {
  AssessmentDefinition,
  AssessmentResultDefinition,
} from "../types/AssessmentDefinition";

import { AssessmentScore } from "../types/AssessmentScore";

import {
  AssessmentResult,
  AssessmentSummary,
  AssessmentInterpretation,
  AssessmentReflection,
  AssessmentIntelligence,
  AssessmentNextSteps,
} from "../types/AssessmentResult";

/**
 * Builds a user-facing assessment result from a scored assessment.
 */
export function buildAssessmentResult(
  definition: AssessmentDefinition,
  score: AssessmentScore
): AssessmentResult {
  const resultDefinition = findResultDefinition(
    definition,
    score.resultId
  );

  const summary: AssessmentSummary = {
    title: resultDefinition.title,
    observation: resultDefinition.observation,
  };

  const interpretation: AssessmentInterpretation = {
    meaning: resultDefinition.meaning,
    strengths: resultDefinition.strengths,
    growthAreas: resultDefinition.growthAreas,
  };

  const reflection: AssessmentReflection = {
    question: resultDefinition.reflectionQuestion,
  };

  const intelligence: AssessmentIntelligence = {
    insights: [],
  };

  const nextSteps: AssessmentNextSteps = {
    recommendations: {
      secondary: [],
      optional: [],
    },
  };

  return {
    id: resultDefinition.id,
    score,
    summary,
    interpretation,
    reflection,
    intelligence,
    nextSteps,
  };
}

/**
 * Finds the matching result definition.
 */
function findResultDefinition(
  definition: AssessmentDefinition,
  resultId: string
): AssessmentResultDefinition {
  const result = definition.results.find(
    (item) => item.id === resultId
  );

  if (!result) {
    throw new Error(
      `Result definition "${resultId}" not found for assessment "${definition.metadata.id}".`
    );
  }

  return result;
}