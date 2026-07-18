"use client";

import {
  CalendarCheck2,
  ClipboardCheck,
  Brain,
  BookOpen,
  FileText,
  Sparkles,
  AlertTriangle,
  Target,
  Calendar,
} from "lucide-react";

import type { TimelineEvent } from "@/types/therapist/timeline";

type RecentActivityProps = {
  activities: TimelineEvent[];
};

const activityIcons: Record<string, React.ElementType> = {
  note_created: FileText,
  note_updated: FileText,
  note_deleted: FileText,

  session_booked: Calendar,
  session_completed: CalendarCheck2,
  session_cancelled: Calendar,

  assessment_completed: ClipboardCheck,

  homework_assigned: BookOpen,
  homework_completed: BookOpen,

  treatment_goal_created: Target,
  treatment_goal_updated: Target,

  journey_milestone_completed: Brain,

  ai_insight: Sparkles,

  risk_alert: AlertTriangle,
};

const activityColors: Record<string, string> = {
  note_created: "bg-gray-100 text-gray-600",
  note_updated: "bg-gray-100 text-gray-600",
  note_deleted: "bg-red-100 text-red-600",

  session_booked: "bg-blue-100 text-blue-600",
  session_completed: "bg-blue-100 text-blue-600",
  session_cancelled: "bg-red-100 text-red-600",

  assessment_completed: "bg-purple-100 text-purple-600",

  homework_assigned: "bg-orange-100 text-orange-600",
  homework_completed: "bg-orange-100 text-orange-600",

  treatment_goal_created: "bg-green-100 text-green-600",
  treatment_goal_updated: "bg-green-100 text-green-600",

  journey_milestone_completed: "bg-emerald-100 text-emerald-600",

  ai_insight: "bg-indigo-100 text-indigo-600",

  risk_alert: "bg-red-100 text-red-600",
};

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest activity for this client.
        </p>
      </div>

      <div className="divide-y">
        {activities.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No activity recorded yet.
          </div>
        )}

        {activities.map((activity) => {
          const Icon =
            activityIcons[activity.type] ?? FileText;

          const color =
            activityColors[activity.type] ??
            "bg-gray-100 text-gray-600";

          return (
            <div
              key={activity.id}
              className="flex gap-4 px-6 py-5"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">
                    {activity.title}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {activity.timestamp}
                  </span>
                </div>

                {activity.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {activity.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}