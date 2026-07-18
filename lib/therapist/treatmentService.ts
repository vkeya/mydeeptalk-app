import type {
  TreatmentWorkspaceData,
} from "@/types/therapist/treatment";

/**
 * Read-only treatment service.
 * Firestore implementation will replace this placeholder.
 */

export async function getClientTreatmentPlan(
  clientId: string
): Promise<TreatmentWorkspaceData> {
  void clientId;

  return {
    activeGoals: [],
    completedGoals: [],
  };
}