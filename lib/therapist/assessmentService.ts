// lib/therapist/assessmentService.ts

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  AssessmentResult,
} from "@/types/therapist/assessment";

import {
  onAssessmentCompleted,
} from "@/lib/therapist/workspaceIntegration";

/**
 * ------------------------------------------------------------
 * Assessment Service
 * ------------------------------------------------------------
 *
 * Owns all assessment persistence.
 *
 * Responsibilities:
 * - Store assessment results
 * - Retrieve assessment history
 * - Delete assessment results
 *
 * Does NOT:
 * - Update UI
 * - Manage timeline
 * - Calculate analytics
 *
 * Those responsibilities belong elsewhere.
 * ------------------------------------------------------------
 */

export async function getAssessmentHistory(
  clientId: string
): Promise<AssessmentResult[]> {
  const assessmentsRef = collection(
    db,
    "clients",
    clientId,
    "assessments"
  );

  const snapshot = await getDocs(
    query(assessmentsRef, orderBy("completedAt", "desc"))
  );

  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...(docSnapshot.data() as Omit<AssessmentResult, "id">),
  }));
}

export async function saveAssessmentResult(
  clientId: string,
  assessment: AssessmentResult
): Promise<void> {
  const assessmentsRef = collection(
    db,
    "clients",
    clientId,
    "assessments"
  );

  const docRef = await addDoc(assessmentsRef, {
    ...assessment,
  });

  const therapistId = "TODO";

  await onAssessmentCompleted({
    clientId,
    therapistId,
    assessmentId: docRef.id,
    timestamp: new Date().toISOString(),
  });
}

export async function deleteAssessmentResult(
  clientId: string,
  assessmentId: string
): Promise<void> {
  await deleteDoc(
    doc(
      db,
      "clients",
      clientId,
      "assessments",
      assessmentId
    )
  );
}