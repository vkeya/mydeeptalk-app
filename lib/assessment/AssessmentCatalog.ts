import { AssessmentDefinition } from "./types/AssessmentDefinition";

import {
  angerManagementAssessment,
  anxietyAssessment,
  burnoutAssessment,
  depressionAssessment,
  emotionalIntelligenceAssessment,
  emotionalRegulationAssessment,
  financialWellbeingAssessment,
  griefLossAssessment,
  lifeSatisfactionAssessment,
  lonelinessAssessment,
  mindfulnessAssessment,
  optimismAssessment,
  parentingWellbeingAssessment,
  purposeMeaningAssessment,
  relationshipSatisfactionAssessment,
  resilienceAssessment,
  selfCompassionAssessment,
  selfEsteemAssessment,
  sleepWellbeingAssessment,
  socialConnectionAssessment,
  stressAssessment,
  substanceUseAssessment,
  traumaAssessment,
  workLifeBalanceAssessment,
} from "@/data/assessment-v3";

export const AssessmentCatalog: AssessmentDefinition[] = [
  anxietyAssessment,
  depressionAssessment,
  stressAssessment,
  burnoutAssessment,
  selfEsteemAssessment,
  lonelinessAssessment,
  griefLossAssessment,
  traumaAssessment,
  angerManagementAssessment,
  sleepWellbeingAssessment,
  emotionalIntelligenceAssessment,
  lifeSatisfactionAssessment,
  purposeMeaningAssessment,
  relationshipSatisfactionAssessment,
  workLifeBalanceAssessment,
  financialWellbeingAssessment,
  parentingWellbeingAssessment,
  substanceUseAssessment,
  resilienceAssessment,
  mindfulnessAssessment,
  socialConnectionAssessment,
  emotionalRegulationAssessment,
  selfCompassionAssessment,
  optimismAssessment,
];

export class AssessmentCatalogService {
  static getAll(): AssessmentDefinition[] {
    return AssessmentCatalog;
  }

  static getById(id: string): AssessmentDefinition | undefined {
    return AssessmentCatalog.find(
      (assessment) => assessment.metadata.id === id
    );
  }

  static getBySlug(slug: string): AssessmentDefinition | undefined {
    return AssessmentCatalog.find(
      (assessment) => assessment.metadata.slug === slug
    );
  }

  static getByCategory(category: string): AssessmentDefinition[] {
    return AssessmentCatalog.filter(
      (assessment) => assessment.metadata.category === category
    );
  }

  static has(id: string): boolean {
    return AssessmentCatalog.some(
      (assessment) => assessment.metadata.id === id
    );
  }
}

export default AssessmentCatalogService;