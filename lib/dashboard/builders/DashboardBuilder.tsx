import { DashboardIntelligence } from "../dashboardIntelligence";
import {
  ContinueHealingModel,
  DashboardViewModel,
  HealingTimelineModel,
  InsightModel,
  JourneyProgressModel,
  TodaysFocusModel,
  ToolkitModel,
  WelcomeSection,
} from "../types";

export class DashboardBuilder {
  build(params: {
    welcome: WelcomeSection;
    todaysFocus: TodaysFocusModel;
    progress: JourneyProgressModel;
    insight: InsightModel;
    continueHealing: ContinueHealingModel;
    toolkit: ToolkitModel;
    timeline: HealingTimelineModel;
	intelligence: DashboardIntelligence;
  }): DashboardViewModel {
    return {
      welcome: params.welcome,
      todaysFocus: params.todaysFocus,
      progress: params.progress,
      insight: params.insight,
      continueHealing: params.continueHealing,
      toolkit: params.toolkit,
      timeline: params.timeline,
	  intelligence: params.intelligence,
    };
  }
}

export const dashboardBuilder = new DashboardBuilder();