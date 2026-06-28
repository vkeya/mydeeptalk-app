import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse,
  NotebookPen,
  Compass,
  Users,
  CalendarCheck,
  Leaf,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const steps = [
  {
    icon: HeartPulse,
    title: "Begin With a Gentle Check-In",
    description:
      "Take a private self-discovery check-in to better understand your emotional wellbeing, relationships, stress levels, and the areas that may need attention.",
  },
  {
    icon: NotebookPen,
    title: "Reflect and Journal",
    description:
      "Use guided reflection and journaling prompts to gain clarity around your thoughts, emotions, and recurring patterns.",
  },
  {
    icon: Compass,
    title: "Understand Your Patterns",
    description:
      "Recognize the emotional habits, beliefs, and experiences influencing your relationships, identity, and decisions.",
  },
  {
    icon: Users,
    title: "Connect With a Verified Therapist",
    description:
      "When deeper support is needed, connect with qualified professionals based on specialty, language, experience, and preferences.",
  },
  {
    icon: CalendarCheck,
    title: "Book Sessions",
    description:
      "Schedule sessions at times that work for you and begin meaningful healing conversations.",
  },
  {
    icon: Leaf,
    title: "Continue Growing",
    description:
      "Healing is not a destination. Keep building self-awareness, healthier relationships, and emotional resilience over time.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="How It Works"
        subtitle="MyDeepTalk is more than therapy. It is a journey of reflection, understanding, support, and long-term emotional growth."
        crumbs={[{ label: "How It Works" }]}
      />

      {/* Philosophy — image + text */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left" className="img-zoom photo-wash relative aspect-[5/4] overflow-hidden rounded-xl">
            <Image
              src={IMAGES.journeyReflect}
              alt="A calm space to begin reflecting"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>

          <Reveal variant="right" delay={120}>
            <span className="eyebrow">The Philosophy</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              Healing should not begin only after collapse
            </h2>
            <p className="mt-6 leading-8 text-gray-600">
              Most people seek support only when life becomes overwhelming.
              Relationships break down. Stress becomes burnout. Loneliness turns
              into isolation.
            </p>
            <p className="mt-4 leading-8 text-gray-600">
              We believe healing should begin earlier — with awareness,
              reflection, and understanding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps — connected journey */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Your Journey</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              Six gentle steps, at your own pace
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 3) * 110}>
                <div className="card-soft group relative h-full p-8">
                  <span className="absolute right-6 top-6 text-5xl font-bold text-[#0F4C5C]/8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E] transition group-hover:scale-110">
                    <step.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-[#0F4C5C]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 py-24 md:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-10 md:p-16">
            <div className="animate-blob pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
            <div className="animate-blob pointer-events-none absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-[#E2954E]/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4" /> Begin today
              </span>
              <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Begin your self-discovery journey
              </h2>
              <p className="mt-5 leading-8 text-white/85">
                Start with awareness. Continue with support. Grow with
                intention.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/self-assessment"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#d07f34]"
                >
                  Free Check-In
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/therapists"
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#0F4C5C]"
                >
                  Find a Therapist
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
