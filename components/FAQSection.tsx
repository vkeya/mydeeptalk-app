"use client";

import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "Is MyDeepTalk therapy?",
      answer:
        "No. MyDeepTalk is a preventive emotional wellness platform. Licensed therapists independently provide therapy services."
    },
    {
      question: "How do I book a therapist?",
      answer:
        "Browse therapists, choose one that fits your needs, and book a session directly from their profile."
    },
    {
      question: "Is my information private?",
      answer:
        "Yes. We are committed to protecting your privacy and confidentiality."
    },
    {
      question: "Can therapists join MyDeepTalk?",
      answer:
        "Yes. Therapists can create profiles, upload credentials and become verified."
    }
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white px-8 py-20">
      <div className="mx-auto max-w-5xl">

        <div className="text-center">
          <p className="font-semibold text-[#E2954E]">
            Frequently Asked Questions
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
            Questions We Often Receive
          </h2>
        </div>

        <div className="mt-12 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-3xl bg-[#F7F3EC] p-6 shadow"
            >
              <button
                className="flex w-full items-center justify-between text-left"
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
              >
                <h3 className="text-xl font-bold text-[#0F4C5C]">
                  {faq.question}
                </h3>

                <span className="text-2xl">
                  {open === index ? "-" : "+"}
                </span>
              </button>

              {open === index && (
                <p className="mt-5 leading-8 text-gray-600">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}