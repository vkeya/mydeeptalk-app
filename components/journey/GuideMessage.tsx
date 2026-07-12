"use client";

import useGuide from "@/hooks/useGuide";

const guideMessages = {
  sage: [
    "Growth begins the moment we become curious instead of judgmental.",
    "You don't have to rush healing. Understanding comes one step at a time.",
    "Every honest answer reveals another part of yourself.",
  ],

  lumina: [
    "I'm proud you came back today. Every visit matters.",
    "Celebrate every small step. Progress is still progress.",
    "You've already grown more than you realize.",
  ],

  atlas: [
    "Let's keep moving. Small actions create lasting change.",
    "Consistency is stronger than motivation.",
    "Today's reflection becomes tomorrow's wisdom.",
  ],

  echo: [
    "Welcome back. This is a safe place to be yourself.",
    "You don't have to carry everything alone.",
    "Let's slow down together.",
  ],
};

export default function GuideMessage() {
  const guide = useGuide();

  const key = guide.id as keyof typeof guideMessages;

  const messages = guideMessages[key];

  const message = messages[0];
   

  return (
    <section className="rounded-3xl bg-gradient-to-r from-[#FFF8EF] to-white border border-[#E8D7BF] p-8 shadow-sm">

      <div className="flex items-start gap-6">

        <div className="text-6xl">
          {guide.emoji}
        </div>

        <div>

          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-[#8A6E4B]">
            Today's Message
          </p>

          <h2 className="mb-4 font-serif text-3xl font-bold text-[#1C2434]">
            {guide.name} says...
          </h2>

          <p className="text-xl leading-9 text-gray-700 italic">
            "{message}"
          </p>

        </div>

      </div>

    </section>
  );
}