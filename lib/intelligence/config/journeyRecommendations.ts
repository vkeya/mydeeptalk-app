import { WellbeingDimension } from "../framework/dimensions";

export const journeyRecommendations: Partial<
  Record<WellbeingDimension, string>
> = {
  [WellbeingDimension.Identity]: "meeting-yourself",

  [WellbeingDimension.LifeStory]: "life-story-meaning",

  [WellbeingDimension.EmotionalRegulation]:
    "emotional-regulation",

  [WellbeingDimension.Healing]:
    "healing-from-the-past",

  [WellbeingDimension.Resilience]:
    "resilience-strength",

  [WellbeingDimension.Boundaries]:
    "boundaries-self-protection",

  [WellbeingDimension.Relationships]:
    "attachment-relationships",

  [WellbeingDimension.Connection]:
    "love-connection",

  [WellbeingDimension.Purpose]:
    "purpose-future-self",

  [WellbeingDimension.SelfCompassion]:
    "wholeness-self-compassion",
};