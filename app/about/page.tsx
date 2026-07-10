import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Eye,
  HeartHandshake,
  Globe2,
  Leaf,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const values = [
  {
    icon: Compass,
    title: "Self-Discovery First",
    text: "Before people can heal, they need language for what they feel, what they carry, and the patterns that keep repeating.",
  },
  {
    icon: HeartHandshake,
    title: "Human Support When Needed",
    text: "Technology can guide reflection, but healing often deepens through safe, trusted conversations with professionals.",
  },
  {
    icon: Globe2,
    title: "Built in Africa",
    text: "MyDeepTalk is built with an African heart and a global vision: accessible, personal, and culturally aware.",
  },
];

export const metadata = {
  title: "About MyDeepTalk | Online Therapy Platform",
  description:
    "Learn how MyDeepTalk connects people with trusted therapists for confidential counselling and mental wellness support.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="About Us"
        subtitle="MyDeepTalk is a preventive emotional wellness platform built in Africa to help people understand themselves, reflect honestly, access support safely, and build healthier relationships."
        crumbs={[{ label: "About" }]}
      />

      {/* Story — text + image */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              We want people to understand themselves before life becomes too
              heavy
            </h2>
            <p className="mt-6 leading-8 text-gray-600">
              Many people only begin paying attention to their emotional health
              when life becomes too difficult to ignore. A relationship breaks
              down. Burnout takes over. Anxiety becomes overwhelming. Loneliness
              becomes painful. MyDeepTalk was created to change that pattern.
            </p>
            <p className="mt-4 leading-8 text-gray-600">
              We believe healing should not begin only after collapse. It
              should begin with awareness, reflection, emotional honesty, and
              safe support.
            </p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="relative">
              <div className="img-zoom photo-wash relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={IMAGES.aboutStory}
                  alt="A quiet moment of self-reflection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 hidden max-w-[230px] items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:flex animate-float-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E2954E]/15 text-[#E2954E]">
                  <Leaf className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold leading-snug text-[#0F4C5C]">
                  Healing begins with awareness, not crisis.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {[
            {
              icon: Compass,
              label: "Our Mission",
              text: "To make emotional awareness, self-discovery, healing conversations, and therapist support easier to access — before emotional struggles become overwhelming.",
            },
            {
              icon: Eye,
              label: "Our Vision",
              text: "To become a trusted emotional wellness platform born in Africa, helping people reflect, heal, grow, and connect with professional support when they need it.",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 120}>
              <div className="card-soft h-full p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F4C5C]/8 text-[#0F4C5C]">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
                  {item.label}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">What Guides Us</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              Healing begins with understanding yourself
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 110} variant="zoom">
                <div className="card-soft group h-full p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E] transition group-hover:scale-110">
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-[#0F4C5C]">
                    {v.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — solid teal, image accent, soft (no heavy gradient) */}
      <section className="bg-[#F7F3EC] px-6 py-24 md:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-10 md:p-16">
            {/* Ambient blob accents */}
            <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
            <div className="animate-blob pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#E2954E]/20 blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
                  <Sparkles className="h-4 w-4" /> Start where you are
                </span>
                <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                  Self-discovery before crisis. Support before collapse.
                </h2>
                <p className="mt-5 max-w-xl leading-8 text-white/85">
                  MyDeepTalk exists for the person who knows something feels
                  heavy but does not yet know where to begin.
                </p>
                <Link
                  href="/assessments"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#d07f34]"
                >
                  Start With a Free Check-In
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="img-zoom relative hidden aspect-square overflow-hidden rounded-xl lg:block">
                <Image
                  src={IMAGES.aboutAfrica}
                  alt="Supportive human connection"
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
