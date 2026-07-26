import { AssessmentIntelligenceService } from "@/lib/intelligence/services/AssessmentIntelligenceService";
import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";

export class AssessmentIntelligenceEngine {
  private intelligenceService =
    new AssessmentIntelligenceService();

  async processWellbeingUpdate(
    userId: string,
    assessmentId: string,
    score: number,
    maxScore: number,
    wellbeingDimension?: WellbeingDimension
  ) {
    return this.intelligenceService.processAssessment(
      userId,
      {
        assessmentId,
        score,
        maxScore,
        wellbeingDimension,
      }
    );
  }
}

export default AssessmentIntelligenceEngine;