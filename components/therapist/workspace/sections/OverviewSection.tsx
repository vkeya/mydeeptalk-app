"use client";

import {
  ClientStats,
  QuickActions,
  RecentActivity,
  type ClientStatsProps,
  type QuickAction,
} from "../";

import type { TimelineEvent } from "@/types/therapist/timeline";

type OverviewSectionProps = {
  stats: ClientStatsProps;
  activities: TimelineEvent[];
  actions?: QuickAction[];
};

export default function OverviewSection({
  stats,
  activities,
  actions,
}: OverviewSectionProps) {
  return (
    <div className="space-y-6">
      <ClientStats {...stats} />

      <QuickActions actions={actions} />

      <RecentActivity activities={activities} />
    </div>
  );
}