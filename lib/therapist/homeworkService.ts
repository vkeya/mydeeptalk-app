import type {
  HomeworkWorkspaceData,
} from "@/types/therapist/homework";

/**
 * ------------------------------------------------------------
 * Homework Service
 * ------------------------------------------------------------
 *
 * Read-only service responsible for retrieving homework data.
 *
 * Firestore integration will replace the placeholder
 * implementation in the next iteration.
 * ------------------------------------------------------------
 */

export async function getClientHomework(
  clientId: string
): Promise<HomeworkWorkspaceData> {
  // Placeholder until Firestore integration
  void clientId;

  return {
    active: [],
    completed: [],
  };
}