import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  Check,
  X,
  Stethoscope,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const canDo = [
  "Encourage self-reflection",
  "Help identify emotional patterns",
  "Suggest gentle questions for deeper insight",
  "Promote emotional awareness",
  "Support healthy habits and personal growth",
];

const cannotDo = [
  "Diagnose medical or mental health conditions",
  "Provide psychotherapy",
  "Replace licensed therapists",
  "Provide emergency or crisis intervention",
  "Guarantee outcomes or advice",
];

export default function AIReflectionsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="About DeepTalk AI Reflections"
        subtitle="A gentle companion for self-awareness, reflection, and emotional insight — never a replacement for professional care."
        crumbs={[{ label: "DeepTalk AI" }]}
      />

      {/* Intro + image */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="eyebrow">What is DeepTalk AI?</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              Reflection, made a little easier
            </h2>
            <p className="mt-6 leading-8 text-gray-600">
              DeepTalk AI is designed to support self-awareness, reflection,
              emotional insight, and personal growth.
            </p>
            <p className="mt-4 leading-8 text-gray-600">
              It helps you explore thoughts, emotions, and experiences through
              reflective conversations and journaling prompts.
            </p>
          </Reveal>
          <Reveal variant="right" delay={120} className="relative">
            <div className="img-zoom photo-wash relative aspect-[5/4] overflow-hidden rounded-xl">
              <Image
                src={IMAGES.aiReflections}
                alt="Reflecting and journaling"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:flex animate-float-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F4C5C]/8 text-[#0F4C5C]">
                <Brain className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-snug text-[#0F4C5C]">
                A companion for reflection.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Can / Cannot */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card-soft h-full p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C7A7B]/12 text-[#2C7A7B]">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                What DeepTalk AI can do
              </h3>
              <ul className="mt-5 space-y-3">
                {canDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2C7A7B]/15 text-[#2C7A7B]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-soft h-full p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C0392B]/10 text-[#C0392B]">
                <X className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                What DeepTalk AI cannot do
              </h3>
              <ul className="mt-5 space-y-3">
                {cannotDo.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C0392B]/12 text-[#C0392B]">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* When to seek help */}
      <section className="bg-white px-6 py-16 md:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="card-soft flex flex-col gap-5 p-8 md:flex-row md:items-center md:p-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E]">
              <Stethoscope className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#0F4C5C]">
                When to seek professional help
              </h3>
              <p className="mt-2 leading-8 text-gray-600">
                If your emotional struggles feel overwhelming, persistent, or are
                affecting your daily life, we encourage you to speak with a
                qualified mental health professional. DeepTalk AI works best as a
                companion for reflection — not a substitute for professional care.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Philosophy CTA */}
      <section className="bg-[#F7F3EC] px-6 py-24 md:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-10 text-center md:p-16">
            <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
            <div className="animate-blob pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#E2954E]/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4" /> Our philosophy
              </span>
              <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Healing begins with awareness
              </h2>
              <p className="mt-5 leading-8 text-white/85">
                Understanding yourself is one of the most powerful steps toward
                growth, healing, and meaningful connection.
              </p>
              <Link
                href="/self-assessment"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#d07f34]"
              >
                Start a Check-In
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
