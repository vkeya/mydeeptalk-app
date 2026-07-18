import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { HomeworkItem } from "@/types/therapist/homework";

import {
  onHomeworkAssigned,
  onHomeworkCompleted,
} from "@/lib/therapist/workspaceIntegration";

/**
 * ------------------------------------------------------------
 * Homework Management Service
 * ------------------------------------------------------------
 *
 * Owns homework state transitions.
 *
 * Responsibilities:
 * - Assign homework
 * - Complete homework
 *
 * Future:
 * - Submit homework
 * - Update homework
 * - Archive homework
 * ------------------------------------------------------------
 */

export async function assignHomework(
  homework: HomeworkItem
): Promise<void> {
  const homeworkRef = collection(
    db,
    "clients",
    homework.clientId,
    "homework"
  );

  const docRef = await addDoc(homeworkRef, {
    ...homework,
  });

  await onHomeworkAssigned({
    clientId: homework.clientId,
    therapistId: homework.therapistId,
    homeworkId: docRef.id,
    timestamp: new Date().toISOString(),
  });
}

export async function completeHomework(
  clientId: string,
  homeworkId: string,
  therapistId: string
): Promise<void> {
  const homeworkRef = doc(
    db,
    "clients",
    clientId,
    "homework",
    homeworkId
  );

  await updateDoc(homeworkRef, {
    status: "completed",
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await onHomeworkCompleted({
    clientId,
    therapistId,
    homeworkId,
    timestamp: new Date().toISOString(),
  });
}