import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function CTASection() {
  return (
    <section className="px-6 py-24 md:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-10 text-center md:p-16">
          <div className="animate-blob pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
          <div className="animate-blob pointer-events-none absolute -bottom-24 left-12 h-64 w-64 rounded-full bg-[#E2954E]/20 blur-3xl" />

          <div className="relative">
            <span className="font-bold uppercase tracking-widest text-[#E2954E]">
              Begin Your Journey
            </span>

            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Start before life becomes too heavy.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/80">
              Build emotional awareness, access safe support, and connect with
              verified therapists who can help you heal, grow, and thrive.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#d7863b]"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="/therapists"
                className="rounded-full border border-white/60 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#0F4C5C]"
              >
                Find a Therapist
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
