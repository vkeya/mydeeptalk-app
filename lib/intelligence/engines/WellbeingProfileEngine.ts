import { WellbeingProfile } from "../types/wellbeing";
import { Recommendation } from "../types/recommendation";

export class WellbeingProfileEngine {

  generate(profile: WellbeingProfile): WellbeingProfile {

    return profile;

  }

}

export class RecommendationEngine {

    generate(
        profile: WellbeingProfile
    ): Recommendation[] {

        return [];

    }

}