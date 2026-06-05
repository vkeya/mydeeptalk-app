import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <div>
          <p className="mb-4 font-semibold text-[#E2954E]">
            Preventive Emotional Wellness
          </p>

          <h1 className="text-5xl font-bold leading-tight text-[#0F4C5C] md:text-6xl">
            Understand yourself before life becomes too heavy.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            MyDeepTalk helps you reflect, heal and connect with verified
            therapists through a safe emotional wellness platform built for Africa.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white hover:bg-[#0b3945]"
            >
              Start Your Journey
            </Link>

            <Link
              href="/therapists"
              className="rounded-full border border-[#0F4C5C] px-8 py-4 font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
            >
              Find a Therapist
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-2xl">
          <div className="rounded-[2rem] bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white">
            <h2 className="text-3xl font-bold">
              Healing should not begin only after collapse.
            </h2>

            <p className="mt-6 leading-8 text-white/80">
              Begin with awareness. Continue with support. Grow through honest
              reflection and meaningful conversations.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl bg-white/10 p-5">
                Self-discovery reflections
              </div>
              <div className="rounded-2xl bg-white/10 p-5">
                Verified therapist support
              </div>
              <div className="rounded-2xl bg-white/10 p-5">
                Safe online sessions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}