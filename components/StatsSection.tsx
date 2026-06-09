export default function StatsSection() {
  const stats = [
    {
      number: "10+",
      title: "Areas of Emotional Wellness",
      description:
        "From relationships and parenting to trauma, addiction, and self-discovery.",
    },
    {
      number: "Preventive",
      title: "Approach to Healing",
      description:
        "Helping people understand themselves before life becomes overwhelming.",
    },
    {
      number: "Africa",
      title: "Built With Global Vision",
      description:
        "Created in Africa to make emotional wellness more accessible and personal.",
    },
    {
      number: "24/7",
      title: "Self-Discovery Access",
      description:
        "Reflect, journal, and begin your healing journey anytime.",
    },
  ];

  return (
    <section className="bg-white px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold text-[#E2954E]">
            Why MyDeepTalk
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Self-Discovery Before Crisis
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-gray-600 leading-8">
            Most people seek help only when emotional pain becomes
            overwhelming. MyDeepTalk was created to help people understand
            themselves earlier through reflection, guided self-discovery,
            journaling, and access to verified therapists.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-3xl bg-[#F7F3EC] p-10 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-4xl font-bold text-[#0F4C5C]">
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