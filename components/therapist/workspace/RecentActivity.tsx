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
   onActivitySelected?: (activity: TimelineEvent) => void;
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

const activityLabels: Record<string, string> = {
  note_created: "Clinical Note",
  note_updated: "Clinical Note",
  note_deleted: "Clinical Note",

  session_booked: "Session",
  session_completed: "Session",
  session_cancelled: "Session",

  assessment_completed: "Assessment",

  homework_assigned: "Homework",
  homework_completed: "Homework",

  treatment_goal_created: "Treatment Goal",
  treatment_goal_updated: "Treatment Goal",

  journey_milestone_completed: "Journey",

  ai_insight: "AI Insight",

  risk_alert: "Risk Alert",
};

function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);

  const diffMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);

  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString();
}

export default function RecentActivity({
  activities,
  onActivitySelected,
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
			
		  const label =
  activityLabels[activity.type] ??
  "Activity";

          return (
            <div
  key={activity.id}
  onClick={() => onActivitySelected?.(activity)}
  className={
    "flex gap-4 px-6 py-5 transition-colors " +
    (onActivitySelected
      ? "cursor-pointer hover:bg-gray-50"
      : "")
  }
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
                    <time
  dateTime={activity.timestamp}
  title={new Date(activity.timestamp).toLocaleString()}
  className="text-sm text-gray-500"
>
  {formatRelativeTime(activity.timestamp)}
</time>
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
    {label}
  </span>
</div>

{activity.description && (
  <p className="mt-2 text-sm text-gray-600">
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