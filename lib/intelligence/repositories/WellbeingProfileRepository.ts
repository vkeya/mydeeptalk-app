import { WellbeingProfile } from "../types/wellbeing";

export class WellbeingProfileRepository {
  private profiles = new Map<string, WellbeingProfile>();

  getByUserId(
    userId: string
  ): WellbeingProfile | null {
    return this.profiles.get(userId) ?? null;
  }

  save(
    userId: string,
    profile: WellbeingProfile
  ): void {
    this.profiles.set(userId, profile);
  }
}