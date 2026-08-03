import { WellbeingProfile } from "../types/wellbeing";
import { WellbeingProfileService } from "./WellbeingProfileService";

export class WellbeingDashboardService {
  async getDashboard(
    userId: string
  ): Promise<WellbeingProfile | null> {
    const profileService =
      new WellbeingProfileService();

    return await profileService.getProfile(
      userId
    );
  }
}