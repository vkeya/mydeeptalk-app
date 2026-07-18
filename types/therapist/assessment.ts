export interface AssessmentSummary {
  totalCompleted: number;
  latestAssessment: string;
  averageScore: number;
  riskLevel: "Low" | "Moderate" | "High";
}

export interface AssessmentResult {
  id: string;
  name: string;
  completedAt: string;
  score: number;
  interpretation: string;
}

export interface AssessmentWorkspaceData {
  summary: AssessmentSummary;
  history: AssessmentResult[];
}