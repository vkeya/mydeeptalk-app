export default function ClientJourneySection() {

  const steps = [
    "Reflect",
    "Understand Yourself",
    "Find Support",
    "Book Sessions",
    "Heal and Grow"
  ];

  return (
    <section className="bg-white px-8 py-20">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="font-semibold text-[#E2954E]">
            Your Journey
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Healing Starts With Awareness
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-5">

          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-3xl bg-[#F7F3EC] p-8 text-center shadow"
            >
              <div className="text-4xl font-bold text-[#E2954E]">
                {index + 1}
              </div>

              <h3 className="mt-5 font-bold text-[#0F4C5C]">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}