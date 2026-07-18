"use client";

import {
  FileText,
  Lock,
  CalendarDays,
  Tag,
} from "lucide-react";

export type ClinicalNote = {
  id: string;
  title: string;
  sessionDate: string;
  category: string;
  preview: string;
  isPrivate: boolean;
};

type NotesSectionProps = {
  notes: ClinicalNote[];
};

export default function NotesSection({
  notes,
}: NotesSectionProps) {
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
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            New Note
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No clinical notes yet.
          </div>
        ) : (
          <div className="divide-y">
            {notes.map((note) => (
              <div
                key={note.id}
                className="px-6 py-5 hover:bg-gray-50 transition"
              >
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

                  <div className="flex items-start">
                    <button
                      type="button"
                      className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      View Note
                    </button>
                  </div>
                </div>
              </div>
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
    </div>
  );
}