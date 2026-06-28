import Link from "next/link";
import {
  UserCog,
  CalendarCheck,
  Stethoscope,
  Brain,
  Mail,
  ArrowRight,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const topics = [
  {
    icon: UserCog,
    title: "Account Support",
    items: [
      "Email verification",
      "Password reset",
      "Updating profile information",
      "Account access problems",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Booking Support",
    items: [
      "Scheduling sessions",
      "Rescheduling appointments",
      "Payment questions",
      "Meeting links",
    ],
  },
  {
    icon: Stethoscope,
    title: "Therapist Support",
    items: [
      "Profile approval",
      "Credential verification",
      "Availability setup",
      "Managing sessions",
    ],
  },
  {
    icon: Brain,
    title: "DeepTalk AI",
    items: [
      "Journal reflections",
      "Emotional check-ins",
      "Self-discovery tools",
      "Privacy and safety",
    ],
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Help Center"
        subtitle="We’re here to help. Find answers to common questions and ways to contact the MyDeepTalk team."
        crumbs={[{ label: "Help" }]}
      />

      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {topics.map((topic, i) => (
            <Reveal key={topic.title} delay={(i % 2) * 100}>
              <div className="card-soft group h-full p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F4C5C]/8 text-[#0F4C5C] transition group-hover:scale-110">
                    <topic.icon className="h-6 w-6" />
                  </span>
                  <h2 className="text-xl font-bold text-[#0F4C5C]">
                    {topic.title}
                  </h2>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {topic.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E2954E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Need more help */}
        <Reveal className="mx-auto mt-6 max-w-6xl">
          <div className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-8 md:p-12">
            <div className="animate-blob pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Need more help?
                  </h2>
                  <p className="mt-2 text-white/85">
                    Contact the MyDeepTalk team and we’ll be happy to assist you.
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    info@mydeeptalk.com
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E2954E] px-6 py-3 font-semibold text-white transition hover:bg-[#d07f34]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
