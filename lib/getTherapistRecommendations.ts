import { getRecommendedSpecialties } from "@/data/assessmentRecommendations";

export function getTherapistRecommendations(
  assessmentId: string
) {
  const specialties = getRecommendedSpecialties(assessmentId);

  return {
    assessmentId,
    specialties,
  };
}