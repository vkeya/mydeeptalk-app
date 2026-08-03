export interface HealingArea {
  slug: string;

  title: string;

  subtitle: string;

  overview: string;

  whyItMatters: string;

  challenges: string[];

  warningSigns: string[];

  healingSteps: string[];

  assessmentHref: string;

  journalHref: string;

  checkInHref: string;

  therapistHref: string;

  insight: string;
}

export const healingAreas: HealingArea[] = [
  {
    slug: "relationships",

    title: "Relationships",

    subtitle:
      "Healthy relationships begin with understanding yourself.",

    overview:
      "Relationships are one of the greatest influences on our emotional wellbeing. They can be a source of love, belonging, and support, but they can also become a source of stress, conflict, disappointment, and pain. Building healthy relationships begins with understanding your own thoughts, emotions, communication style, and needs.",

    whyItMatters:
      "Strong relationships contribute to better emotional health, resilience, confidence, and overall wellbeing. Learning healthier relationship patterns can improve communication, rebuild trust, strengthen emotional intimacy, and create more meaningful connections with others.",

    challenges: [
      "Communication difficulties",
      "Trust and betrayal",
      "Conflict resolution",
      "Emotional intimacy",
      "Dating challenges",
      "Marriage difficulties",
      "Attachment patterns",
      "Setting healthy boundaries",
    ],

    warningSigns: [
      "Frequent unresolved conflict",
      "Feeling emotionally disconnected",
      "Difficulty trusting others",
      "Fear of abandonment",
      "Repeating unhealthy relationship patterns",
      "Feeling unheard or misunderstood",
      "Constant anxiety within relationships",
      "Difficulty expressing emotions",
    ],

    healingSteps: [
      "Practice honest and respectful communication.",
      "Reflect on your emotional needs before reacting.",
      "Develop healthy personal boundaries.",
      "Learn to recognise recurring relationship patterns.",
      "Strengthen emotional awareness through daily reflection.",
      "Seek professional support when relationships feel overwhelming.",
    ],

    assessmentHref: "/assessment",

    journalHref: "/journal",

    checkInHref: "/check-in",

    therapistHref: "/therapists",

    insight:
      "Healthy relationships begin with a healthy relationship with yourself. Small moments of self-awareness often create the biggest improvements in how we connect with others.",
  },
];