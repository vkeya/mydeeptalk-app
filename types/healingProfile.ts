export interface HealingProfile {
  userId: string;

  /**
   * Current overall healing stage.
   * This will be expanded by the Healing Intelligence Engine.
   */
  overallStage: string;

  /**
   * Last time the profile was updated.
   */
  updatedAt: Date;
}