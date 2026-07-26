import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface SaveAssessmentResultInput {
  assessmentId: string;
  title: string;
  category: string;
  userId: string | null;
  userEmail: string | null;
  score: number;
  maxScore: number;
  level: string;
  message: string;
}

export class AssessmentRepository {
  async saveAssessmentResult(
    input: SaveAssessmentResultInput
  ) {
    return addDoc(
      collection(db, "assessmentResults"),
      {
        ...input,
        isAnonymous: !input.userId,
        createdAt: serverTimestamp(),
      }
    );
  }
}