import { AssessmentDefinition } from "@/lib/assessment/types/AssessmentDefinition";
import {
  AssessmentCategory,
  AssessmentStatus,
  ScoringDirection,
} from "@/lib/assessment/types/AssessmentEnums";
import { WELLBEING_DIMENSIONS } from "@/lib/assessment/types/AssessmentDimensions";

export const anxietyAssessment: AssessmentDefinition = {
  metadata: {
    id: "anxiety",
    slug: "anxiety",
    version: 1,

    title: "Anxiety Assessment",

    description:
      "Measure the frequency and impact of anxiety-related experiences.",

    estimatedMinutes: 3,

    category: AssessmentCategory.Clinical,

    status: AssessmentStatus.Active,
  },

  primaryDimension: WELLBEING_DIMENSIONS.STRESS.id,

  secondaryDimensions: [
    WELLBEING_DIMENSIONS.EMOTIONAL_REGULATION.id,
    WELLBEING_DIMENSIONS.RESILIENCE.id,
  ],


questions: [
  {
    id: "anxiety-q1",

    text: "Over the last two weeks, how often have you felt nervous or anxious?",

    options: [
      {
        id: "never",
        label: "Never",
        value: 0,
      },
      {
        id: "sometimes",
        label: "Sometimes",
        value: 1,
      },
      {
        id: "often",
        label: "Often",
        value: 2,
      },
      {
        id: "almost-always",
        label: "Almost Always",
        value: 3,
      },
    ],

    scoringDirection: ScoringDirection.Negative,

    wellbeingDimensions: [
      WELLBEING_DIMENSIONS.STRESS.id,
    ],
  },
],

results: [
  {
    id: "minimal",

    title: "Minimal Anxiety",

    observation:
      "Your responses suggest very low levels of anxiety.",

    meaning:
      "Your current responses indicate that anxiety is unlikely to be significantly affecting your wellbeing.",

    strengths: [
      "Emotional stability",
    ],

    growthAreas: [],

    reflectionQuestion:
      "What habits are helping you maintain your emotional wellbeing?",

    minScore: 0,

    maxScore: 25,
  },
],
};