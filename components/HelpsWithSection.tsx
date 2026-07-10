"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  Sprout,
  Brain,
  RefreshCw,
  Sparkles,
  User,
  UserRound,
  Church,
  Compass,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    title: "Relationships",
    slug: "relationships",
    icon: Heart,
    description:
      "Strengthen communication, rebuild trust, and create healthier emotional connection.",
    items: [
      "Marriage difficulties",
      "Communication problems",
      "Trust and betrayal",
      "Emotional intimacy",
      "Conflict resolution",
      "Loneliness",
      "Dating challenges",
      "Attachment styles",
      "Divorce recovery",
    ],
  },
  {
    title: "Parenting",
    slug: "parenting",
    icon: Users,
    description:
      "Support for parents raising emotionally healthy children while also caring for themselves.",
    items: [
      "Parenting stress",
      "Single parenting",
      "Co-parenting",
      "Raising teenagers",
      "Child behaviour",
      "Parent burnout",
      "Family communication",
      "Work-life balance",
    ],
  },
  {
    title: "Trauma & Healing",
    slug: "trauma-healing",
    icon: Sprout,
    description:
      "Gently process painful experiences and begin rebuilding safety, hope, and strength.",
    items: [
      "Childhood wounds",
      "Grief and loss",
      "Betrayal trauma",
      "Emotional abuse",
      "Shame and guilt",
      "PTSD",
      "Forgiveness",
      "Life after loss",
    ],
  },
  {
    title: "Mental & Emotional Wellness",
    slug: "mental-emotional-wellness",
    icon: Brain,
    description:
      "Build emotional awareness, resilience, and healthier ways of coping with life.",
    items: [
      "Anxiety",
      "Depression",
      "Stress",
      "Burnout",
      "Panic attacks",
      "Anger management",
      "Sleep difficulties",
      "Low self-esteem",
    ],
  },
  {
    title: "Addiction & Recovery",
    slug: "addiction-recovery",
    icon: RefreshCw,
    description:
      "Find support, accountability, and practical steps for rebuilding life one day at a time.",
    items: [
      "Pornography addiction",
      "Alcohol addiction",
      "Drug abuse",
      "Gambling addiction",
      "Compulsive behaviours",
      "Relapse prevention",
      "Accountability",
      "Recovery support",
    ],
  },
  {
    title: "Self-Discovery & Purpose",
    slug: "self-discovery-purpose",
    icon: Sparkles,
    description:
      "Understand your identity, values, patterns, and the life you are becoming.",
    items: [
      "Identity",
      "Confidence",
      "Self-worth",
      "Life transitions",
      "Career uncertainty",
      "Purpose",
      "Boundaries",
      "Personal growth",
    ],
  },
  {
    title: "Men's Wellness",
    slug: "mens-wellness",
    icon: User,
    description:
      "A safe space for men to speak honestly about pressure, identity, emotions, and relationships.",
    items: [
      "Fatherhood",
      "Masculinity",
      "Career pressure",
      "Burnout",
      "Relationships",
      "Loneliness",
      "Identity",
      "Midlife transitions",
    ],
  },
  {
    title: "Women's Wellness",
    slug: "womens-wellness",
    icon: UserRound,
    description:
      "Support for women navigating identity, motherhood, relationships, purpose, and emotional wellbeing.",
    items: [
      "Motherhood",
      "Pregnancy",
      "Postpartum wellbeing",
      "Fertility struggles",
      "Self-esteem",
      "Relationships",
      "Stress",
      "Work-life balance",
    ],
  },
  {
    title: "Faith & Spiritual Wellness",
    slug: "faith-spiritual-wellness",
    icon: Church,
    description:
      "Explore healing, hope, meaning, forgiveness, and emotional wellness while honoring your values.",
    items: [
      "Faith and mental health",
      "Hope",
      "Meaning",
      "Forgiveness",
      "Spiritual struggles",
      "Identity",
      "Life transitions",
    ],
  },
  {
    title: "Life Challenges & Transitions",
    slug: "life-challenges-transitions",
    icon: Compass,
    description:
      "Find clarity and emotional support when life changes feel uncertain or overwhelming.",
    items: [
      "Career changes",
      "Financial stress",
      "Relocation",
      "Academic pressure",
      "Retirement",
      "Relationship transitions",
      "Major life decisions",
    ],
  },
];

export default function HelpsWithSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  function slide(dir: "prev" | "next") {
    if (!trackRef.current) return;
    // Scroll by the visible container width (= 3 cards + 2 gaps), snap corrects alignment
    const amount = trackRef.current.clientWidth;
    trackRef.current.scrollBy({
      left: dir === "prev" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">What MyDeepTalk Helps With</span>

          <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
            Support for the real things people carry quietly
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            MyDeepTalk helps you understand yourself before life becomes too
            heavy. Begin with self-discovery, reflect through guided journaling,
            and connect with verified therapists when deeper support is needed.
          </p>
        </Reveal>

        {/* Carousel */}
        <div className="relative mt-14">
          {/* Prev */}
          <button
            onClick={() => slide("prev")}
            aria-label="Previous"
            className="absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#0F4C5C]/15 bg-white shadow-sm text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-scroll scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex-none snap-start w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="card-soft group flex h-full flex-col p-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E] transition group-hover:scale-110">
                    <pillar.icon className="h-7 w-7" />
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {pillar.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {pillar.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F3EC] px-3 py-1 text-sm text-gray-700"
                      >
                        <Check className="h-3.5 w-3.5 text-[#2C7A7B]" />
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/areas/${pillar.slug}`}
                    className="group/link mt-auto pt-6 inline-flex items-center gap-1.5 font-semibold text-[#0F4C5C]"
                  >
                    Explore this area
                    <ArrowRight className="h-4 w-4 transition group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => slide("next")}
            aria-label="Next"
            className="absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#0F4C5C]/15 bg-white shadow-sm text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* CTA */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-8 text-center md:p-12">
            <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
            <div className="animate-blob pointer-events-none absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-[#E2954E]/20 blur-3xl" />
            <div className="relative">
              <span className="text-sm font-bold uppercase tracking-widest text-white/80">
                Self-discovery before crisis
              </span>

              <h3 className="mt-3 text-3xl font-bold text-white">
                You do not have to figure everything out alone.
              </h3>

              <p className="mx-auto mt-4 max-w-3xl text-white/85">
                Whether you are navigating relationships, parenting, trauma,
                addiction, stress, or questions about who you are becoming,
                MyDeepTalk gives you a gentle place to begin.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/assessments"
                  className="rounded-full bg-white px-6 py-3 font-semibold text-[#0F4C5C] transition hover:bg-white/90"
                >
                  Begin Self-Discovery Check-In
                </Link>

                <Link
                  href="/therapists"
                  className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#0F4C5C]"
                >
                  Find a Therapist
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
