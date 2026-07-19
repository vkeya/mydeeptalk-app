import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { GenesisMemory, createEmptyMemory } from "@/types/genesisMemory";
import { GenesisProfile } from "@/types/genesisProfile";

const COLLECTION = "genesisProfiles";

class ProfileService {
  async getProfile(userId: string): Promise<GenesisProfile> {
    const ref = doc(db, COLLECTION, userId);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return {
        userId,
        ...createEmptyMemory(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      };
    }

    return snapshot.data() as GenesisProfile;
  }

  async saveProfile(profile: GenesisProfile): Promise<void> {
    const ref = doc(db, COLLECTION, profile.userId);

    await setDoc(
      ref,
      {
        ...profile,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async updateMemory(
    userId: string,
    memory: GenesisMemory
  ): Promise<void> {
    const ref = doc(db, COLLECTION, userId);

    await setDoc(
      ref,
      {
        ...memory,
        updatedAt: serverTimestamp(),
        version: 1,
      },
      { merge: true }
    );
  }
}

export const profileService = new ProfileService();