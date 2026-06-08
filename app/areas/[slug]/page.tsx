
import Link from "next/link";
import { notFound } from "next/navigation";

const areas = {
  relationships: {
    icon: "❤️",
    title: "Relationships",
    subtitle:
      "Strengthen connection, rebuild trust, and communicate better.",
    description:
      "Relationships can bring love and belonging, but they can also become painful when communication breaks down or trust is damaged.",

    experiences: [
      "Marriage difficulties",
      "Communication problems",
      "Trust and betrayal",
      "Emotional distance",
      "Dating challenges",
      "Attachment wounds",
      "Loneliness",
      "Divorce recovery",
    ],

    signs: [
      "You feel unseen or unheard.",
      "Arguments keep repeating.",
      "Trust has been broken.",
      "You withdraw instead of expressing yourself.",
      "You feel lonely even around people.",
    ],

    journalPrompts: [
      "Where do I feel most unseen in my relationships?",
      "What do I need but struggle to ask for?",
      "What relationship pattern keeps repeating in my life?",
    ],
  },

  parenting: {
    icon: "👨‍👩‍👧‍👦",
    title: "Parenting",
    subtitle:
      "Support for raising children while caring for yourself.",
    description:
      "Parenting can be deeply meaningful and deeply exhausting.",

    experiences: [
      "Parenting stress",
      "Single parenting",
      "Co-parenting",
      "Raising teenagers",
      "Family communication",
      "Parent burnout",
    ],

    signs: [
      "You feel emotionally drained.",
      "You feel guilty or not enough.",
      "You struggle to care for yourself.",
    ],

    journalPrompts: [
      "What part of parenting feels heaviest right now?",
      "What support do I need but rarely ask for?",
      "How can I care for myself while caring for my family?",
    ],
  },
};

type AreaSlug = keyof typeof areas;

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const area = areas[slug as AreaSlug];

  if (!area) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="mb-8 inline-block font-semibold text-[#0F4C5C]"
        >
          ← Back Home
        </Link>

        <section className="rounded-3xl bg-white p-10 shadow-lg">
          <div className="text-5xl">{area.icon}</div>

          <h1 className="mt-5 text-5xl font-bold text-[#0F4C5C]">
            {area.title}
          </h1>

          <p className="mt-4 text-2xl text-gray-700">
            {area.subtitle}
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-700">
            {area.description}
          </p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <section className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Common Experiences
            </h2>

            <div className="mt-5 space-y-3">
              {area.experiences.map((item) => (
                <div key={item}>✓ {item}</div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Signs You May Need Support
            </h2>

            <div className="mt-5 space-y-3">
              {area.signs.map((item) => (
                <div key={item}>✓ {item}</div>
              ))}
            </div>
          </section>

        </div>

        <section className="mt-8 rounded-3xl bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Journal Prompts
          </h2>

          <div className="mt-5 space-y-4">
            {area.journalPrompts.map((prompt) => (
              <div
                key={prompt}
                className="rounded-2xl bg-[#F7F3EC] p-4"
              >
                {prompt}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white">
          <h2 className="text-3xl font-bold">
            You can begin gently.
          </h2>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/self-assessment"
              className="rounded-full bg-white px-6 py-3 font-semibold text-[#0F4C5C]"
            >
              Take Free Check-In
            </Link>

            <Link
              href="/journal"
              className="rounded-full border border-white px-6 py-3"
            >
              Write in Journal
            </Link>

            <Link
              href="/therapists"
              className="rounded-full border border-white px-6 py-3"
            >
              Find a Therapist
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

