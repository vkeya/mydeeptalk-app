import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC]">

      {/* Hero */}

      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-lg">

            <p className="font-semibold text-[#E2954E]">
              How MyDeepTalk Works
            </p>

            <h1 className="mt-4 text-5xl font-bold">
              A simple path toward healing and self-discovery.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Whether you're exploring yourself, struggling emotionally,
              or seeking professional support, MyDeepTalk guides you step by step.
            </p>

          </div>

        </div>
      </section>

      {/* Steps */}

      <section className="px-8 pb-20">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <div className="text-5xl font-bold text-[#E2954E]">1</div>

            <h2 className="mt-6 text-2xl font-bold text-[#0F4C5C]">
              Reflect and Understand Yourself
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Explore emotional wellness, identity, relationships,
              trauma, purpose and personal growth through guided reflection.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <div className="text-5xl font-bold text-[#E2954E]">2</div>

            <h2 className="mt-6 text-2xl font-bold text-[#0F4C5C]">
              Find a Verified Therapist
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Browse professional therapists based on specialty,
              language, gender and experience.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <div className="text-5xl font-bold text-[#E2954E]">3</div>

            <h2 className="mt-6 text-2xl font-bold text-[#0F4C5C]">
              Book Sessions
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Schedule sessions at times that work for you and
              begin meaningful healing conversations.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <div className="text-5xl font-bold text-[#E2954E]">4</div>

            <h2 className="mt-6 text-2xl font-bold text-[#0F4C5C]">
              Heal and Grow
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Build healthier relationships with yourself and others
              through continuous support and emotional awareness.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="px-8 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#0F4C5C] p-12 text-center text-white shadow-xl">

          <h2 className="text-4xl font-bold">
            Begin Your Healing Journey Today
          </h2>

          <p className="mt-6 text-white/80">
            Start with self-awareness and connect with support when you need it.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white hover:bg-[#d07f34]"
          >
            Get Started
          </Link>

        </div>
      </section>

    </main>
  );
}