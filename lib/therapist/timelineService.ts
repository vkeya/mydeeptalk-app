// lib/therapist/timelineService.ts

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

import type { TimelineEvent } from "@/types/therapist/timeline";

/**
 * ------------------------------------------------------------------
 * Timeline Service
 * ------------------------------------------------------------------
 *
 * Responsible for recording and retrieving the chronological
 * clinical history of a client's therapeutic journey.
 *
 * Firestore Structure:
 *
 * clients
 * └── {clientId}
 *     └── timeline
 *         ├── event1
 *         ├── event2
 *         └── ...
 *
 * ------------------------------------------------------------------
 */

export async function addTimelineEvent(
  event: TimelineEvent
): Promise<void> {
  const timelineRef = collection(
    db,
    "clients",
    event.clientId,
    "timeline"
  );

  await addDoc(timelineRef, {
    therapistId: event.therapistId,
    type: event.type,
    title: event.title,
    description: event.description ?? "",
    timestamp: event.timestamp,
    severity: event.severity ?? "info",
    relatedResource: event.relatedResource ?? null,
    metadata: event.metadata ?? {},
  });

  console.info("[Timeline] Event recorded", event);
}

export async function getTimeline(
  clientId: string
): Promise<TimelineEvent[]> {
  const timelineRef = collection(
    db,
    "clients",
    clientId,
    "timeline"
  );

  const snapshot = await getDocs(
    query(timelineRef, orderBy("timestamp", "desc"))
  );

  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...(docSnapshot.data() as Omit<TimelineEvent, "id">),
  }));
}

export async function clearTimeline(
  clientId: string
): Promise<void> {
  const timelineRef = collection(
    db,
    "clients",
    clientId,
    "timeline"
  );

  const snapshot = await getDocs(timelineRef);

  await Promise.all(
    snapshot.docs.map((document) =>
      deleteDoc(
        doc(
          db,
          "clients",
          clientId,
          "timeline",
          document.id
        )
      )
    )
  );
}