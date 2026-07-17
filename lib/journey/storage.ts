import type { JourneyProgress } from "@/types/journey";

const STORAGE_KEY = "mydeeptalk_journey_progress";

export function saveJourneyProgress(
  progress: JourneyProgress
) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );
}

export function loadJourneyProgress():
  | JourneyProgress
  | null {

  if (typeof window === "undefined") {
    return null;
  }

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return null;

  try {
    return JSON.parse(saved) as JourneyProgress;
  } catch {
    return null;
  }
}

export function clearJourneyProgress() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}