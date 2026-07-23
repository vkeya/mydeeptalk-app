import { WellbeingProfile } from "../types/wellbeing";
import { AssessmentEvidenceAdapter } from "../adapters/AssessmentEvidenceAdapter";
import { WellbeingProfileService } from "./WellbeingProfileService";
import { WellbeingDimension } from "../framework/dimensions";

export interface AssessmentIntelligenceInput {
  assessmentId: string;
  score: number;
  maxScore: number;
  wellbeingDimension?: WellbeingDimension;
}

export class AssessmentIntelligenceService {
  private wellbeingService = new WellbeingProfileService();

  processAssessment(
    userId: string,
    input: AssessmentIntelligenceInput
  ): WellbeingProfile | null {

    const evidence =
      AssessmentEvidenceAdapter.build(input);

    if (!evidence) {
      return null;
    }

    return this.wellbeingService.updateProfile(
      userId,
      [evidence]
    );
  }
}