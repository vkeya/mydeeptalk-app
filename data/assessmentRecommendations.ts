export type AssessmentRecommendation = {
  assessmentId: string;
  specialties: string[];
  description: string;
};

export const assessmentRecommendations: AssessmentRecommendation[] = [
  {
    assessmentId: "anxiety",
    specialties: [
      "Anxiety",
      "CBT",
      "Stress Management",
    ],
    description:
      "Therapists specializing in anxiety support, cognitive behavioural therapy, and stress reduction.",
  },

  {
    assessmentId: "burnout",
    specialties: [
      "Burnout",
      "Stress Management",
      "Workplace Stress",
    ],
    description:
      "Therapists who support emotional exhaustion, workplace pressure, and recovery from burnout.",
  },

  {
    assessmentId: "substance-use",
    specialties: [
      "Substance Abuse",
      "Addiction",
      "Recovery",
    ],
    description:
      "Therapists experienced in addiction recovery and behaviour change support.",
  },

  {
    assessmentId: "relationships",
    specialties: [
      "Relationships",
      "Marriage & Couples Therapy",
      "Communication",
    ],
    description:
      "Therapists specializing in relationship challenges and couples counselling.",
  },

  {
    assessmentId: "parenting",
    specialties: [
      "Parenting",
      "Family Therapy",
      "Teenage Parenting",
    ],
    description:
      "Therapists supporting parenting challenges and family relationships.",
  },
];


export function getRecommendedSpecialties(
  assessmentId: string
): string[] {
  const recommendation =
    assessmentRecommendations.find(
      (item) => item.assessmentId === assessmentId
    );

  return recommendation?.specialties || [];
}