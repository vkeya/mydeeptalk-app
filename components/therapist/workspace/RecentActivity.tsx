"use client";

import {
  CalendarCheck2,
  ClipboardCheck,
  Brain,
  BookOpen,
  FileText,
  Sparkles,
} from "lucide-react";

export type ActivityType =
  | "session"
  | "assessment"
  | "journey"
  | "homework"
  | "note"
  | "ai";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
};

type RecentActivityProps = {
  activities: ActivityItem[];
};

const activityIcons: Record<
  ActivityType,
  React.ElementType
> = {
  session: CalendarCheck2,
  assessment: ClipboardCheck,
  journey: Brain,
  homework: BookOpen,
  note: FileText,
  ai: Sparkles,
};

const activityColors: Record<ActivityType, string> = {
  session: "bg-blue-100 text-blue-600",
  assessment: "bg-purple-100 text-purple-600",
  journey: "bg-green-100 text-green-600",
  homework: "bg-orange-100 text-orange-600",
  note: "bg-gray-100 text-gray-600",
  ai: "bg-indigo-100 text-indigo-600",
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
          const Icon = activityIcons[activity.type];

          return (
            <div
              key={activity.id}
              className="flex gap-4 px-6 py-5"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${activityColors[activity.type]}`}
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

                <p className="mt-1 text-sm text-gray-600">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}