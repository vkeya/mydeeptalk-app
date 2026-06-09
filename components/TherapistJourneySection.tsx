export default function TherapistJourneySection() {
  const steps = [
    {
      title: "Create Your Profile",
      description:
        "Introduce yourself and share your areas of expertise.",
    },
    {
      title: "Submit Credentials",
      description:
        "Upload professional licenses and supporting documents.",
    },
    {
      title: "Get Verified",
      description:
        "Our review process helps maintain trust and quality.",
    },
    {
      title: "Set Your Availability",
      description:
        "Choose when you are available to support clients.",
    },
    {
      title: "Receive Bookings",
      description:
        "Connect with individuals seeking guidance and healing.",
    },
    {
      title: "Grow Your Practice",
      description:
        "Build meaningful relationships while expanding your impact.",
    },
  ];

  return (
    <section className="bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-widest text-[#E2954E]">
            For Therapists
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Build a Meaningful Practice With MyDeepTalk
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Join a growing community of professionals committed to emotional
            wellness. MyDeepTalk helps therapists connect with people seeking
            support while maintaining quality, trust, and professional
            standards.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
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