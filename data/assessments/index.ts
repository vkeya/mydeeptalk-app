import { anxietyAssessment } from "./anxiety";

import { AssessmentCatalog } from "@/lib/assessment/AssessmentCatalog";

export const assessmentCatalog =
  new AssessmentCatalog([
    anxietyAssessment,
  ]);