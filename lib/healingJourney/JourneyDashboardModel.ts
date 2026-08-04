import { JourneyMilestone } from "./JourneyMilestone";
import { JourneyRecommendation } from "./JourneyRecommendation";
import { RiskLevel } from "./JourneyRisk";

export interface JourneyDashboardModel {
  heroTitle: string;

  heroMessage: string;

  primaryActionLabel: string;

  primaryActionHref: string;

  progress: number;

  wellbeingScore: number;

  consistencyScore: number;

  engagementScore: number;

  momentum: string;

  riskLevel: RiskLevel;

  milestones: JourneyMilestone[];

  recommendation: JourneyRecommendation;
}