export interface AssessmentResult {
  id: string;

  assessmentId: string;

  title: string;

  category: string;

  score: number;

  maxScore: number;

  level: string;

  message: string;

  createdAt: Date;

  userId: string;

  userEmail: string;

  wellbeingDimension?: string;
}