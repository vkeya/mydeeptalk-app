"use client";

import {
  Activity,
  Brain,
  CalendarDays,
  ClipboardList,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

import type {
  TherapistClientStats,
} from "@/types/therapist/client";

export type ClientStatsProps = TherapistClientStats;

export default function ClientStats({
  totalSessions,
  completedAssessments,
  activeJourney,
  wellbeingScore,
  streak,
  lastSession,
}: ClientStatsProps) {
  const stats = [
    {
      title: "Sessions",
      value: totalSessions,
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Assessments",
      value: completedAssessments,
      icon: ClipboardList,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Wellbeing",
      value: `${wellbeingScore}%`,
      icon: HeartPulse,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Journey Streak",
      value: `${streak} days`,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Active Journey",
      value: activeJourney,
      icon: Brain,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Last Session",
      value: lastSession,
      icon: Activity,
      color: "bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`rounded-xl p-3 ${stat.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}