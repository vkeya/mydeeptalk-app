import Link from "next/link";

const pillars = [
  {
    title: "Relationships",
    slug: "relationships",
    icon: "❤️",
    description:
      "Strengthen communication, rebuild trust, and create healthier emotional connection.",
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
    slug: "parenting",
    icon: "👨‍👩‍👧‍👦",
    description:
      "Support for parents raising emotionally healthy children while also caring for themselves.",
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
    slug: "trauma-healing",
    icon: "🌿",
    description:
      "Gently process painful experiences and begin rebuilding safety, hope, and strength.",
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
    slug: "mental-emotional-wellness",
    icon: "🧠",
    description:
      "Build emotional awareness, resilience, and healthier ways of coping with life.",
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
    slug: "addiction-recovery",
    icon: "🔄",
    description:
      "Find support, accountability, and practical steps for rebuilding life one day at a time.",
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
    slug: "self-discovery-purpose",
    icon: "✨",
    description:
      "Understand your identity, values, patterns, and the life you are becoming.",
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
    slug: "mens-wellness",
    icon: "👨",
    description:
      "A safe space for men to speak honestly about pressure, identity, emotions, and relationships.",
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
    slug: "womens-wellness",
    icon: "👩",
    description:
      "Support for women navigating identity, motherhood, relationships, purpose, and emotional wellbeing.",
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
    slug: "faith-spiritual-wellness",
    icon: "🙏",
    description:
      "Explore healing, hope, meaning, forgiveness, and emotional wellness while honoring your values.",
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
    slug: "life-challenges-transitions",
    icon: "🌍",
    description:
      "Find clarity and emotional support when life changes feel uncertain or overwhelming.",
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
            MyDeepTalk helps you understand yourself before life becomes too
            heavy. Begin with self-discovery, reflect through guided journaling,
            and connect with verified therapists when deeper support is needed.
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
                  <div
                    key={item}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="font-bold text-[#2C7A7B]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/areas/${pillar.slug}`}
                className="mt-6 inline-block font-semibold text-[#0F4C5C] hover:underline"
              >
                Explore this area →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-center text-white shadow-lg md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
            Self-discovery before crisis
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            You do not have to figure everything out alone.
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-white/85">
            Whether you are navigating relationships, parenting, trauma,
            addiction, stress, or questions about who you are becoming,
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
              className="rounded-full border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-[#0F4C5C]"
            >
              Find a Therapist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}