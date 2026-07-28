import { OnboardingData } from "./onboarding";

const STORAGE_KEY = "mydeeptalk-onboarding";

export function getOnboardingData(): OnboardingData {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);

  return stored ? JSON.parse(stored) : {};
}

export function saveOnboardingData(data: Partial<OnboardingData>) {
  if (typeof window === "undefined") return;

  const existing = getOnboardingData();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...existing,
      ...data,
    })
  );
}

export function clearOnboardingData() {
  localStorage.removeItem("onboarding");
}