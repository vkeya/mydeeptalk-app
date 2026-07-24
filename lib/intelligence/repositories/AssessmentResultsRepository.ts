import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";

import { AssessmentResult } from "@/lib/intelligence/types/assessmentResult";

export class AssessmentResultsRepository {
	
  async getById(id: string): Promise<AssessmentResult | null> {
	  
  const snapshot = await getDoc(doc(db, "assessmentResults", id));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    ...data,
    createdAt: data.createdAt?.toDate(),
  } as AssessmentResult;
}
  
  
  async getByUserId(
    userId: string
  ): Promise<AssessmentResult[]> {
    const q = query(
      collection(db, "assessmentResults"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate(),
  } as AssessmentResult;
});
  }
}