import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-[1fr_1.3fr]">
        {/* Left Side */}
        <div>
          <p className="mb-4 font-script text-2xl capitalize text-[#E2954E]">
            Preventive Emotional Wellness
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            <span className="text-[#0F4C5C]">
              Understand Yourself Before Life Becomes
            </span>{" "}
            <span className="relative whitespace-nowrap text-[#E2954E]">
              Too Heavy
              <span className="absolute bottom-1 left-0 -z-10 h-3 w-full -rotate-1 rounded-full bg-[#E2954E]/20" />
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            MyDeepTalk is an AI-powered emotional wellness platform built in
            Africa to help people reflect, heal, and connect with trusted
            therapists before stress, burnout, and relationship struggles become
            overwhelming.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white transition hover:bg-[#0b3945]"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/self-assessment"
              className="inline-flex items-center gap-2 rounded-full border border-[#0F4C5C] px-8 py-4 font-semibold text-[#0F4C5C] transition hover:border-[#E2954E] hover:bg-[#E2954E] hover:text-white"
            >
              <Compass className="h-5 w-5" />
              Free Self-Discovery
            </Link>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative transition-transform duration-500 ease-out hover:-translate-y-2">
          <Image
            src="/images/mental-hero.jpg"
            alt="MyDeepTalk Emotional Wellness"
            width={800}
            height={700}
            priority
            className="h-[460px] w-full object-cover"
          />
          {/* Creative green accent border hugging the right & bottom edges */}
          <span className="pointer-events-none absolute -bottom-3 -right-3 h-2/3 w-[6px] bg-[#0F4C5C]" />
          <span className="pointer-events-none absolute -bottom-3 -right-3 h-[6px] w-2/3 bg-[#0F4C5C]" />
        </div>
      </div>
    </section>
  );
}
