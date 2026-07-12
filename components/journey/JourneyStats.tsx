"use client";

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
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        label="Experiences"
        value="1 / 10"
        subtitle="Meeting Yourself completed"
      />

      <StatCard
        label="Current Streak"
        value="3"
        subtitle="Days"
      />

      <StatCard
        label="Journal Entries"
        value="5"
        subtitle="Reflections written"
      />

      <StatCard
        label="Achievements"
        value="2"
        subtitle="Milestones unlocked"
      />

    </section>
  );
}