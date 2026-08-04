import { JourneyRecommendation } from "./JourneyRecommendation";
import { JourneyProgress } from "./JourneyProgress";
import { JourneyRisk } from "./JourneyRisk";
import { JourneyMilestone } from "./JourneyMilestone";

export interface HealingJourney {
  recommendation: JourneyRecommendation;

  progress: JourneyProgress;

  risk: JourneyRisk;

  milestones: JourneyMilestone[];
}