"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Globe2, MapPin, ArrowRight, LifeBuoy, MessageCircle } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { IMAGES } from "@/lib/images";

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "info@mydeeptalk.com",
  },
  {
    icon: Globe2,
    label: "Platform",
    value: "Emotional wellness, self-discovery and therapist support.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Built for Africa, available online.",
  },
];

export default function ContactPage() {
	
	const [form, setForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const [sending, setSending] = useState(false);
const [success, setSuccess] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setSending(true);
  setSuccess(false);
  setError("");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send message.");
    }

    setSuccess(true);

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (err: any) {
    setError(err.message || "Something went wrong.");
  } finally {
    setSending(false);
  }
};
	
  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Contact Us"
        subtitle="Have a question, partnership inquiry, or need support? We’d love to hear from you."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="bg-white px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-2">
          {/* Get in touch */}
          <Reveal variant="left">
            <div className="card-soft h-full p-8 md:p-10">
              <span className="eyebrow">Get in Touch</span>
              <h2 className="mt-4 text-2xl font-bold text-[#0F4C5C]">
                We’re here for you
              </h2>
              <p className="mt-3 leading-7 text-gray-600">
                Reach out about anything — support, partnerships, or just to say
                hello.
              </p>

              <ul className="mt-8 space-y-5">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F4C5C]/8 text-[#0F4C5C]">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wide text-[#E2954E]">
                        {d.label}
                      </p>
                      <p className="mt-1 leading-7 text-gray-600">{d.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

             <form onSubmit={handleSubmit} className="mt-8 space-y-5">

  {/* Full Name */}
  <div>
    <label className="mb-2 block font-semibold text-[#0F4C5C]">
      Full Name
    </label>

    <input
      type="text"
      required
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
      className="w-full rounded-xl border border-gray-300 px-4 py-3"
      placeholder="Your full name"
    />
  </div>

  {/* Email */}
  <div>
    <label className="mb-2 block font-semibold text-[#0F4C5C]">
      Email
    </label>

    <input
      type="email"
      required
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
      className="w-full rounded-xl border border-gray-300 px-4 py-3"
      placeholder="you@example.com"
    />
  </div>

  {/* Subject */}
  <div>
    <label className="mb-2 block font-semibold text-[#0F4C5C]">
      Subject
    </label>

    <input
      type="text"
      required
      value={form.subject}
      onChange={(e) =>
        setForm({ ...form, subject: e.target.value })
      }
      className="w-full rounded-xl border border-gray-300 px-4 py-3"
      placeholder="Subject"
    />
  </div>

  {/* Message */}
  <div>
    <label className="mb-2 block font-semibold text-[#0F4C5C]">
      Message
    </label>

    <textarea
      rows={5}
      required
      value={form.message}
      onChange={(e) =>
        setForm({ ...form, message: e.target.value })
      }
      className="w-full rounded-xl border border-gray-300 px-4 py-3"
      placeholder="How can we help?"
    />
  </div>

  {error && (
    <p className="text-red-600">{error}</p>
  )}

  {success && (
    <p className="text-green-600">
      Thank you! We've received your message.
    </p>
  )}

  <button
    type="submit"
    disabled={sending}
    className="w-full rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white hover:bg-[#0b3945]"
  >
    {sending ? "Sending..." : "Send Message"}
  </button>

</form>
            </div>
          </Reveal>

          {/* Image + support */}
          <Reveal variant="right" delay={120} className="flex flex-col gap-8">
            <div className="img-zoom photo-wash relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={IMAGES.contact}
                alt="A warm, supportive conversation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="card-soft p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E2954E]/12 text-[#E2954E]">
                <MessageCircle className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-[#0F4C5C]">
                Need support?
              </h2>
              <p className="mt-3 leading-7 text-gray-600">
                Create an account and begin your self-discovery journey, or
                connect with a verified therapist whenever you’re ready.
              </p>
              <Link
                href="/signup"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#E2954E] px-6 py-3 font-semibold text-white transition hover:bg-[#d07f34]"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Crisis note */}
        <Reveal className="mx-auto mt-8 max-w-6xl">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#E2954E]/30 bg-[#E2954E]/8 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E2954E]/20 text-[#b9701f]">
                <LifeBuoy className="h-5 w-5" />
              </span>
              <p className="leading-7 text-gray-700">
                In emotional distress or crisis? You don’t have to wait — help is
                available right now.
              </p>
            </div>
            <Link
              href="/crisis-resources"
              className="shrink-0 rounded-full border border-[#0F4C5C]/30 px-5 py-2.5 font-semibold text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
            >
              Crisis Resources
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
