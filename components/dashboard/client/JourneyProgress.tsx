interface JourneyProgressProps {
  wellbeingScore: number;
  streak: number;
  journalEntries: number;
  genesisProgress: number;
}

export default function JourneyProgress({
  wellbeingScore,
  streak,
  journalEntries,
  genesisProgress,
}: JourneyProgressProps) {
  const items = [
    {
      icon: "❤️",
      title: "Wellbeing",
      value: `${wellbeingScore}%`,
      subtitle: "Current emotional wellbeing",
    },
    {
      icon: "🔥",
      title: "Current Streak",
      value: `${streak} Days`,
      subtitle: "Showing up for yourself",
    },
    {
      icon: "📖",
      title: "Journal",
      value: journalEntries,
      subtitle: "Personal reflections",
    },
    {
      icon: "🌱",
      title: "Genesis",
      value: `${genesisProgress}%`,
      subtitle: "Journey completed",
    },
  ];

  return (
    <section className="mt-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#2C7A7B]">
          Your Journey
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#0F4C5C]">
          Celebrate your progress
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          Healing isn't measured by perfection.
          It's measured by consistently showing up
          for yourself.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="text-4xl">{item.icon}</div>

            <h3 className="mt-5 text-xl font-bold text-[#0F4C5C]">
              {item.title}
            </h3>

            <p className="mt-2 text-3xl font-bold">
              {item.value}
            </p>

            <p className="mt-3 text-sm text-gray-500">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}