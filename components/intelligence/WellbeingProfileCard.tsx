"use client";

import { WellbeingProfile } from "@/lib/intelligence/types/wellbeing";

interface WellbeingProfileCardProps {
  profile: WellbeingProfile;
}

export default function WellbeingProfileCard({
  profile,
}: WellbeingProfileCardProps) {
	
	const formatDate = (value: unknown) => {
  if (!value) return "Unknown";

  const date =
    value instanceof Date
      ? value
      : new Date(value as string);

  return date.toLocaleDateString();
};
	
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-8
        shadow-lg
      "
    >
      <h2 className="text-2xl font-bold text-[#0F4C5C]">
        🌱 Your Wellbeing Profile
      </h2>

      <p className="mt-2 text-gray-600">
        A living summary of your wellbeing journey.
      </p>

      <div className="mt-8 space-y-6">
        {profile.dimensions.map((dimension) => (
          <div key={dimension.dimension}>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold capitalize">
                {dimension.dimension}
              </span>

              <span className="font-bold text-[#0F4C5C]">
                {dimension.score}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-[#0F4C5C] transition-all"
                style={{
                  width: `${dimension.score}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {profile.strengths.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold text-[#0F4C5C]">
            💪 Your Strengths
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5">
            {profile.strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {profile.growthAreas.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold text-[#0F4C5C]">
            🌱 Growing Areas
          </h3>

          <ul className="mt-3 list-disc space-y-2 pl-5">
            {profile.growthAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 border-t pt-6 text-sm text-gray-500">
        Last Updated:{" "}
{new Date(profile.updatedAt).toLocaleDateString()}
      </div>
    </section>
  );
}