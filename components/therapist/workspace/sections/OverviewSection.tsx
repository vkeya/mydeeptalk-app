"use client";

import {
  ClientStats,
  QuickActions,
  RecentActivity,
  type ActivityItem,
  type ClientStatsProps,
  type QuickAction,
} from "../";

type OverviewSectionProps = {
  stats: ClientStatsProps;
  activities: ActivityItem[];
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