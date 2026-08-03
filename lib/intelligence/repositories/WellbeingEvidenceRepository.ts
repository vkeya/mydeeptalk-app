import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { WellbeingEvidence } from "../types/evidence";

export class WellbeingEvidenceRepository {
  async save(
    userId: string,
    evidence: WellbeingEvidence
  ): Promise<void> {
    await addDoc(
      collection(
        db,
        "users",
        userId,
        "wellbeing",
        "evidence"
      ),
      evidence
    );
  }

  async getAll(
    userId: string
  ): Promise<WellbeingEvidence[]> {
    const q = query(
      collection(
        db,
        "users",
        userId,
        "wellbeing",
        "evidence"
      ),
      orderBy("createdAt", "asc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) =>
        doc.data() as WellbeingEvidence
    );
  }
}