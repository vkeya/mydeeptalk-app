"use client";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const achievements: Achievement[] = [
  {
    id: "journey-begins",
    title: "Journey Begins",
    description: "Completed your first experience.",
    icon: "🌱",
    unlocked: true,
  },
  {
    id: "honest-reflection",
    title: "Honest Reflection",
    description: "Completed your first journal reflection.",
    icon: "🪞",
    unlocked: true,
  },
  {
    id: "story-explorer",
    title: "Story Explorer",
    description: "Complete 'Your Story'.",
    icon: "📖",
    unlocked: false,
  },
  {
    id: "emotional-awareness",
    title: "Emotional Awareness",
    description: "Complete Emotional Patterns.",
    icon: "❤️",
    unlocked: false,
  },
  {
    id: "boundary-builder",
    title: "Boundary Builder",
    description: "Learn healthy boundaries.",
    icon: "🛡️",
    unlocked: false,
  },
  {
    id: "purpose-seeker",
    title: "Purpose Seeker",
    description: "Discover your purpose.",
    icon: "✨",
    unlocked: false,
  },
];

export default function JourneyAchievements() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="mb-8">

        <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#8A6E4B]">
          Achievements
        </p>

        <h2 className="font-serif text-3xl font-bold text-[#1C2434]">
          Your Growth Badges
        </h2>

        <p className="mt-3 text-gray-600">
          Every milestone represents progress worth celebrating.
          Healing isn't about perfection—it's about continuing.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {achievements.map((achievement) => (

          <div
            key={achievement.id}
            className={`rounded-3xl border p-6 transition ${
              achievement.unlocked
                ? "border-[#D9C8AE] bg-[#FFFDF9] shadow-sm"
                : "border-gray-200 bg-gray-100 opacity-60"
            }`}
          >

            <div className="mb-4 text-5xl">
              {achievement.icon}
            </div>

            <h3 className="text-xl font-bold text-[#1C2434]">
              {achievement.title}
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              {achievement.description}
            </p>

            <div className="mt-6">

              {achievement.unlocked ? (
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  ✓ Unlocked
                </span>
              ) : (
                <span className="rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-600">
                  Locked
                </span>
              )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}