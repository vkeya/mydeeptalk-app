export default function ClientJourneySection() {
  const steps = [
    {
      title: "Check In",
      description:
        "Begin with a gentle self-assessment to understand what you are carrying emotionally.",
    },
    {
      title: "Journal",
      description:
        "Reflect through guided prompts that help you name your thoughts, feelings, and patterns.",
    },
    {
      title: "Understand Patterns",
      description:
        "Notice repeated emotional themes in your relationships, decisions, stress, and inner world.",
    },
    {
      title: "Find Support",
      description:
        "Connect with verified therapists when your journey needs deeper professional support.",
    },
    {
      title: "Book Sessions",
      description:
        "Choose a therapist, schedule a session, and begin receiving support in a structured way.",
    },
    {
      title: "Continue Growing",
      description:
        "Healing is not one moment. Keep reflecting, learning, and becoming more whole over time.",
    },
  ];

  return (
    <section className="bg-white px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-script text-2xl capitalize text-[#E2954E]">
            Your Journey
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            From Self-Discovery to Real Support
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            MyDeepTalk gives you a simple path to begin before things become
            overwhelming: check in with yourself, reflect honestly, understand
            your patterns, and connect with support when needed.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl bg-[#F7F3EC] p-8 shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2954E] text-xl font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#0F4C5C]">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}