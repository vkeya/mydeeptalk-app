import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <section className="px-8 py-8">
     
      </section>

      <section className="px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-lg">
            <p className="font-semibold text-[#E2954E]">About MyDeepTalk</p>

            <h1 className="mt-4 text-5xl font-bold leading-tight">
              Emotional wellness should begin before crisis.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              MyDeepTalk is a preventive emotional wellness platform built to help
              people understand themselves more deeply, reflect honestly, access
              support safely, and build healthier relationships with themselves and others.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#0F4C5C]">Our Mission</h2>
              <p className="mt-4 leading-7 text-gray-600">
                To make emotional awareness, self-discovery, healing conversations,
                and therapist support easier to access before emotional struggles
                become overwhelming.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-[#0F4C5C]">Our Vision</h2>
              <p className="mt-4 leading-7 text-gray-600">
                To become a trusted emotional wellness platform born in Africa,
                helping people reflect, heal, grow, and connect with professional
                support when they need it.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-[#0F4C5C]">
              Why MyDeepTalk Exists
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Many people only begin paying attention to their emotional health
              when life becomes too heavy to ignore. A relationship breaks down.
              Burnout takes over. Anxiety becomes overwhelming. Loneliness becomes
              painful. MyDeepTalk was created to change that pattern.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We believe healing should not begin only after collapse. It should
              begin with awareness, reflection, emotional honesty, and safe support.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}