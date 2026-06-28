import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  Stethoscope,
  Brain,
  ShieldCheck,
  Plus,
  ArrowRight,
} from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const groups = [
  {
    icon: HeartHandshake,
    title: "For Clients",
    items: [
      {
        q: "How do I book a therapist?",
        a: "Browse therapist profiles, choose an available time, and proceed with booking and payment.",
      },
      {
        q: "Are sessions confidential?",
        a: "Therapists are expected to maintain professional confidentiality in accordance with applicable standards.",
      },
      {
        q: "Can I change therapists?",
        a: "Yes. You are free to book with another therapist at any time.",
      },
    ],
  },
  {
    icon: Stethoscope,
    title: "For Therapists",
    items: [
      {
        q: "How do I become verified?",
        a: "Complete your profile and upload the required credentials for review.",
      },
      {
        q: "How do I set availability?",
        a: "Use the availability page to choose the days and hours you are available.",
      },
      {
        q: "Can I update my profile later?",
        a: "Yes. Therapist profiles can be updated anytime.",
      },
    ],
  },
  {
    icon: Brain,
    title: "DeepTalk AI",
    items: [
      {
        q: "Is DeepTalk AI a therapist?",
        a: "No. DeepTalk AI is a self-reflection tool and does not replace professional care.",
      },
      {
        q: "Can DeepTalk AI diagnose conditions?",
        a: "No. It provides reflective support and emotional awareness only.",
      },
      {
        q: "Is my journal private?",
        a: "Journal entries are private and associated with your account.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    items: [
      {
        q: "Who can see my information?",
        a: "Your information is protected and used only to provide services and improve the platform.",
      },
      {
        q: "Is MyDeepTalk an emergency service?",
        a: "No. If you are experiencing an emergency, please contact local emergency services immediately.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Answers about how MyDeepTalk works — for clients, therapists, and your privacy."
        crumbs={[{ label: "FAQ" }]}
      />

      <section className="bg-white px-6 py-24 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr]">
          {/* Sticky intro + image */}
          <Reveal variant="left" className="lg:sticky lg:top-24 lg:self-start">
            <span className="eyebrow">Got Questions?</span>
            <h2 className="mt-4 text-3xl font-bold text-[#0F4C5C]">
              Everything you need to know
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Can’t find what you’re looking for? Our team is one message away.
            </p>
            <div className="img-zoom photo-wash relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-xl lg:block">
              <Image
                src={IMAGES.peace}
                alt="A calm, reassuring moment"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white transition hover:bg-[#0b3945]"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>

          {/* Accordion groups */}
          <div className="space-y-10">
            {groups.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 80}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E]">
                      <group.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold text-[#0F4C5C]">
                      {group.title}
                    </h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <details
                        key={item.q}
                        className="card-soft group/item overflow-hidden p-0 [&[open]_.faq-icon]:rotate-45"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-[#0F4C5C] marker:hidden">
                          {item.q}
                          <span className="faq-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F4C5C]/8 text-[#0F4C5C] transition-transform duration-300">
                            <Plus className="h-4 w-4" />
                          </span>
                        </summary>
                        <p className="px-5 pb-5 leading-7 text-gray-600">
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
