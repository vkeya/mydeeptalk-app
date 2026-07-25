import {
  AssessmentScoringEngine,
  AssessmentResultLevel,
} from "./AssessmentScoringEngine";
import { AssessmentIntelligenceService } from "@/lib/intelligence/services/AssessmentIntelligenceService";
import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";


export class AssessmentIntelligenceEngine {
  private scoringEngine = new AssessmentScoringEngine();
  
  private intelligenceService = new AssessmentIntelligenceService();
  
  scoreAssessment(
    values: number[],
    levels?: AssessmentResultLevel[]
  ) {
    return this.scoringEngine.calculate({
      values,
      levels,
    });
  }
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



