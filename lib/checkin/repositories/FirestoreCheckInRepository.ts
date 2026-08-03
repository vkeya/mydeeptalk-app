import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { CheckInRepository } from "../contracts/CheckInRepository";
import { CheckIn } from "@/types/checkIn";

export class FirestoreCheckInRepository
  implements CheckInRepository {

  async create(checkIn: CheckIn): Promise<void> {
    await addDoc(
      collection(
        db,
        "users",
        checkIn.userId,
        "checkIns"
      ),
      {
        mood: checkIn.mood,
        emotions: checkIn.emotions,
        reflection: checkIn.reflection,
        currentNeed: checkIn.currentNeed,
        completedAt: serverTimestamp(),
      }
    );
  }

  async getLatest(
  userId: string
): Promise<CheckIn | null> {
  const snapshot = await getDocs(
    query(
      collection(db, "users", userId, "checkIns"),
      orderBy("completedAt", "desc"),
      limit(1)
    )
  );

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  return {
    id: doc.id,
    userId,
    mood: data.mood,
    emotions: data.emotions ?? [],
    reflection: data.reflection ?? "",
    currentNeed: data.currentNeed ?? "",
    completedAt:
      data.completedAt instanceof Timestamp
        ? data.completedAt.toDate()
        : new Date(),
  };
}

  async getById(
    userId: string,
    checkInId: string
  ): Promise<CheckIn | null> {
    return null;
  }

  async getToday(
    userId: string
  ): Promise<CheckIn | null> {
    return null;
  }

  async getHistory(
    userId: string
  ): Promise<CheckIn[]> {
    return [];
  }

  async update(
    checkIn: CheckIn
  ): Promise<void> {
    // Next milestone
  }

  async delete(
    userId: string,
    checkInId: string
  ): Promise<void> {
    // Next milestone
  }
}