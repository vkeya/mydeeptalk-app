"use client";

import {
  ClientStats,
  QuickActions,
  RecentActivity,
  type ClientStatsProps,
  type QuickAction,
} from "../";
import ClinicalSummary from "../ClinicalSummary";
import type { TimelineEvent } from "@/types/therapist/timeline";
import type { TherapistClientWorkspace } from "@/lib/therapist/clientWorkspace";

type OverviewSectionProps = {
  stats: ClientStatsProps;
  progress: TherapistClientWorkspace["progress"];
  risk: TherapistClientWorkspace["risk"];
  activities: TimelineEvent[];
  actions?: QuickAction[];
};

export default function OverviewSection({
  stats,
  progress,
  risk,
  activities,
  actions,
}: OverviewSectionProps) {
  return (
    <div className="space-y-6">
      <ClientStats {...stats} />
	  
	  <ClinicalSummary
	  
  progress={progress}
  risk={risk}
/>

      <QuickActions actions={actions} />

      <RecentActivity activities={activities} />
    </div>
  );
}