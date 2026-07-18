"use client";

import {
  CalendarDays,
  Lock,
  Tag,
} from "lucide-react";

import type { ClinicalNote } from "@/types/therapist/notes";

type NoteCardProps = {
  note: ClinicalNote;
  onView: (note: ClinicalNote) => void;
  onDelete: (note: ClinicalNote) => void | Promise<void>;
};

export default function NoteCard({
  note,
  onView,
  onDelete,
}: NoteCardProps) {
  return (
    <div className="px-6 py-5 hover:bg-gray-50 transition">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-semibold text-gray-900">
              {note.title}
            </h3>

            {note.isPrivate && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                <Lock className="h-3.5 w-3.5" />
                Private
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {note.sessionDate}
            </span>

            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              {note.category}
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-600 line-clamp-3">
            {note.preview}
          </p>
        </div>

        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={() => onView(note)}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
          >
            View Note
          </button>

          <button
            type="button"
            onClick={() => onDelete(note)}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}