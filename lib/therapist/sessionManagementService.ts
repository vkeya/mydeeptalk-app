import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import {
  onSessionCompleted,
} from "@/lib/therapist/workspaceIntegration";

/**
 * -------------------------------------------------------
 * Session Management Service
 * -------------------------------------------------------
 *
 * Owns session state transitions.
 *
 * Responsibilities:
 * - Complete sessions
 * - Cancel sessions
 * - Mark missed sessions
 * - (Later) Book & Reschedule sessions
 *
 * This service intentionally does NOT:
 * - render UI
 * - send emails
 * - create calendar invites
 * - process payments
 * - calculate analytics
 *
 * Those are separate concerns.
 * -------------------------------------------------------
 */

export async function completeSession(
  clientId: string,
  sessionId: string,
  therapistId: string
): Promise<void> {
  const sessionRef = doc(
    db,
    "clients",
    clientId,
    "sessions",
    sessionId
  );

  await updateDoc(sessionRef, {
    status: "completed",
    updatedAt: new Date().toISOString(),
  });

  await onSessionCompleted({
    clientId,
    therapistId,
    sessionId,
    timestamp: new Date().toISOString(),
  });
}

export async function cancelSession(
  clientId: string,
  sessionId: string,
  reason: string
): Promise<void> {
  const sessionRef = doc(
    db,
    "clients",
    clientId,
    "sessions",
    sessionId
  );

  await updateDoc(sessionRef, {
    status: "cancelled",
    cancellationReason: reason,
    updatedAt: new Date().toISOString(),
  });
}

export async function markSessionMissed(
  clientId: string,
  sessionId: string
): Promise<void> {
  const sessionRef = doc(
    db,
    "clients",
    clientId,
    "sessions",
    sessionId
  );

  await updateDoc(sessionRef, {
    status: "missed",
    updatedAt: new Date().toISOString(),
  });
}