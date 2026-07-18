import type { SessionWorkspaceData } from "@/types/therapist/session";

export async function getClientSessions(
  clientId: string
): Promise<SessionWorkspaceData> {
  // Placeholder until Firestore integration
  void clientId;

  return {
    nextSession: undefined,
    history: [],
  };
}