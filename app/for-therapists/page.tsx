import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function ForTherapistsPage() {
  const benefits = [
    {
      title: "Reach People Earlier",
      description:
        "Connect with clients who are beginning their self-discovery journey before life becomes overwhelming.",
    },
    {
      title: "Build Trust Through Verification",
      description:
        "Your profile and credentials help users feel safer when choosing professional support.",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Set your availability, manage bookings, and support clients at times that work for your practice.",
    },
    {
      title: "Support Preventive Wellness",
      description:
        "Be part of a platform focused not only on crisis response, but on awareness, reflection, and early support.",
    },
    {
      title: "Focus on Healing",
      description:
        "Spend more time supporting clients while MyDeepTalk helps simplify discovery, bookings, and visibility.",
    },
    {
      title: "Built in Africa",
      description:
        "Join an emotional wellness platform designed with African realities and a global vision in mind.",
    },
  ];

  const process = [
    "Create your therapist profile",
    "Upload your credentials",
    "Wait for verification review",
    "Set your availability",
    "Receive bookings",
    "Grow your impact",
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="For Therapists"
        subtitle="Join MyDeepTalk and become part of a trusted emotional wellness platform built around self-discovery, early support, professional care, and meaningful healing conversations."
        crumbs={[{ label: "For Therapists" }]}
      />

      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-widest text-[#E2954E]">
              Why Join MyDeepTalk
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              Grow your practice with purpose
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              MyDeepTalk is not just a booking directory. It is a preventive
              emotional wellness platform helping people understand themselves
              and seek support earlier.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl bg-white p-10 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-[#0F4C5C]">
                  {benefit.title}
                </h3>

                <p className="mt-5 leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 shadow-lg">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-widest text-[#E2954E]">
              How It Works
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              From application to impact
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <div
                key={step}
                className="rounded-3xl bg-[#F7F3EC] p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E2954E] text-xl font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="mt-5 font-bold text-[#0F4C5C]">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-8 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#0F4C5C] p-12 text-center text-white shadow-xl">
          <h2 className="text-4xl font-bold">
            Ready to support healing with purpose?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/85">
            Become part of the MyDeepTalk therapist community and help people
            build healthier emotional lives through awareness, reflection, and
            professional support.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white hover:bg-[#d07f34]"
          >
            Apply as Therapist
          </Link>
        </div>
      </section>
    </main>
  );
}
