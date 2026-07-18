import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type {
  TherapistClientHeader,
} from "@/types/therapist/client";

export async function getClientHeader(
  clientId: string
): Promise<TherapistClientHeader | null> {
  const snapshot = await getDoc(
    doc(db, "clients", clientId)
  );

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,

    name: data.name ?? "",

    alias: data.alias,

    profilePhoto: data.profilePhoto,

    email: data.email ?? "",

    phone: data.phone,

    location: data.location,

    status: data.status ?? "active",

    therapistSince: data.therapistSince,

    nextSession: undefined,

    totalSessions: 0,
  };
}