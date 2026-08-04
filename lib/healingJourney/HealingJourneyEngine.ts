import { HealingJourney } from "./HealingJourney";
import { JourneyState } from "./JourneyState";

import { recommendationEngine } from "./RecommendationEngine";
import { progressEngine } from "./ProgressEngine";
import { riskEngine } from "./RiskEngine";
import { milestoneEngine } from "./MilestoneEngine";

export class HealingJourneyEngine {

  build(
    state: JourneyState
  ): HealingJourney {

    const progress =
      progressEngine.buildProgress(state);

    const recommendation =
      recommendationEngine.buildRecommendation(state);

    const risk =
      riskEngine.buildRisk(state);

    const milestones =
      milestoneEngine.buildMilestones(state);

    return {
      recommendation,
      progress,
      risk,
      milestones,
    };
  }

}

export const healingJourneyEngine =
  new HealingJourneyEngine();