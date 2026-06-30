import Link from "next/link";
import { TriangleAlert, Phone, Hospital, Users, Stethoscope, ArrowRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const steps = [
  { icon: Phone, text: "Call your local emergency number." },
  { icon: Hospital, text: "Go to the nearest hospital or emergency room." },
  { icon: Users, text: "Contact a trusted family member or friend." },
  { icon: Stethoscope, text: "Seek support from a licensed mental health professional." },
];

export default function EmergencyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Emergency Disclaimer"
        subtitle="Please read this carefully. MyDeepTalk supports emotional wellness, but it is not built for emergencies."
        crumbs={[{ label: "Emergency" }]}
      />

      <section className="bg-white px-6 py-24 md:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <Reveal>
            <div className="flex items-start gap-4 rounded-xl bg-[#C0392B] p-8 text-white md:p-10">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <TriangleAlert className="h-7 w-7 text-white" />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  MyDeepTalk is not an emergency service
                </h2>
                <p className="mt-2 leading-7 text-white/90">
                  MyDeepTalk does not provide crisis intervention, emergency
                  medical care, or emergency psychiatric services.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="card-soft p-8 md:p-10">
              <p className="leading-8 text-gray-700">
                If you are experiencing thoughts of harming yourself, harming
                others, or believe you may be in immediate danger, please:
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {steps.map((step, i) => (
                  <div
                    key={step.text}
                    className="flex items-center gap-4 rounded-2xl border border-[#0F4C5C]/8 bg-[#F7F3EC] p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E2954E] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="flex items-center gap-2.5 font-semibold text-[#0F4C5C]">
                      <step.icon className="h-5 w-5 shrink-0 text-[#0F4C5C]" />
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 leading-8 text-gray-600">
                Therapists available through MyDeepTalk are independent providers
                and may not be immediately available during emergencies.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#E2954E]/30 bg-[#E2954E]/8 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold leading-7 text-[#0F4C5C]">
                If something feels too heavy to carry alone, please reach out to
                someone you trust or seek immediate professional support.
              </p>
              <Link
                href="/crisis-resources"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0F4C5C] px-5 py-2.5 font-semibold text-white transition hover:bg-[#0b3945]"
              >
                Crisis Resources
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <p className="text-sm font-semibold text-gray-500">
            Last updated: June 2026
          </p>
        </div>
      </section>
    </main>
  );
}
