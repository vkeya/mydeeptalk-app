import {
  WellbeingProfile,
} from "@/lib/intelligence/models/WellbeingProfile";


import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";

export interface BuildProfileRequest {
  profile: WellbeingProfile | null;

  assessmentId: string;

  score: number;

  maxScore: number;

  wellbeingDimension?: WellbeingDimension;
}

export class WellbeingProfileBuilder {
  build(request: BuildProfileRequest): WellbeingProfile {
	  throw new Error("WellbeingProfileBuilder.build() is not yet implemented.");
    // implementation
  }
}