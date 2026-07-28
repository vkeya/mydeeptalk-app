import { DashboardAction } from "./DashboardAction";

export interface DashboardDomainSummary {
  /**
   * The primary action this domain recommends for the user.
   */
  nextAction: DashboardAction | null;

  /**
   * Overall completion/progress for this domain (0-100).
   */
  progress?: number;

  /**
   * Optional score produced by this domain
   * (e.g. wellbeing score, confidence score, etc.).
   */
  score?: number;

  /**
   * Last meaningful update within this domain.
   */
  lastUpdated?: Date | null;
}