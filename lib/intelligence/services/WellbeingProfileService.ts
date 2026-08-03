import { WellbeingEvidence } from "../types/evidence";
import { WellbeingProfile } from "../types/wellbeing";
import { WellbeingProfileEngine } from "../engines/WellbeingProfileEngine";
import { RecommendationEngine } from "../engines/RecommendationEngine";
import { FirestoreWellbeingProfileRepository } from "../repositories/FirestoreWellbeingProfileRepository";
import { WellbeingProfileFactory } from "../factories/WellbeingProfileFactory";
import { WellbeingProfileUpgrader } from "../upgraders/WellbeingProfileUpgrader";

export class WellbeingProfileService {
  private profileEngine = new WellbeingProfileEngine();

  private recommendationEngine =
    new RecommendationEngine();

  private repository =
    new FirestoreWellbeingProfileRepository();

  private upgrader =
    new WellbeingProfileUpgrader();

  async getProfile(
    userId: string
  ): Promise<WellbeingProfile | null> {
    const profile =
      await this.repository.getByUserId(userId);

    if (!profile) {
      return null;
    }

    const upgraded =
      this.upgrader.upgrade(profile);

    await this.repository.save(
      userId,
      upgraded
    );

    return upgraded;
  }

  async updateProfile(
    userId: string,
    evidence: WellbeingEvidence[]
  ): Promise<WellbeingProfile> {
    const existingProfile =
      await this.getProfile(userId);

    const profile =
      existingProfile ??
      WellbeingProfileFactory.create(userId);

    const updatedProfile =
      this.profileEngine.generate(
        profile,
        evidence
      );

    const recommendations =
      this.recommendationEngine.generate(
        updatedProfile
      );

    const finalProfile =
      this.upgrader.upgrade({
        ...updatedProfile,
        recommendations,
      });

    await this.repository.save(
      userId,
      finalProfile
    );

    return finalProfile;
  }
}