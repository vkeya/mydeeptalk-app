import { AssessmentDefinition } from "@/lib/assessment/types/AssessmentDefinition";

import { AssessmentScore } from "@/lib/assessment/types/AssessmentScore";
import {
  AssessmentResult,
  AssessmentIntelligence,
} from "@/lib/assessment/types/AssessmentResult";

/**
 * Assessment Framework 3.0
 *
 * Converts a calculated score into a complete interpreted
 * AssessmentResult.
 */
export class AssessmentResultBuilder {
  static build(
    assessment: AssessmentDefinition,
    score: AssessmentScore
  ): AssessmentResult {
    const definition = assessment.results.find(
      (r) => r.id === score.resultId
    );

    if (!definition) {
      throw new Error(
        `Result "${score.resultId}" not found for assessment "${assessment.metadata.id}".`
      );
    }

    return {
      id: definition.id,
	  
	  

      score,

      summary: {
  title: definition.title,
  observation: definition.observation,
  
},

      interpretation: {
        meaning: definition.meaning,
        strengths: definition.strengths,
        growthAreas: definition.growthAreas,
      },

      reflection: {
        question: definition.reflectionQuestion,
      },

      intelligence: {
        insights: [],
      } satisfies AssessmentIntelligence,

      nextSteps: {
        recommendations: {
          secondary: [],
          optional: [],
        },
      },
    };
  }
}

export default AssessmentResultBuilder;