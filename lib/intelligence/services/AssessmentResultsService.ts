import { AssessmentResultsRepository } from "@/lib/intelligence/repositories/AssessmentResultsRepository";
import { AssessmentResult } from "@/lib/intelligence/types/assessmentResult";

export class AssessmentResultsService {
  private repository = new AssessmentResultsRepository();

  async getUserResults(
    userId: string
  ): Promise<AssessmentResult[]> {
    return this.repository.getByUserId(userId);
  }

  async getLatestResult(
    userId: string
  ): Promise<AssessmentResult | null> {
    const results = await this.getUserResults(userId);

    return results.length > 0 ? results[0] : null;
  }
  
  async getResult(id: string): Promise<AssessmentResult | null> {
  return this.repository.getById(id);
}
}