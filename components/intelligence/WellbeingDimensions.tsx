"use client";

import { WellbeingProfile } from "@/lib/intelligence/types/wellbeing";

interface WellbeingDimensionsProps {
  profile: WellbeingProfile;
}

const dimensionNames: Record<string, string> = {
  identity: "Identity",
  lifeStory: "Life Story",
  emotionalRegulation: "Emotional Regulation",
  healing: "Healing",
  resilience: "Resilience",
  boundaries: "Boundaries",
  relationships: "Relationships",
  connection: "Connection",
  purpose: "Purpose",
  selfCompassion: "Self Compassion",
};

const descriptions: Record<string, string> = {
  identity:
    "You're developing a stronger understanding of who you are and what matters most.",
  lifeStory:
    "You're making greater sense of your life experiences and personal story.",
  emotionalRegulation:
    "You're strengthening your ability to understand and manage emotions.",
  healing:
    "You're continuing the journey of healing from past experiences.",
  resilience:
    "Your ability to recover from challenges continues to grow.",
  boundaries:
    "Healthy boundaries help protect your wellbeing and relationships.",
  relationships:
    "Meaningful relationships remain an important part of your wellbeing.",
  connection:
    "Your sense of connection with others and yourself is evolving.",
  purpose:
    "Living with purpose brings direction and meaning to everyday life.",
  selfCompassion:
    "Treating yourself with kindness is becoming part of your healing.",
};

export default function WellbeingDimensions({
  profile,
}: WellbeingDimensionsProps) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F4C5C]">
          Your Wellbeing Profile
        </h2>

        <p className="mt-2 text-gray-600">
          Your profile evolves as you complete assessments, reflect in your journal, and continue your healing journey.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {profile.dimensions.map((dimension) => {
          const trendIcon =
            dimension.trend === "improving"
              ? "▲"
              : dimension.trend === "declining"
              ? "▼"
              : "▬";

          const trendText =
            dimension.trend === "improving"
              ? "Improving"
              : dimension.trend === "declining"
              ? "Needs Attention"
              : "Stable";

          return (
            <div
              key={dimension.dimension}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-[#0F4C5C] hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0F4C5C]">
                    {dimensionNames[dimension.dimension] ??
                      dimension.dimension}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {descriptions[dimension.dimension] ??
                      "Continue building this area of your wellbeing."}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-[#0F4C5C]">
                    {dimension.score}
                  </div>

                  <div className="text-sm text-gray-500">
                    /100
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-semibold text-[#0F4C5C]">
                  {trendIcon} {trendText}
                </span>

                <span className="text-sm text-gray-500">
                  Built from {dimension.contributors.length} assessment
                  {dimension.contributors.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div
                  className="h-2 rounded-full bg-[#0F4C5C]"
                  style={{
                    width: `${dimension.score}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}