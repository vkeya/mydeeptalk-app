import Link from "next/link";
import { Brain, Activity, HeartPulse, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

const assessments = [
  {
    icon: Brain,
    title: "Anxiety Assessment",
    description: "Understand anxiety patterns and emotional responses.",
  },
  {
    icon: Activity,
    title: "Burnout Assessment",
    description: "Explore stress, exhaustion, and pressure levels.",
  },
  {
    icon: HeartPulse,
    title: "Mental Wellness Assessment",
    description: "Reflect on your current emotional wellbeing.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Confidential",
    description: "Your responses are handled securely.",
  },
];

export default function SelfAssessmentSection() {
  return (
    <section className="bg-[#F7F3EC] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid items-center gap-10 rounded-xl border border-[#0F4C5C]/10 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12">

          <div>
            <span className="eyebrow">
              Free Mental Wellness Assessments
            </span>

            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C] md:text-4xl">
              Understand What You Are Experiencing
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              Take a confidential assessment designed to help you understand
              specific challenges such as anxiety, burnout, stress, and
              emotional wellbeing.
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              These assessments are designed for self-awareness and guidance.
              They do not replace professional diagnosis.
            </p>

            <Link
              href="/assessments"
              className="mt-8 inline-block rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white transition hover:bg-[#0b3945]"
            >
              Explore Assessments
            </Link>
          </div>


          <div className="rounded-xl bg-[#F7F3EC] p-8">

            <h3 className="text-2xl font-bold text-[#0F4C5C]">
              Available Assessments
            </h3>

            <div className="mt-6 grid gap-4">

              {assessments.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2954E]/12 text-[#E2954E]">
                    <item.icon className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="font-bold text-[#0F4C5C]">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </Reveal>
      </div>
    </section>
  );
}