/**
 * ------------------------------------------------------------------
 * Assessment Adapter
 * ------------------------------------------------------------------
 *
 * Translates assessment data into a format understood
 * by the Intelligence Layer.
 *
 * This class does not perform scoring.
 * It simply normalizes data.
 */

export interface AssessmentSnapshot {
  completedAssessments: number;

  latestAssessmentDate?: Date;

  latestResults: string[];

  flaggedConcerns: string[];
}

export class AssessmentAdapter {
  async getSnapshot(clientId: string): Promise<AssessmentSnapshot> {
    /**
     * Future:
     * Read completed assessments
     * Summarize latest scores
     * Extract flagged domains
     */

    return {
      completedAssessments: 0,
      latestResults: [],
      flaggedConcerns: [],
    };
  }
}