"use client";

import { useEffect, useState } from "react";
import type { ClinicalNote } from "@/types/therapist/notes";

type ClinicalNoteEditorProps = {
  open: boolean;
  note?: ClinicalNote;
  onClose: () => void;
  onSave: (note: ClinicalNote) => Promise<void>;
};

export default function ClinicalNoteEditor({
  open,
  note,
  onClose,
  onSave,
}: ClinicalNoteEditorProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Session");
  const [preview, setPreview] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setCategory(note.category);
      setPreview(note.preview);
      setIsPrivate(note.isPrivate);
    } else {
      setTitle("");
      setCategory("Session");
      setPreview("");
      setIsPrivate(true);
    }
  }, [note]);

  if (!open) return null;

  async function handleSave() {
    await onSave({
      id: note?.id ?? crypto.randomUUID(),
      title,
      category,
      preview,
      sessionDate: new Date().toLocaleDateString(),
      isPrivate,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold">
          {note ? "Edit Clinical Note" : "New Clinical Note"}
        </h2>

        <div className="space-y-4">
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full rounded-lg border p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Session</option>
            <option>Assessment</option>
            <option>Treatment</option>
            <option>General</option>
          </select>

          <textarea
            rows={8}
            className="w-full rounded-lg border p-3"
            placeholder="Write your clinical notes..."
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Private note
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}