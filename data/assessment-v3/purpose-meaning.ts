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
    text: "Strongly Disagree",
    value: 0,
  },
  {
    id: "1",
    text: "Disagree",
    value: 1,
  },
  {
    id: "2",
    text: "Agree",
    value: 2,
  },
  {
    id: "3",
    text: "Strongly Agree",
    value: 3,
  },
];

export const purposeMeaningAssessment: AssessmentDefinition = {
  metadata: {
    id: "purpose-meaning",

    slug: "purpose-meaning",

    version: 3,

    title: "Purpose & Meaning Assessment",

    description:
      "Explore your sense of purpose, direction, and meaning to better understand how connected you feel to the life you are building.",

    category: AssessmentCategory.PersonalGrowth,

    estimatedDurationMinutes: 3,

    icon: "compass",

    color: "#8B5CF6",
  },

  wellbeingDimensions: [
    WellbeingDimension.Purpose,
    WellbeingDimension.Identity,
  ],

  questions: [
    {
      id: "q1",
      text: "I have a clear sense of purpose in my life.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q2",
      text: "My daily activities feel meaningful to me.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q3",
      text: "I often feel that my life lacks direction.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q4",
      text: "I know what matters most to me.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q5",
      text: "I feel motivated by the future I am creating.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q6",
      text: "I often question whether my life has meaning.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q7",
      text: "My decisions are guided by my personal values.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q8",
      text: "I feel disconnected from the person I want to become.",
      options,
      scoringDirection: ScoringDirection.Positive,
      wellbeingDimensions: [WellbeingDimension.Identity],
      weight: 1,
    },

    {
      id: "q9",
      text: "I believe my life has a positive impact on others.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },

    {
      id: "q10",
      text: "Overall, I feel fulfilled by the life I am living.",
      options,
      scoringDirection: ScoringDirection.Reverse,
      wellbeingDimensions: [WellbeingDimension.Purpose],
      weight: 1,
    },
  ],

  results: [
    {
      id: "low",

      minScore: 0,

      maxScore: 9,

      title: "Strong Sense of Purpose",

      observation:
        "Your responses suggest that you have a healthy sense of meaning, direction, and purpose.",

      meaning:
        "You appear to understand what matters most to you and are building a life that reflects your values and aspirations.",

      strengths: [
        "Clear life direction",
        "Strong personal values",
        "Healthy motivation",
        "Sense of fulfillment",
      ],

      growthAreas: [
        "Continue investing in meaningful goals",
        "Help others discover their purpose",
      ],

      reflectionQuestion:
        "What gives your life the deepest sense of meaning, and how can you nurture it further?",
    },

    {
      id: "moderate",

      minScore: 10,

      maxScore: 19,

      title: "Developing Purpose",

      observation:
        "Your responses suggest that you are still discovering what brings meaning and fulfillment to your life.",

      meaning:
        "Purpose often develops gradually through experiences, relationships, service, and intentional reflection.",

      strengths: [
        "Growing self-awareness",
        "Open to personal growth",
      ],

      growthAreas: [
        "Clarify long-term goals",
        "Strengthen personal values",
        "Build meaningful routines",
      ],

      reflectionQuestion:
        "If fear and uncertainty disappeared, what kind of life would you choose to build?",
    },

    {
      id: "high",

      minScore: 20,

      maxScore: 30,

      title: "Purpose Needs Attention",

      observation:
        "Your responses suggest that you may currently feel disconnected from purpose, meaning, or direction.",

      meaning:
        "Many people experience seasons of uncertainty. Exploring your strengths, values, relationships, and passions can help rebuild a meaningful direction for your life.",

      strengths: [
        "Shows courage through honest reflection",
        "Has taken an important first step toward self-discovery",
      ],

      growthAreas: [
        "Reconnect with purpose",
        "Clarify personal identity",
        "Create meaningful goals",
        "Develop hope for the future",
      ],

      reflectionQuestion:
        "If you could wake up tomorrow knowing exactly why you are here, what would be different about how you live your life?",
    },
  ],
};

export default purposeMeaningAssessment;