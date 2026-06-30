import Link from "next/link";
import { Sprout, Heart, Users, Sparkles, Flame, Compass } from "lucide-react";
import Reveal from "@/components/Reveal";

const explores = [
  { icon: Sprout, label: "Emotional Wellness" },
  { icon: Heart, label: "Relationship Patterns" },
  { icon: Users, label: "Healing From The Past" },
  { icon: Sparkles, label: "Self-Worth & Identity" },
  { icon: Flame, label: "Burnout, Stress & Pressure" },
  { icon: Compass, label: "Purpose & Direction" },
];

export default function SelfAssessmentSection() {
  return (
    <section className="bg-[#F7F3EC] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-center gap-10 rounded-xl border border-[#0F4C5C]/10 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <span className="eyebrow">Free Self-Discovery Check-In</span>

            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              Before You Seek Answers, Understand What You Are Carrying
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              Take a private check-in to better understand your emotional
              wellbeing, relationship patterns, stress levels, and the areas of
              your life that may need more care, healing, or support.
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              This is not a diagnosis. It is a gentle self-reflection tool
              designed to help you pause, notice what is happening inside, and
              begin your journey with more clarity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/self-assessment"
                className="rounded-full bg-[#0F4C5C] px-6 py-4 font-semibold text-white transition hover:bg-[#0b3945]"
              >
                Take Free Check-In
              </Link>

              <Link
                href="/how-it-works"
                className="rounded-full border border-[#0F4C5C] px-6 py-4 font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
              >
                See How It Works
              </Link>
            </div>
          </div>

          <div className="rounded-xl bg-[#F7F3EC] p-8">
            <h3 className="text-2xl font-bold text-[#0F4C5C]">
              Your Check-In Explores:
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {explores.map((e) => (
                <div
                  key={e.label}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-gray-700 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E2954E]/12 text-[#E2954E]">
                    <e.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold">{e.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
              <p className="font-bold text-[#0F4C5C]">Private • Free • Gentle</p>

              <p className="mt-2 leading-7 text-gray-600">
                Receive guided reflection and discover where your current growth
                journey may need attention.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}