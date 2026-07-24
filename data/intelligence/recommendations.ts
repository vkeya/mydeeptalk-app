import { WellbeingDimension } from "@/lib/intelligence/framework/dimensions";

export interface DimensionRecommendation {
  title: string;
  message: string;
  actionLabel: string;
  actionHref: string;
}

export const dimensionRecommendations: Partial<
  Record<WellbeingDimension, DimensionRecommendation>
> = {
  identity: {
    title: "Reconnect With Yourself",
    message:
      "Spend time exploring who you are and the values that shape your life.",
    actionLabel: "Continue Meeting Yourself",
    actionHref: "/journey/meeting-yourself",
  },

  emotionalRegulation: {
    title: "Strengthen Emotional Regulation",
    message:
      "Develop healthy ways of understanding and responding to your emotions.",
    actionLabel: "Continue Emotional Growth",
    actionHref: "/journey/emotional-regulation",
  },

  healing: {
    title: "Continue Your Healing",
    message:
      "Healing grows through consistent reflection, compassion, and patience.",
    actionLabel: "Continue Healing",
    actionHref: "/journey/healing",
  },

  relationships: {
    title: "Strengthen Relationships",
    message:
      "Healthy relationships begin with understanding yourself and others.",
    actionLabel: "Explore Relationships",
    actionHref: "/journey/relationships",
  },

  resilience: {
    title: "Build Resilience",
    message:
      "Strengthen your ability to recover and grow through life's challenges.",
    actionLabel: "Build Resilience",
    actionHref: "/journey/resilience",
  },

  purpose: {
    title: "Discover Your Purpose",
    message:
      "Explore what gives your life meaning and direction.",
    actionLabel: "Explore Purpose",
    actionHref: "/journey/purpose",
  },
};