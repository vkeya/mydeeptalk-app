import { AssessmentSession } from "@/lib/assessment/types/AssessmentSession";

export class AssessmentSessionRepository {
  async save(session: AssessmentSession): Promise<void> {
    // TODO: Firestore implementation
  }

  async getById(
    sessionId: string
  ): Promise<AssessmentSession | null> {
    return null;
  }

  async getUserSessions(
    userId: string
  ): Promise<AssessmentSession[]> {
    return [];
  }
}