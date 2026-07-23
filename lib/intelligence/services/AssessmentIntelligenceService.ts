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

  async processAssessment(
    userId: string,
    input: AssessmentIntelligenceInput
  ): Promise<WellbeingProfile | null> {

    const evidence =
      AssessmentEvidenceAdapter.build(input);

    if (!evidence) {
      return null;
    }

    return await this.wellbeingService.updateProfile(
      userId,
      [evidence]
    );
  }
}