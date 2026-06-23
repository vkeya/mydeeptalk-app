import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="About Us"
        subtitle="MyDeepTalk is a preventive emotional wellness platform built in Africa to help people understand themselves, reflect honestly, access support safely, and build healthier relationships with themselves and others."
        crumbs={[{ label: "About" }]}
      />

      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                Our Mission
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                To make emotional awareness, self-discovery, healing
                conversations, and therapist support easier to access before
                emotional struggles become overwhelming.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                Our Vision
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                To become a trusted emotional wellness platform born in Africa,
                helping people reflect, heal, grow, and connect with
                professional support when they need it.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-10 shadow-lg">
            <p className="font-semibold uppercase tracking-widest text-[#E2954E]">
              Why We Exist
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
              We want people to understand themselves before life becomes too
              heavy.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Many people only begin paying attention to their emotional health
              when life becomes too difficult to ignore. A relationship breaks
              down. Burnout takes over. Anxiety becomes overwhelming.
              Loneliness becomes painful. MyDeepTalk was created to change that
              pattern.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We believe healing should not begin only after collapse. It
              should begin with awareness, reflection, emotional honesty, and
              safe support.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                Self-Discovery First
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Before people can heal, they need language for what they feel,
                what they carry, and what patterns keep repeating.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                Human Support When Needed
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Technology can guide reflection, but healing often deepens
                through safe, trusted conversations with professionals.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                Built in Africa
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                MyDeepTalk is built with an African heart and a global vision:
                accessible, personal, and culturally aware emotional wellness.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-[#0F4C5C] p-10 text-center text-white shadow-lg">
            <h2 className="text-3xl font-bold">
              Self-discovery before crisis. Support before collapse.
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-8 text-white/85">
              MyDeepTalk exists for the person who knows something feels heavy
              but does not yet know where to begin.
            </p>

            <Link
              href="/self-assessment"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#0F4C5C]"
            >
              Start With a Free Check-In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}