"use client";

import {
  CalendarPlus,
  Video,
  FileText,
  ClipboardCheck,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export type QuickAction = {
  label: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
};

type QuickActionsProps = {
  actions?: QuickAction[];
};

const defaultActions: QuickAction[] = [
  {
    label: "Schedule Session",
    description: "Book a new therapy session",
    icon: CalendarPlus,
  },
  {
    label: "Start Video Session",
    description: "Launch today's online session",
    icon: Video,
  },
  {
    label: "Add Clinical Note",
    description: "Document observations",
    icon: FileText,
  },
  {
    label: "Assign Homework",
    description: "Create a client task",
    icon: ClipboardCheck,
  },
  {
    label: "Message Client",
    description: "Send a secure message",
    icon: MessageSquare,
  },
];

export default function QuickActions({
  actions = defaultActions,
}: QuickActionsProps) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Frequently used therapist actions.
        </p>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className="group rounded-xl border p-5 text-left transition hover:border-indigo-500 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-indigo-100 p-3">
                  <Icon className="h-5 w-5 text-indigo-600" />
                </div>

                <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                {action.label}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}