import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Begin With a Gentle Check-In",
      description:
        "Take a private self-discovery check-in to better understand your emotional wellbeing, relationships, stress levels, and areas that may need attention.",
    },
    {
      number: "2",
      title: "Reflect and Journal",
      description:
        "Use guided reflection and journaling prompts to gain clarity around your thoughts, emotions, and recurring patterns.",
    },
    {
      number: "3",
      title: "Understand Your Patterns",
      description:
        "Recognize the emotional habits, beliefs, and experiences influencing your relationships, identity, and decisions.",
    },
    {
      number: "4",
      title: "Connect With a Verified Therapist",
      description:
        "When deeper support is needed, connect with qualified professionals based on specialty, language, experience, and preferences.",
    },
    {
      number: "5",
      title: "Book Sessions",
      description:
        "Schedule sessions at times that work for you and begin meaningful healing conversations.",
    },
    {
      number: "6",
      title: "Continue Growing",
      description:
        "Healing is not a destination. Continue building self-awareness, healthier relationships, and emotional resilience over time.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      {/* Hero */}

      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-lg">
            <p className="font-semibold uppercase tracking-widest text-[#E2954E]">
              How MyDeepTalk Works
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight">
              Self-discovery before crisis.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
              MyDeepTalk is more than therapy. It is a journey of reflection,
              understanding, support, and long-term emotional growth.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}

      <section className="px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-[#0F4C5C]">
            Healing Should Not Begin Only After Collapse
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Most people seek support only when life becomes overwhelming.
            Relationships break down. Stress becomes burnout. Loneliness turns
            into isolation.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            We believe healing should begin earlier—with awareness,
            reflection, and understanding.
          </p>
        </div>
      </section>

      {/* Steps */}

      <section className="px-8 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-white p-10 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-5xl font-bold text-[#E2954E]">
                {step.number}
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#0F4C5C]">
                {step.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="px-8 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#0F4C5C] p-12 text-center text-white shadow-xl">
          <h2 className="text-4xl font-bold">
            Begin Your Self-Discovery Journey
          </h2>

          <p className="mt-6 text-white/85">
            Start with awareness. Continue with support. Grow with intention.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/self-assessment"
              className="rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white hover:bg-[#d07f34]"
            >
              Free Check-In
            </Link>

            <Link
              href="/therapists"
              className="rounded-full border border-white px-8 py-4 font-semibold text-white hover:bg-white hover:text-[#0F4C5C]"
            >
              Find a Therapist
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}