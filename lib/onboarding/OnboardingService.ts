import { auth, db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getOnboardingData,
  clearOnboardingData,
} from "./onboardingStorage";

export interface CompleteOnboardingResult {
  success: boolean;
  error?: string;
}

export async function completeOnboarding(): Promise<CompleteOnboardingResult> {
  try {
    const user = auth.currentUser;

    if (!user) {
      return {
        success: false,
        error: "No authenticated user.",
      };
    }

    const onboarding = getOnboardingData();

    await updateDoc(doc(db, "users", user.uid), {
      onboardingCompleted: true,

      onboarding: {
        intent: onboarding.intent,
        guide: onboarding.guide,
        checkIn: onboarding.checkIn,
        startingPoint: onboarding.startingPoint,
        completedAt: serverTimestamp(),
      },
    });

    clearOnboardingData();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to complete onboarding:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}