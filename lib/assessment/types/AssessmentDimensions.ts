/**
 * Assessment Framework 3.0
 * Shared wellbeing dimensions used throughout MyDeepTalk.
 */

export type WellbeingDimensionCategory =
  | "identity"
  | "emotional"
  | "relationships"
  | "lifestyle"
  | "functioning"
  | "flourishing";

export interface WellbeingDimension {
  id: string;
  name: string;
  description: string;
  category: WellbeingDimensionCategory;
  
  icon: string;
  color: string;
}

export const WELLBEING_DIMENSIONS = {
  IDENTITY: {
    id: "identity",
    name: "Identity",
    description: "Understanding who you are and how you see yourself.",
    category: "identity",
  },

  PURPOSE: {
    id: "purpose",
    name: "Purpose",
    description: "Sense of meaning, direction, and fulfillment.",
    category: "identity",
  },

  SELF_ESTEEM: {
    id: "self-esteem",
    name: "Self-Esteem",
    description: "Confidence and self-worth.",
    category: "identity",
  },

  EMOTIONAL_REGULATION: {
    id: "emotional-regulation",
    name: "Emotional Regulation",
    description: "Ability to manage and respond to emotions.",
    category: "emotional",
  },

  RESILIENCE: {
    id: "resilience",
    name: "Resilience",
    description: "Capacity to recover from adversity.",
    category: "emotional",
  },
  
  ANXIETY: {
  id: "anxiety",
  name: "Anxiety",
  description: "Experiences of excessive worry, fear, or nervousness that affect daily functioning.",
  category: "emotional",
  icon: "brain",
  color: "#F59E0B",
},

DEPRESSION: {
  id: "depression",
  name: "Depression",
  description: "Persistent feelings of sadness, hopelessness, or loss of interest in life.",
  category: "emotional",
  icon: "cloud-rain",
  color: "#6366F1",
},

BURNOUT: {
  id: "burnout",
  name: "Burnout",
  description: "Physical, emotional, and mental exhaustion caused by prolonged stress.",
  category: "emotional",
  icon: "battery-warning",
  color: "#EF4444",
},

ANGER: {
  id: "anger",
  name: "Anger",
  description: "The ability to recognize, manage, and express anger in healthy ways.",
  category: "emotional",
  icon: "flame",
  color: "#DC2626",
},

TRAUMA: {
  id: "trauma",
  name: "Trauma",
  description: "The impact of distressing or overwhelming experiences on emotional wellbeing.",
  category: "emotional",
  icon: "shield-alert",
  color: "#7C3AED",
},

GRIEF: {
  id: "grief",
  name: "Grief",
  description: "Emotional responses to significant loss, change, or bereavement.",
  category: "emotional",
  icon: "heart-crack",
  color: "#8B5CF6",
},

LONELINESS: {
  id: "loneliness",
  name: "Loneliness",
  description: "Feelings of social isolation or lacking meaningful connection with others.",
  category: "relationships",
  icon: "user-minus",
  color: "#3B82F6",
},

RELATIONSHIP_SATISFACTION: {
  id: "relationship-satisfaction",
  name: "Relationship Satisfaction",
  description: "Overall quality, trust, communication, and fulfillment in close relationships.",
  category: "relationships",
  icon: "heart",
  color: "#EC4899",
},

SOCIAL_CONNECTION: {
  id: "social-connection",
  name: "Social Connection",
  description: "Sense of belonging, support, and connection with family, friends, and community.",
  category: "relationships",
  icon: "users",
  color: "#0EA5E9",
},

COMMUNICATION: {
  id: "communication",
  name: "Communication",
  description: "Ability to express thoughts, emotions, and needs clearly and respectfully.",
  category: "relationships",
  icon: "messages-square",
  color: "#14B8A6",
},

SUPPORT: {
  id: "support",
  name: "Support",
  description: "Availability and quality of emotional, practical, and social support.",
  category: "relationships",
  icon: "hand-heart",
  color: "#10B981",
},

PARENTING: {
  id: "parenting",
  name: "Parenting",
  description: "Confidence, wellbeing, and effectiveness in parenting and caregiving roles.",
  category: "relationships",
  icon: "baby",
  color: "#F97316",
},

WORK_LIFE_BALANCE: {
  id: "work-life-balance",
  name: "Work-Life Balance",
  description: "Maintaining a healthy balance between work responsibilities and personal life.",
  category: "lifestyle",
  icon: "scale",
  color: "#06B6D4",
},

SUBSTANCE_USE: {
  id: "substance-use",
  name: "Substance Use",
  description: "Patterns of alcohol or substance use and their impact on wellbeing.",
  category: "lifestyle",
  icon: "pill",
  color: "#B91C1C",
},

FINANCIAL_WELLBEING: {
  id: "financial-wellbeing",
  name: "Financial Wellbeing",
  description: "Confidence, security, and healthy management of personal finances.",
  category: "functioning",
  icon: "wallet",
  color: "#22C55E",
},

LIFE_SATISFACTION: {
  id: "life-satisfaction",
  name: "Life Satisfaction",
  description: "Overall satisfaction with life, achievements, and personal circumstances.",
  category: "functioning",
  icon: "smile",
  color: "#84CC16",
},

OPTIMISM: {
  id: "optimism",
  name: "Optimism",
  description: "A hopeful and positive outlook toward the future and life's possibilities.",
  category: "flourishing",
  icon: "sunrise",
  color: "#FACC15",
},

  STRESS: {
    id: "stress",
    name: "Stress",
    description: "Current level of psychological stress.",
    category: "emotional",
  },

  RECOVERY: {
    id: "recovery",
    name: "Recovery",
    description: "Restoration of physical and mental energy.",
    category: "lifestyle",
  },

  SLEEP: {
    id: "sleep",
    name: "Sleep",
    description: "Quality and consistency of sleep.",
    category: "lifestyle",
  },

  RELATIONSHIPS: {
    id: "relationships",
    name: "Relationships",
    description: "Quality of personal relationships.",
    category: "relationships",
  },

  CONNECTION: {
    id: "connection",
    name: "Connection",
    description: "Feeling socially connected and supported.",
    category: "relationships",
  },

  EMOTIONAL_INTELLIGENCE: {
    id: "emotional-intelligence",
    name: "Emotional Intelligence",
    description: "Awareness and understanding of emotions.",
    category: "emotional",
  },

  HOPE: {
    id: "hope",
    name: "Hope",
    description: "Optimism about the future.",
    category: "flourishing",
  },

  MEANING: {
    id: "meaning",
    name: "Meaning",
    description: "Feeling that life has significance.",
    category: "flourishing",
  },

  MINDFULNESS: {
    id: "mindfulness",
    name: "Mindfulness",
    description: "Present-moment awareness and acceptance.",
    category: "flourishing",
  },

  SELF_COMPASSION: {
    id: "self-compassion",
    name: "Self-Compassion",
    description: "Treating yourself with kindness and understanding.",
    category: "identity",
  },

  PHYSICAL_WELLBEING: {
    id: "physical-wellbeing",
    name: "Physical Wellbeing",
    description: "Overall physical health and vitality.",
    category: "lifestyle",
  },

  SOCIAL_WELLBEING: {
    id: "social-wellbeing",
    name: "Social Wellbeing",
    description: "Participation in healthy social relationships.",
    category: "relationships",
  },

  SPIRITUAL_WELLBEING: {
    id: "spiritual-wellbeing",
    name: "Spiritual Wellbeing",
    description: "Connection to faith, values, or a sense of transcendence.",
    category: "flourishing",
  },

  SAFETY: {
    id: "safety",
    name: "Safety",
    description: "Feeling emotionally and physically safe.",
    category: "lifestyle",
  },

  GROWTH: {
    id: "growth",
    name: "Growth",
    description: "Personal development and continuous learning.",
    category: "flourishing",
  },
} as const;

export const WellbeingDimension = {
  ...WELLBEING_DIMENSIONS,

  Identity: WELLBEING_DIMENSIONS.IDENTITY.id,
  Purpose: WELLBEING_DIMENSIONS.PURPOSE.id,

  EmotionalRegulation:
  WELLBEING_DIMENSIONS.EMOTIONAL_REGULATION.id,
WorkLifeBalance:
  WELLBEING_DIMENSIONS.WORK_LIFE_BALANCE.id,

  Relationships: WELLBEING_DIMENSIONS.RELATIONSHIPS.id,

 Stress: WELLBEING_DIMENSIONS.STRESS.id,

  Financial: WELLBEING_DIMENSIONS.FINANCIAL_WELLBEING.id,

PhysicalHealth: WELLBEING_DIMENSIONS.PHYSICAL_WELLBEING.id,

 LifeSatisfaction: WELLBEING_DIMENSIONS.LIFE_SATISFACTION.id,
  Growth: WELLBEING_DIMENSIONS.GROWTH.id,
} as const;

export type WellbeingDimensionId =
  (typeof WELLBEING_DIMENSIONS)[keyof typeof WELLBEING_DIMENSIONS]["id"];

export const wellbeingDimensions = Object.values(WELLBEING_DIMENSIONS);