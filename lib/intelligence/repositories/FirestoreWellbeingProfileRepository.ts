import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { WellbeingProfile } from "@/lib/intelligence/types/wellbeing";
export class FirestoreWellbeingProfileRepository {
  /**
   * Retrieve a user's wellbeing profile.
   */
  async getByUserId(
    userId: string
  ): Promise<WellbeingProfile | null> {
    const profileRef = doc(
      db,
      "users",
      userId,
      "wellbeing",
      "profile"
    );

    const snapshot = await getDoc(profileRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as WellbeingProfile;
  }

  /**
   * Save a user's wellbeing profile.
   */
  async save(
    userId: string,
    profile: WellbeingProfile
  ): Promise<void> {
    const profileRef = doc(
      db,
      "users",
      userId,
      "wellbeing",
      "profile"
    );

    await setDoc(profileRef, profile, {
      merge: true,
    });
  }
}