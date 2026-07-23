import { WellbeingEvidence } from "../types/evidence";
import { WellbeingProfile } from "../types/wellbeing";
import { WellbeingProfileEngine } from "../engines/WellbeingProfileEngine";
import { WellbeingProfileRepository } from "../repositories/WellbeingProfileRepository";
import { WellbeingProfileFactory } from "../factories/WellbeingProfileFactory";

export class WellbeingProfileService {
  private engine = new WellbeingProfileEngine();

  private repository =
    new WellbeingProfileRepository();

  getProfile(
    userId: string
  ): WellbeingProfile | null {
    return this.repository.getByUserId(userId);
  }

  updateProfile(
    userId: string,
    evidence: WellbeingEvidence[]
  ): WellbeingProfile {

    const existingProfile =
      this.repository.getByUserId(userId);

    const profile =
      existingProfile ??
      WellbeingProfileFactory.create(userId);

    const updated =
      this.engine.generate(
        profile,
        evidence
      );

    this.repository.save(
      userId,
      updated
    );

    return updated;
  }
}