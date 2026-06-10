import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        {/* Left Side */}
        <div>
          <p className="mb-4 font-semibold uppercase tracking-widest text-[#E2954E]">
            Preventive Emotional Wellness
          </p>

          <h1 className="text-5xl font-bold leading-tight text-[#0F4C5C] md:text-6xl">
            Understand yourself before life becomes too heavy.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            MyDeepTalk is an AI-powered emotional wellness platform built in
            Africa to help people reflect, heal, and connect with trusted
            therapists before stress, burnout, and relationship struggles
            become overwhelming.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white transition hover:bg-[#0b3945]"
            >
              Start Your Journey
            </Link>

            <Link
              href="/self-assessment"
              className="rounded-full border border-[#0F4C5C] px-8 py-4 font-semibold text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
            >
              Free Self-Discovery Check-In
            </Link>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
          <Image
            src="/images/hero.png"
            alt="MyDeepTalk Emotional Wellness"
            width={800}
            height={900}
            priority
            className="h-full w-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/90 via-[#0F4C5C]/40 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 p-10 text-white">
            <p className="font-semibold uppercase tracking-widest text-white/80">
              Self-Discovery Before Crisis
            </p>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Healing should not begin only after collapse.
            </h2>

            <p className="mt-6 leading-8 text-white/90">
              Begin with awareness. Continue with support. Grow through honest
              reflection and meaningful conversations.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm">
                ✨ Guided self-discovery and reflection
              </div>

              <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm">
                ❤️ Trusted therapist support
              </div>

              <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm">
                🌿 Long-term healing and growth
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}