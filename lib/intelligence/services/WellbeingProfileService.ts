import { WellbeingEvidence } from "../types/evidence";
import { WellbeingProfile } from "../types/wellbeing";
import { WellbeingProfileEngine } from "../engines/WellbeingProfileEngine";
import { FirestoreWellbeingProfileRepository } from "../repositories/FirestoreWellbeingProfileRepository";
import { WellbeingProfileFactory } from "../factories/WellbeingProfileFactory";

export class WellbeingProfileService {
  private engine = new WellbeingProfileEngine();

  private repository =
    new FirestoreWellbeingProfileRepository();

  async getProfile(
    userId: string
  ): Promise<WellbeingProfile | null> {
    return await this.repository.getByUserId(userId);
  }

  async updateProfile(
    userId: string,
    evidence: WellbeingEvidence[]
  ): Promise<WellbeingProfile> {

    const existingProfile =
      await this.repository.getByUserId(userId);

    const profile =
      existingProfile ??
      WellbeingProfileFactory.create(userId);

    const updated =
      this.engine.generate(
        profile,
        evidence
      );

    await this.repository.save(
      userId,
      updated
    );

    return updated;
  }
}