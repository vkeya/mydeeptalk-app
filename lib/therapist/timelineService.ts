// lib/therapist/timelineService.ts


import type { TimelineEvent } from "@/types/therapist/timeline";

/**
 * Timeline Service
 *
 * Responsible for recording and retrieving the
 * chronological history of a client's therapeutic journey.
 *
 * NOTE:
 * Version 1 is intentionally lightweight.
 * Firestore persistence will be added later.
 */

const timelineEvents: TimelineEvent[] = [];

export async function addTimelineEvent(
  event: TimelineEvent
): Promise<void> {
  timelineEvents.unshift(event);

  console.info("[Timeline] Event recorded", event);
}

export async function getTimeline(
  clientId: string
): Promise<TimelineEvent[]> {
  return timelineEvents.filter(
    (event) => event.clientId === clientId
  );
}

export async function clearTimeline(
  clientId: string
): Promise<void> {
  const remaining = timelineEvents.filter(
    (event) => event.clientId !== clientId
  );

  timelineEvents.length = 0;
  timelineEvents.push(...remaining);
}