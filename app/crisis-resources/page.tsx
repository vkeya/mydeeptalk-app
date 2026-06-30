import Link from "next/link";
import Image from "next/image";
import {
  Siren,
  Users,
  Stethoscope,
  HeartHandshake,
  Phone,
  ArrowRight,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const trustedPeople = [
  "A trusted friend",
  "A family member",
  "A spiritual leader",
  "A counselor or therapist",
  "Your doctor or healthcare provider",
];

export default function CrisisResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Crisis Resources"
        subtitle="If something feels too heavy to carry alone, support is available. You matter, and reaching out is a sign of strength."
        crumbs={[{ label: "Crisis Resources" }]}
      />

      <section className="bg-white px-6 py-24 md:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Emergency — prominent */}
          <Reveal>
            <div className="relative overflow-hidden rounded-xl bg-[#C0392B] p-8 text-white md:p-10">
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                    <Siren className="h-7 w-7 text-white" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      In an emergency
                    </h2>
                    <p className="mt-2 max-w-xl leading-7 text-white/90">
                      If you believe you are in immediate danger or experiencing
                      a crisis, please call your local emergency services or go
                      to the nearest hospital immediately.
                    </p>
                  </div>
                </div>
                <a
                  href="tel:999"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#C0392B] transition hover:bg-white/90"
                >
                  <Phone className="h-5 w-5" /> Call for help
                </a>
              </div>
            </div>
          </Reveal>

          {/* Supportive cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={80}>
              <div className="card-soft h-full p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E]">
                  <Users className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                  Reach out to someone you trust
                </h2>
                <p className="mt-3 leading-7 text-gray-600">
                  You do not have to face difficult moments alone.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {trustedPeople.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-gray-700">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E2954E]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160} className="flex flex-col gap-6">
              <div className="card-soft p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F4C5C]/8 text-[#0F4C5C]">
                  <Stethoscope className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                  Professional support
                </h2>
                <p className="mt-3 leading-7 text-gray-600">
                  Licensed therapists available through MyDeepTalk may provide
                  support, but they are not emergency responders and may not be
                  immediately available.
                </p>
              </div>

              <div className="card-soft p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2C7A7B]/12 text-[#2C7A7B]">
                  <HeartHandshake className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-[#0F4C5C]">
                  Healing begins with connection
                </h2>
                <p className="mt-3 leading-7 text-gray-600">
                  Asking for help is not weakness. Reaching out can be the first
                  step toward healing, hope, and recovery.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Reassurance — image + message */}
          <Reveal delay={80}>
            <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C]">
              <div className="grid items-center gap-0 md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    Remember
                  </h2>
                  <p className="mt-4 leading-8 text-white/90">
                    You deserve support. You matter. There are people who care
                    and professionals who want to help.
                  </p>
                  <Link
                    href="/therapists"
                    className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#E2954E] px-6 py-3 font-semibold text-white transition hover:bg-[#d07f34]"
                  >
                    Find a Therapist
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="relative hidden min-h-[280px] md:block">
                  <Image
                    src={IMAGES.crisis}
                    alt="Reassuring, supportive connection"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </div>
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
