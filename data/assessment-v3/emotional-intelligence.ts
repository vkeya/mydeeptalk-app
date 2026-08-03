import {
  AssessmentDefinition,
  AssessmentQuestionOption,
} from "@/lib/assessment/types/AssessmentDefinition";

import {
  AssessmentCategory,
  ScoringDirection,
} from "@/lib/assessment/types/AssessmentEnums";

import { WellbeingDimension } from "@/lib/assessment/types/AssessmentDimensions";

const options: AssessmentQuestionOption[] = [
  {
    id: "0",
    text: "Never",
    value: 0,
  },
  {
    id: "1",
    text: "Rarely",
    value: 1,
  },
  {
    id: "2",
    text: "Sometimes",
    value: 2,
  },
  {
    id: "3",
    text: "Often",
    value: 3,
  },
];

export const emotionalIntelligenceAssessment: AssessmentDefinition = {
  metadata: {
    id: "emotional-intelligence",

    slug: "emotional-intelligence",

    version: 3,

    title: "Emotional Intelligence Assessment",

    description:
      "Discover how well you understand, regulate, and express emotions while building healthy relationships with others.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 3,

    icon: "brain",

    color: "#0EA5E9",
  },

  wellbeingDimensions: [
    WellbeingDimension.EmotionalRegulation,
    WellbeingDimension.Relationships,
  ],

  questions: [
    {
      id: "q1",
      text: "How often are you aware of what you are feeling?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q2",
      text:
        "How often do you pause before reacting when emotions are strong?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q3",
      text:
        "How often do you struggle to control your emotions?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q4",
      text:
        "How often do you try to understand how other people are feeling?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.Relationships,
      ],
      weight: 1,
    },

    {
      id: "q5",
      text:
        "How often do you become defensive when receiving feedback?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.Relationships,
      ],
      weight: 1,
    },

    {
      id: "q6",
      text:
        "How often do you express your emotions in healthy ways?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q7",
      text:
        "How often do misunderstandings occur because of how you communicate your emotions?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.Relationships,
      ],
      weight: 1,
    },

    {
      id: "q8",
      text:
        "How often do you recognize the emotional needs of others?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.Relationships,
      ],
      weight: 1,
    },

    {
      id: "q9",
      text:
        "How often do your emotions interfere with important decisions?",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },

    {
      id: "q10",
      text:
        "How often do you reflect on your emotional responses to learn from them?",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [
        WellbeingDimension.EmotionalRegulation,
      ],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Strong Emotional Intelligence",

      observation:
        "Your responses suggest a well-developed ability to understand and manage emotions while building healthy relationships.",

      meaning:
        "You appear to recognize your emotions, regulate them effectively, and respond thoughtfully to others.",

      strengths: [
        "Self-awareness",
        "Emotional regulation",
        "Empathy",
        "Healthy communication",
      ],

      growthAreas: [
        "Continue strengthening empathy",
        "Support others through emotionally intelligent leadership",
      ],

      reflectionQuestion:
        "How has emotional awareness helped you build stronger relationships in your life?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Emotional Intelligence",

      observation:
        "Your responses suggest good emotional awareness with opportunities to strengthen emotional regulation and interpersonal skills.",

      meaning:
        "Emotional intelligence grows through intentional reflection, active listening, empathy, and practice.",

      strengths: [
        "Growing self-awareness",
        "Open to personal growth",
      ],

      growthAreas: [
        "Manage emotional reactions",
        "Improve communication",
        "Strengthen empathy",
      ],

      reflectionQuestion:
        "Which emotional habit would make the biggest positive difference in your relationships?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Growth Opportunity in Emotional Intelligence",

      observation:
        "Your responses suggest that emotions may sometimes feel difficult to understand or manage, affecting relationships and decision-making.",

      meaning:
        "Emotional intelligence is a skill that can be developed through reflection, practice, coaching, and supportive relationships.",

      strengths: [
        "Shows willingness to reflect honestly",
        "Has taken an important first step toward personal growth",
      ],

      growthAreas: [
        "Develop self-awareness",
        "Improve emotional regulation",
        "Build empathy",
        "Strengthen healthy communication",
      ],

      reflectionQuestion:
        "What emotional pattern would you most like to change, and what might become possible if you did?",
    },
  ],
};

export default emotionalIntelligenceAssessment;