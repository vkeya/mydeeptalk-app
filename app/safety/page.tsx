import Link from "next/link";
import Image from "next/image";
import {
  HeartHandshake,
  Flag,
  Ban,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const zeroTolerance = [
  "Harassment and bullying",
  "Hate speech or discrimination",
  "Threats or intimidation",
  "Fraud and scams",
  "Sharing private information without consent",
  "Impersonation or false identities",
];

export default function SafetyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Safety & Trust"
        subtitle="MyDeepTalk is committed to creating a safe, respectful, and supportive environment for everyone."
        crumbs={[{ label: "Safety & Trust" }]}
      />

      {/* Intro + image */}
      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Reveal variant="left">
            <span className="eyebrow">Our Commitment</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              A space where healing feels safe
            </h2>
            <p className="mt-6 leading-8 text-gray-600">
              Healing happens best in spaces where people feel respected,
              understood, and emotionally safe. We work to protect that for
              every member of the community.
            </p>
          </Reveal>
          <Reveal variant="right" delay={120} className="img-zoom photo-wash relative aspect-[5/4] overflow-hidden rounded-xl">
            <Image
              src={IMAGES.safety}
              alt="A safe, calm and supportive space"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-[#F7F3EC] px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              icon: HeartHandshake,
              title: "Respect and Kindness",
              text: "Every member deserves dignity, empathy, and respect regardless of their experiences, beliefs, or background.",
              tint: "#2C7A7B",
            },
            {
              icon: Flag,
              title: "Report Harmful Behavior",
              text: "If you encounter harassment, bullying, scams, or anything that makes you feel unsafe, please report it.",
              tint: "#E2954E",
            },
            {
              icon: BadgeCheck,
              title: "Therapist Verification",
              text: "MyDeepTalk reviews therapist credentials to help maintain trust and professionalism across the platform.",
              tint: "#0F4C5C",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 110} variant="zoom">
              <div className="card-soft group h-full p-8">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-110"
                  style={{ backgroundColor: `${c.tint}1f`, color: c.tint }}
                >
                  <c.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-[#0F4C5C]">
                  {c.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Zero tolerance */}
      <section className="bg-white px-6 py-24 md:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-xl border border-[#C0392B]/15 bg-white p-8 md:p-12">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C0392B]/10 text-[#C0392B]">
                <Ban className="h-6 w-6" />
              </span>
              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                Zero tolerance policy
              </h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {zeroTolerance.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-[#F7F3EC] px-4 py-3 text-gray-700"
                >
                  <Ban className="h-4 w-4 shrink-0 text-[#C0392B]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Closing */}
        <Reveal className="mx-auto mt-6 max-w-6xl">
          <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-8 md:p-12">
            <div className="animate-blob pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Building a safe community
                  </h2>
                  <p className="mt-2 max-w-xl leading-7 text-white/85">
                    Together we keep MyDeepTalk a place where people feel
                    respected, understood, and emotionally safe.
                  </p>
                </div>
              </div>
              <Link
                href="/community-guidelines"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E2954E] px-6 py-3 font-semibold text-white transition hover:bg-[#d07f34]"
              >
                Community Guidelines
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-6xl text-sm font-semibold text-gray-500">
          Last updated: June 2026
        </p>
      </section>
    </main>
  );
}
