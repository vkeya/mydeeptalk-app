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
        <div className="overflow-hidden rounded-[2rem] shadow-2xl">
          <Image
            src="/images/hero.png"
            alt="MyDeepTalk Emotional Wellness"
            width={800}
            height={700}
            priority
            className="h-[560px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}