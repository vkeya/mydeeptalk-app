// lib/therapist/notesService.ts

import type { ClinicalNote } from "@/types/therapist/notes";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import {
  onClinicalNoteCreated,
  onClinicalNoteUpdated,
  onClinicalNoteDeleted,
} from "@/lib/therapist/workspaceIntegration";

import { db } from "@/lib/firebase";

export async function getClinicalNotes(
  clientId: string
): Promise<ClinicalNote[]> {
  const notesRef = collection(db, "clients", clientId, "clinicalNotes");

  const snapshot = await getDocs(
    query(notesRef, orderBy("sessionDate", "desc"))
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ClinicalNote, "id">),
  }));
}

export async function saveClinicalNote(
  clientId: string,
  note: ClinicalNote
): Promise<void> {
  const notesRef = collection(db, "clients", clientId, "clinicalNotes");

  const docRef = await addDoc(notesRef, {
    title: note.title,
    sessionDate: note.sessionDate,
    category: note.category,
    preview: note.preview,
    isPrivate: note.isPrivate,
  });

  const therapistId = "TODO";

  await onClinicalNoteCreated({
    clientId,
    therapistId,
    noteId: docRef.id,
    timestamp: new Date().toISOString(),
  });
}

export async function updateClinicalNote(
  clientId: string,
  note: ClinicalNote
): Promise<void> {
  await updateDoc(
    doc(db, "clients", clientId, "clinicalNotes", note.id),
    {
      title: note.title,
      sessionDate: note.sessionDate,
      category: note.category,
      preview: note.preview,
      isPrivate: note.isPrivate,
    }
  );

  const therapistId = "TODO";

  await onClinicalNoteUpdated({
    clientId,
    therapistId,
    noteId: note.id,
    timestamp: new Date().toISOString(),
  });
}

export async function deleteClinicalNote(
  clientId: string,
  noteId: string
): Promise<void> {
  await deleteDoc(
    doc(db, "clients", clientId, "clinicalNotes", noteId)
  );

  const therapistId = "TODO";

  await onClinicalNoteDeleted({
    clientId,
    therapistId,
    noteId,
    timestamp: new Date().toISOString(),
  });
}