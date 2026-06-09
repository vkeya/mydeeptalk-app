export default function PillarsSection() {
  const pillars = [
    {
      title: "Self-Awareness",
      description:
        "Understanding yourself is the beginning of healing.",
    },
    {
      title: "Reflection",
      description:
        "Growth happens when we slow down and pay attention to our inner world.",
    },
    {
      title: "Connection",
      description:
        "Healthy relationships begin with understanding ourselves and others.",
    },
    {
      title: "Healing",
      description:
        "Pain does not have to define your future.",
    },
    {
      title: "Support",
      description:
        "You do not have to navigate life alone.",
    },
    {
      title: "Growth",
      description:
        "Healing is not perfection. It is becoming more whole over time.",
    },
  ];

  return (
    <section className="bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-[#E2954E]">
            The MyDeepTalk Philosophy
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Healing begins with understanding yourself
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            MyDeepTalk was built on the belief that emotional wellness should
            be preventive, accessible, and deeply human. We help people move
            from confusion to clarity through self-discovery, reflection, and
            meaningful support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-[#0F4C5C]">
                {pillar.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}