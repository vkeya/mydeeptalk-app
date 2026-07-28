import { WellbeingProfile } from "./WellbeingProfile";

export interface AssessmentRecommendation {
  id: string;
  title: string;
  reason: string;
}

export interface AssessmentIntelligenceResult {
  wellbeingProfile: WellbeingProfile;

  recommendations: AssessmentRecommendation[];
}