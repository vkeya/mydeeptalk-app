import { WellbeingProfile } from "@/lib/intelligence/types/wellbeing";

export function buildHeroInsight(
  profile: WellbeingProfile
): string {
  if (
    profile.strengths.length === 0 &&
    profile.growthAreas.length === 0
  ) {
    return "Every journey begins with understanding yourself. Continue exploring your wellbeing one step at a time.";
  }

  const strongest =
    profile.strengths[0];

  const growth =
    profile.growthAreas[0];

  if (strongest && growth) {
    return `You're building strength in ${strongest}. Continuing to invest in ${growth} could further improve your wellbeing.`;
  }

  if (strongest) {
    return `You're making encouraging progress in ${strongest}. Keep building on that momentum.`;
  }

  if (growth) {
    return `Focusing on ${growth} could be a meaningful next step in your wellbeing journey.`;
  }

  return "Keep investing in your emotional wellbeing.";
}