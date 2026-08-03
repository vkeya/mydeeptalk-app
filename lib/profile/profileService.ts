import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import {
  UserProfile,
  UserProfilePreferences,
  emptyUserProfile,
} from "@/types/profile";

export class ProfileService {
  /**
   * Load the current user's profile.
   */
  async loadProfile(): Promise<UserProfile> {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const snapshot = await getDoc(doc(db, "users", user.uid));

    if (!snapshot.exists()) {
      return emptyUserProfile;
    }

    const data = snapshot.data();

    return {
      privacyName: data.profile?.privacyName ?? "",
      avatarUrl: data.profile?.avatarUrl ?? "",
      country: data.profile?.country ?? "",
      timezone: data.profile?.timezone ?? "",
      preferredLanguage: data.profile?.preferredLanguage ?? "",

      preferences:
        data.profile?.preferences ??
        emptyUserProfile.preferences,

      completionPercentage:
        data.profile?.completionPercentage ?? 0,

      completed:
        data.profile?.completed ?? false,

      completedAt:
        data.profile?.completedAt?.toDate?.(),
    };
  }

  /**
   * Save the user's profile.
   */
  async saveProfile(profile: UserProfile): Promise<void> {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    await updateDoc(doc(db, "users", user.uid), {
      profile: {
        privacyName: profile.privacyName,
        avatarUrl: profile.avatarUrl,
        country: profile.country,
        timezone: profile.timezone,
        preferredLanguage: profile.preferredLanguage,

        preferences: profile.preferences,

        completionPercentage:
          profile.completionPercentage,

        completed: profile.completed,

        completedAt: profile.completed
          ? serverTimestamp()
          : null,
      },
    });
  }

  /**
   * Calculate completion percentage.
   */
  calculateCompletion(
    profile: UserProfile
  ): number {
    const checks = [
      profile.privacyName,
      profile.country,
      profile.timezone,
      profile.preferredLanguage,
    ];

    const completedFields =
      checks.filter(Boolean).length;

    return Math.round(
      (completedFields / checks.length) * 100
    );
  }

  /**
   * Mark profile as complete.
   */
  completeProfile(
    profile: UserProfile
  ): UserProfile {
    return {
      ...profile,
      completionPercentage: 100,
      completed: true,
    };
  }
}

export const profileService =
  new ProfileService();