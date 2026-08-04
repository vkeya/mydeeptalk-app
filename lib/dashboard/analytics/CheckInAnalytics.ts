import { CheckIn } from "@/types/checkIn";

export interface CheckInAnalyticsResult {
  streak: number;

  checkInsThisWeek: number;

  checkInsThisMonth: number;

  averageMood: string | null;

  moodTrend:
    | "improving"
    | "stable"
    | "declining"
    | "unknown";

  wellbeingScore: number;
}

export class CheckInAnalytics {

  analyze(
    history: CheckIn[]
  ): CheckInAnalyticsResult {

    const completedHistory = history.filter(
  (
    checkIn
  ): checkIn is CheckIn & { completedAt: Date } =>
    checkIn.completedAt instanceof Date
);

return {
  streak: this.calculateStreak(completedHistory),
  checkInsThisWeek: this.checkInsThisWeek(completedHistory),
  checkInsThisMonth: this.checkInsThisMonth(completedHistory),
  averageMood: this.averageMood(completedHistory),
  moodTrend: this.moodTrend(completedHistory),
  wellbeingScore: this.wellbeingScore(completedHistory),
};

  }

  // ---------------------------------

  private calculateStreak(
  history: (CheckIn & { completedAt: Date })[]
): number {

  if (history.length === 0) {
    return 0;
  }

  // Ensure newest first
  const sorted = history
  .filter(
    (
      checkIn
    ): checkIn is CheckIn & { completedAt: Date } =>
      checkIn.completedAt instanceof Date
  )
  .sort(
    (a, b) =>
      b.completedAt.getTime() - a.completedAt.getTime()
  );

  let streak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let expected = new Date(today);

  for (const checkIn of sorted) {
    if (!checkIn.completedAt) {
  continue;
}

const completed = new Date(checkIn.completedAt);
    completed.setHours(0, 0, 0, 0);

    const diff =
      Math.floor(
        (expected.getTime() - completed.getTime()) /
          (1000 * 60 * 60 * 24)
      );

    if (diff === 0) {
      streak++;
      expected.setDate(expected.getDate() - 1);
    } else if (diff === 1 && streak === 0) {
      // Allow today's check-in to be missing while preserving yesterday's streak.
      streak++;
      expected.setDate(expected.getDate() - 2);
    } else {
      break;
    }
  }

  return streak;
}

  // ---------------------------------

  private checkInsThisWeek(
  history: (CheckIn & { completedAt: Date })[]
): number {

  const now = new Date();

  const startOfWeek = new Date(now);

  const day = startOfWeek.getDay();

  // Monday = start of week
  const diff = day === 0 ? 6 : day - 1;

  startOfWeek.setDate(startOfWeek.getDate() - diff);

  startOfWeek.setHours(0, 0, 0, 0);

  return history.filter(
  (
    checkIn
  ): checkIn is CheckIn & { completedAt: Date } =>
    checkIn.completedAt instanceof Date
).filter((checkIn) => {
  return checkIn.completedAt >= startOfWeek;
}).length;

}

  // ---------------------------------

  private checkInsThisMonth(
  history: (CheckIn & { completedAt: Date })[]
): number {

  const now = new Date();

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  return history
  .filter(
    (
      checkIn
    ): checkIn is CheckIn & { completedAt: Date } =>
      checkIn.completedAt instanceof Date
  )
  .filter((checkIn) => checkIn.completedAt >= startOfMonth)
  .length;

}

  // ---------------------------------

  private averageMood(
    history: (CheckIn & { completedAt: Date })[]
  ): string | null {

    return null;

  }

  // ---------------------------------

  private moodTrend(
    history: (CheckIn & { completedAt: Date })[]
  ): CheckInAnalyticsResult["moodTrend"] {

    return "unknown";

  }

  // ---------------------------------

  private wellbeingScore(
    history: (CheckIn & { completedAt: Date })[]
  ): number {

    return 50;

  }

}

export const checkInAnalytics =
  new CheckInAnalytics();