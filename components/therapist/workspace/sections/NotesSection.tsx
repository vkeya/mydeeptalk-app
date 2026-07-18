"use client";

import { useState } from "react";
import NoteCard from "../notes/NoteCard";
import ClinicalNoteEditor from "../notes/ClinicalNoteEditor";
import {
  getClinicalNotes,
  saveClinicalNote,
  updateClinicalNote,
  deleteClinicalNote,
} from "@/lib/therapist/notesService";
import type { ClinicalNote } from "@/types/therapist/notes";
import { FileText } from "lucide-react";


type NotesSectionProps = {
  clientId: string;
  notes: ClinicalNote[];
};

export default function NotesSection({
  clientId,
  notes,
}: NotesSectionProps) {
	
	const [editorOpen, setEditorOpen] = useState(false);
const [noteList, setNoteList] = useState(notes);
const [selectedNote, setSelectedNote] = useState<ClinicalNote | undefined>();
const [searchTerm, setSearchTerm] = useState("");
const [categoryFilter, setCategoryFilter] = useState("All");

 async function handleDelete(note: ClinicalNote) {
    const confirmed = window.confirm(
      "Delete this clinical note?"
    );

    if (!confirmed) return;

    await deleteClinicalNote(clientId, note.id);

    const updatedNotes = await getClinicalNotes(clientId);

    setNoteList(updatedNotes);
  }

const filteredNotes = noteList.filter((note) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    note.title.toLowerCase().includes(search) ||
    note.preview.toLowerCase().includes(search) ||
    note.category.toLowerCase().includes(search);

  const matchesCategory =
    categoryFilter === "All" ||
    note.category === categoryFilter;

  return matchesSearch && matchesCategory;
});

	
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Clinical Notes
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Confidential therapist documentation.
            </p>
          </div>

          <button
  type="button"
  onClick={() => setEditorOpen(true)}
  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
>
  New Note
</button>
        </div>

<div className="border-b px-6 py-4">
  <input
    type="text"
    placeholder="Search clinical notes..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
  />


<select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  className="rounded-xl border border-gray-300 px-4 py-2"
>
  <option>All</option>
  <option>Session</option>
  <option>Assessment</option>
  <option>Treatment</option>
  <option>General</option>
</select>
</div>

{filteredNotes.length === 0 ? (
  <div className="p-10 text-center text-gray-500">
    No clinical notes yet.
  </div>
) : (
  <div className="divide-y">
    {filteredNotes.map((note) => (
      <NoteCard
        key={note.id}
        note={note}
        onView={(selected) => {
          setSelectedNote(selected);
          setEditorOpen(true);
        }}
        onDelete={handleDelete}
      />
    ))}
  </div>
)}
</div>
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <div className="flex items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 text-indigo-600" />

          <div>
            <h3 className="font-semibold text-indigo-900">
              Clinical Documentation
            </h3>

            <p className="mt-2 text-sm text-indigo-800">
              Clinical notes remain visible only to authorized
              therapists and are never shared with the client unless
              explicitly exported or included in a treatment summary.
            </p>
          </div>
        </div>
      </div>
	  
	  <ClinicalNoteEditor
  open={editorOpen}
  note={selectedNote}
  onClose={() => {
    setEditorOpen(false);
    setSelectedNote(undefined);
  }}
  onSave={async (note) => {
  if (selectedNote) {
    await updateClinicalNote(clientId, note);
  } else {
    await saveClinicalNote(clientId, note);
  }

  const updatedNotes = await getClinicalNotes(clientId);
  setNoteList(updatedNotes);

  setSelectedNote(undefined);
}}
/>

    </div>
  );
}