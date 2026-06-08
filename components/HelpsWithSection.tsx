import Link from "next/link";

const pillars = [
  {
    title: "Relationships",
    icon: "❤️",
    description:
      "Strengthen connection and navigate life's most important relationships.",
    items: [
      "Marriage difficulties",
      "Communication problems",
      "Trust and betrayal",
      "Emotional intimacy",
      "Conflict resolution",
      "Loneliness",
      "Dating challenges",
      "Attachment styles",
      "Divorce recovery",
    ],
  },
  {
    title: "Parenting",
    icon: "👨‍👩‍👧‍👦",
    description:
      "Support for parents raising emotionally healthy children while caring for themselves.",
    items: [
      "Parenting stress",
      "Single parenting",
      "Co-parenting",
      "Raising teenagers",
      "Child behaviour",
      "Parent burnout",
      "Family communication",
      "Work-life balance",
    ],
  },
  {
    title: "Trauma & Healing",
    icon: "🌿",
    description:
      "Healing from painful experiences and finding hope again.",
    items: [
      "Childhood wounds",
      "Grief and loss",
      "Betrayal trauma",
      "Emotional abuse",
      "Shame and guilt",
      "PTSD",
      "Forgiveness",
      "Life after loss",
    ],
  },
  {
    title: "Mental & Emotional Wellness",
    icon: "🧠",
    description:
      "Building emotional resilience and healthier coping.",
    items: [
      "Anxiety",
      "Depression",
      "Stress",
      "Burnout",
      "Panic attacks",
      "Anger management",
      "Sleep difficulties",
      "Low self-esteem",
    ],
  },
  {
    title: "Addiction & Recovery",
    icon: "🔄",
    description:
      "Rebuilding life one step at a time.",
    items: [
      "Pornography addiction",
      "Alcohol addiction",
      "Drug abuse",
      "Gambling addiction",
      "Compulsive behaviours",
      "Relapse prevention",
      "Accountability",
      "Recovery support",
    ],
  },
  {
    title: "Self-Discovery & Purpose",
    icon: "✨",
    description:
      "Understand yourself and discover the life you were created for.",
    items: [
      "Identity",
      "Confidence",
      "Self-worth",
      "Life transitions",
      "Career uncertainty",
      "Purpose",
      "Boundaries",
      "Personal growth",
    ],
  },
  {
    title: "Men's Wellness",
    icon: "👨",
    description:
      "A safe place for men to talk openly.",
    items: [
      "Fatherhood",
      "Masculinity",
      "Career pressure",
      "Burnout",
      "Relationships",
      "Loneliness",
      "Identity",
      "Midlife transitions",
    ],
  },
  {
    title: "Women's Wellness",
    icon: "👩",
    description:
      "Support for women navigating life's many roles.",
    items: [
      "Motherhood",
      "Pregnancy",
      "Postpartum wellbeing",
      "Fertility struggles",
      "Self-esteem",
      "Relationships",
      "Stress",
      "Work-life balance",
    ],
  },
  {
    title: "Faith & Spiritual Wellness",
    icon: "🙏",
    description:
      "Healing while honoring your values and beliefs.",
    items: [
      "Faith and mental health",
      "Hope",
      "Meaning",
      "Forgiveness",
      "Spiritual struggles",
      "Identity",
      "Life transitions",
    ],
  },
  {
    title: "Life Challenges & Transitions",
    icon: "🌍",
    description:
      "Because life changes can feel overwhelming.",
    items: [
      "Career changes",
      "Financial stress",
      "Relocation",
      "Academic pressure",
      "Retirement",
      "Relationship transitions",
      "Major life decisions",
    ],
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

              <p className="mt-3 leading-7 text-gray-700">
                {pillar.description}
              </p>

              <div className="mt-5 space-y-2">
                {pillar.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-gray-700">
                    <span className="text-[#2C7A7B]">✓</span>
                    <span>{item}</span>
                  </div>
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