import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { AssessmentSession } from "@/lib/assessment/types/AssessmentSession";

export class AssessmentSessionService {
  private readonly collectionName = "assessmentSessions";

  /**
   * Save or update an assessment session.
   */
  async saveSession(session: AssessmentSession): Promise<void> {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User must be signed in.");
    }

    await setDoc(
      doc(db, this.collectionName, session.id),
      {
        ...session,
        userId: user.uid,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  }

  /**
   * Retrieve a single assessment session.
   */
  async getSession(
    sessionId: string
  ): Promise<AssessmentSession | null> {
    const snapshot = await getDoc(
      doc(db, this.collectionName, sessionId)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as AssessmentSession;
  }

  /**
   * Retrieve the latest assessment completed by the user.
   */
  async getLatestSession(): Promise<AssessmentSession | null> {
    const user = auth.currentUser;

    if (!user) {
      return null;
    }

    const q = query(
      collection(db, this.collectionName),
      where("userId", "==", user.uid),
      orderBy("completedAt", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data() as AssessmentSession;
  }

  /**
   * Retrieve all assessment sessions for the current user.
   */
  async getUserSessions(): Promise<AssessmentSession[]> {
    const user = auth.currentUser;

    if (!user) {
      return [];
    }

    const q = query(
      collection(db, this.collectionName),
      where("userId", "==", user.uid),
      orderBy("completedAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) => doc.data() as AssessmentSession
    );
  }

  /**
   * Delete an assessment session.
   */
  async deleteSession(sessionId: string): Promise<void> {
    await deleteDoc(
      doc(db, this.collectionName, sessionId)
    );
  }
}

export const assessmentSessionService =
  new AssessmentSessionService();