"use client";

type Props = {
  specialties: string[];
};

export default function AssessmentRecommendations({
  specialties,
}: Props) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-[#0F4C5C]">
        Recommended Therapy Areas
      </h2>

      <p className="mt-3 font-semibold text-gray-700">
        Based on your assessment, MyDeepTalk recommends support in:
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {specialties.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[#F7F3EC] px-5 py-2 font-bold text-[#0F4C5C]"
          >
            ✓ {item}
          </span>
        ))}
      </div>
    </section>
  );
}