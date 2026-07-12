"use client";

import { getJourneyProgress } from "@/lib/journey/progressEngine";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
}

function StatCard({
  label,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <p className="text-xs uppercase tracking-[0.3em] text-[#8A6E4B]">
        {label}
      </p>

      <h3 className="mt-3 text-4xl font-bold text-[#1C2434]">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-sm text-gray-600">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default function JourneyStats() {
	
	const progress = getJourneyProgress();
	
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
  label="Experiences"
  value={`${progress.completedExperiences.length} / 9`}
  subtitle="Experiences completed"
/>

      <StatCard
        label="Current Streak"
        value={progress.currentStreak}
        subtitle="Days"
      />

      <StatCard
        label="Journal Entries"
        value={progress.journalEntries}
        subtitle="Reflections written"
      />

      <StatCard
        label="Achievements"
        value={progress.achievements}
        subtitle="Milestones unlocked"
      />

    </section>
  );
}