import { CheckIn } from "@/types/checkIn";

export interface CheckInRepository {
  /**
   * Create a new daily check-in.
   */
  create(checkIn: CheckIn): Promise<void>;

  /**
   * Get the latest check-in for a user.
   */
  getLatest(userId: string): Promise<CheckIn | null>;

  /**
   * Get a specific check-in.
   */
  getById(
    userId: string,
    checkInId: string
  ): Promise<CheckIn | null>;

  /**
   * Get all check-ins ordered by most recent.
   */
  getHistory(userId: string): Promise<CheckIn[]>;

  /**
   * Get today's check-in if it exists.
   */
  getToday(userId: string): Promise<CheckIn | null>;

  /**
   * Update an existing check-in.
   */
  update(checkIn: CheckIn): Promise<void>;

  /**
   * Delete a check-in.
   */
  delete(
    userId: string,
    checkInId: string
  ): Promise<void>;
}