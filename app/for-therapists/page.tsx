import Link from "next/link";
import Image from "next/image";
import {
  Users,
  BadgeCheck,
  CalendarClock,
  Sprout,
  HeartHandshake,
  Globe2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const benefits = [
  {
    icon: Users,
    title: "Reach People Earlier",
    description:
      "Connect with clients beginning their self-discovery journey, before life becomes overwhelming.",
  },
  {
    icon: BadgeCheck,
    title: "Build Trust Through Verification",
    description:
      "Your profile and credentials help users feel safer when choosing professional support.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Scheduling",
    description:
      "Set your availability, manage bookings, and support clients at times that work for your practice.",
  },
  {
    icon: Sprout,
    title: "Support Preventive Wellness",
    description:
      "Be part of a platform focused not only on crisis response, but on awareness, reflection, and early support.",
  },
  {
    icon: HeartHandshake,
    title: "Focus on Healing",
    description:
      "Spend more time supporting clients while MyDeepTalk simplifies discovery, bookings, and visibility.",
  },
  {
    icon: Globe2,
    title: "Built in Africa",
    description:
      "Join an emotional wellness platform designed with African realities and a global vision in mind.",
  },
];

const process = [
  "Create your therapist profile",
  "Upload your credentials",
  "Wait for verification review",
  "Set your availability",
  "Receive bookings",
  "Grow your impact",
];

export default function ForTherapistsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="For Therapists"
        subtitle="Join MyDeepTalk and become part of a trusted emotional wellness platform built around self-discovery, early support, professional care, and meaningful healing conversations."
        crumbs={[{ label: "For Therapists" }]}
      />

      {/* Intro + image */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="eyebrow">Why Join MyDeepTalk</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              Grow your practice with purpose
            </h2>
            <p className="mt-6 leading-8 text-gray-600">
              MyDeepTalk is not just a booking directory. It is a preventive
              emotional wellness platform helping people understand themselves
              and seek support earlier.
            </p>
            <Link
              href="/signup"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-7 py-3.5 font-semibold text-white transition hover:bg-[#0b3945]"
            >
              Apply as Therapist
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal variant="right" delay={120} className="img-zoom photo-wash relative aspect-[5/4] overflow-hidden rounded-xl">
            <Image
              src={IMAGES.forTherapists}
              alt="A therapist supporting a client"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i % 3) * 110} variant="zoom">
              <div className="card-soft group h-full p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E] transition group-hover:scale-110">
                  <benefit.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-[#0F4C5C]">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">How It Works</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              From application to impact
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <Reveal key={step} delay={(index % 3) * 100}>
                <div className="card-soft flex h-full items-center gap-4 p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F4C5C] text-lg font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-[#0F4C5C]">{step}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F7F3EC] px-6 py-24 md:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-10 text-center md:p-16">
            <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
            <div className="animate-blob pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#E2954E]/20 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4" /> Join the community
              </span>
              <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                Ready to support healing with purpose?
              </h2>
              <p className="mt-5 leading-8 text-white/85">
                Become part of the MyDeepTalk therapist community and help people
                build healthier emotional lives through awareness, reflection,
                and professional support.
              </p>
              <Link
                href="/signup"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#E2954E] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#d07f34]"
              >
                Apply as Therapist
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
