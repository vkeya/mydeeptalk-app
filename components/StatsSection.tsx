export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      title: "Verified Therapists",
      description: "Qualified professionals across multiple specialties.",
    },
    {
      number: "5,000+",
      title: "Self-Reflection Journeys",
      description: "Helping people understand themselves more deeply.",
    },
    {
      number: "10+",
      title: "Emotional Wellness Categories",
      description: "From relationships to trauma and personal growth.",
    },
    {
      number: "24/7",
      title: "Accessible Support",
      description: "Healing and support available whenever you need it.",
    },
  ];

  return (
    <section className="px-8 py-20 bg-white">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="font-semibold text-[#E2954E]">
            Impact
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Building Emotional Wellness Across Africa
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-gray-600">
            MyDeepTalk exists to help people become emotionally aware before life becomes overwhelming.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-3xl bg-[#F7F3EC] p-10 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-5xl font-bold text-[#0F4C5C]">
                {stat.number}
              </h3>

              <h4 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                {stat.title}
              </h4>

              <p className="mt-4 leading-7 text-gray-600">
                {stat.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}