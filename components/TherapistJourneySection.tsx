export default function TherapistJourneySection() {

  const steps = [
    "Create Profile",
    "Upload Credentials",
    "Get Verified",
    "Set Availability",
    "Receive Bookings",
    "Grow Your Practice"
  ];

  return (
    <section className="px-8 py-20 bg-[#F7F3EC]">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="font-semibold text-[#E2954E]">
            For Therapists
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Grow With MyDeepTalk
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:grid-cols-6">

          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-3xl bg-white p-8 text-center shadow-lg"
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