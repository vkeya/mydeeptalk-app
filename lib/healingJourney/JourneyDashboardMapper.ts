import { HealingJourney } from "./HealingJourney";
import { JourneyDashboardModel } from "./JourneyDashboardModel";

export class JourneyDashboardMapper {

  map(
    journey: HealingJourney
  ): JourneyDashboardModel {

    return {

      heroTitle:
        journey.recommendation.title,

      heroMessage:
        journey.recommendation.description,

      primaryActionLabel:
        journey.recommendation.actionLabel,

      primaryActionHref:
        journey.recommendation.actionHref,

      progress:
        journey.progress.overallProgress,

      wellbeingScore:
        journey.progress.wellbeingScore,

      consistencyScore:
        journey.progress.consistencyScore,

      engagementScore:
        journey.progress.engagementScore,

      momentum:
        journey.progress.momentum,

      riskLevel:
        journey.risk.level,

      milestones:
        journey.milestones,

      recommendation:
        journey.recommendation,
    };
  }

}

export const journeyDashboardMapper =
  new JourneyDashboardMapper();