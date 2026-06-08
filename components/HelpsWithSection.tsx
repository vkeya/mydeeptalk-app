import Link from "next/link";

const pillars = [
  {
    title: "Relationships",
    icon: "❤️",
    text: "Improve communication, rebuild trust, navigate conflict, and strengthen emotional connection.",
    items: ["Marriage", "Dating", "Trust", "Conflict", "Loneliness"],
  },
  {
    title: "Parenting",
    icon: "👨‍👩‍👧‍👦",
    text: "Support for parents raising emotionally healthy children while managing stress and family pressure.",
    items: ["Teenagers", "Co-parenting", "Parent burnout", "Family communication"],
  },
  {
    title: "Trauma & Healing",
    icon: "🌿",
    text: "Gentle support for painful experiences, grief, betrayal, shame, and unresolved emotional wounds.",
    items: ["Grief", "Betrayal", "Childhood wounds", "Divorce recovery"],
  },
  {
    title: "Mental & Emotional Wellness",
    icon: "🧠",
    text: "Build resilience, manage stress, and develop healthier ways of coping with emotional overwhelm.",
    items: ["Anxiety", "Stress", "Burnout", "Low self-esteem"],
  },
  {
    title: "Addiction & Recovery",
    icon: "🔄",
    text: "Support and accountability for rebuilding life after harmful patterns or compulsive behaviours.",
    items: ["Alcohol", "Pornography", "Gambling", "Relapse prevention"],
  },
  {
    title: "Self-Discovery & Purpose",
    icon: "✨",
    text: "Understand yourself better, grow in confidence, and build a life aligned with your values.",
    items: ["Identity", "Purpose", "Boundaries", "Personal growth"],
  },
  {
    title: "Men's Wellness",
    icon: "👨",
    text: "A safe space for men to talk openly about pressure, identity, fatherhood, emotions, and relationships.",
    items: ["Fatherhood", "Pressure", "Masculinity", "Loneliness"],
  },
  {
    title: "Women's Wellness",
    icon: "👩",
    text: "Support for women navigating motherhood, relationships, self-worth, work-life balance, and transitions.",
    items: ["Motherhood", "Self-worth", "Postpartum", "Work-life balance"],
  },
  {
    title: "Faith & Spiritual Wellness",
    icon: "🙏",
    text: "Explore healing, hope, forgiveness, purpose, and emotional wellbeing while respecting your values.",
    items: ["Hope", "Forgiveness", "Meaning", "Spiritual struggles"],
  },
];

export default function HelpsWithSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2C7A7B]">
            What MyDeepTalk Helps With
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Support for the real things people carry quietly
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            MyDeepTalk helps you understand yourself, strengthen relationships,
            process difficult experiences, and connect with the right support
            before life becomes overwhelming.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl bg-[#F7F3EC] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 text-4xl">{pillar.icon}</div>

              <h3 className="text-2xl font-bold text-[#0F4C5C]">
                {pillar.title}
              </h3>

              <p className="mt-3 text-gray-700">{pillar.text}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {pillar.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1 text-sm text-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-center text-white shadow-lg md:p-12">
          <h3 className="text-3xl font-bold">
            You do not have to figure everything out alone.
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-white/85">
            Whether you are navigating stress, parenting, relationships, trauma,
            addiction, or simply trying to understand yourself better,
            MyDeepTalk gives you a gentle place to begin.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/self-assessment"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#0F4C5C]"
            >
              Begin Self-Discovery Check-In
            </Link>

            <Link
              href="/therapists"
              className="rounded-full border border-white px-6 py-3 font-semibold text-white"
            >
              Find a Therapist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}