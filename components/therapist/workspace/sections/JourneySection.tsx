"use client";

import { Brain, Award, Target, TrendingUp } from "lucide-react";

export type JourneySectionProps = {
  activeJourney: string;
  completion: number;
  currentExperience: string;
  xp: number;
  badges: number;
  reflections: number;
};

export default function JourneySection({
  activeJourney,
  completion,
  currentExperience,
  xp,
  badges,
  reflections,
}: JourneySectionProps) {
  const cards = [
    {
      label: "Current Journey",
      value: activeJourney,
      icon: Brain,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Completion",
      value: `${completion}%`,
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "XP Earned",
      value: xp,
      icon: Award,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Badges",
      value: badges,
      icon: Target,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.label}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {card.value}
                  </h3>
                </div>

                <div className={`rounded-xl p-3 ${card.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Current Experience
        </h2>

        <p className="mt-2 text-gray-700">
          {currentExperience}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Reflection Activity
          </h2>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            {reflections} reflections
          </span>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Recent reflections and journal entries will appear here once
          connected to the Project Genesis journey engine.
        </p>
      </div>
    </div>
  );
}