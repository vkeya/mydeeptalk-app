"use client";

import useGuide from "@/hooks/useGuide";

interface GuideReflectionProps {
  emotion: string;
  reflection: string;
  onContinue: () => void;
}

const responses = {
  sage: {
    peaceful:
      "Peace often reveals what noise has been hiding. Stay present with it today.",
    hopeful:
      "Hope grows when we keep showing up, even in uncertainty.",
    okay:
      "There is wisdom in simply being honest about where you are today.",
    overwhelmed:
      "You don't have to untangle everything today. One gentle step is enough.",
    struggling:
      "Thank you for being honest. Sometimes acknowledging our pain is the bravest thing we can do.",
  },

  lumina: {
    peaceful:
      "Celebrate this moment. You deserve to experience peace without guilt.",
    hopeful:
      "Your hope is evidence that something inside you still believes in tomorrow.",
    okay:
      "Ordinary days matter too. Growth often happens quietly.",
    overwhelmed:
      "You're carrying a lot. Remember—you don't have to carry it alone.",
    struggling:
      "Even on difficult days, you're still moving forward by showing up.",
  },

  atlas: {
    peaceful:
      "Let's protect this peace by making one intentional choice today.",
    hopeful:
      "Take one practical step while hope is alive.",
    okay:
      "Small consistent actions build lasting change.",
    overwhelmed:
      "Choose one thing. Complete it. Then breathe.",
    struggling:
      "Progress today may simply mean being kind to yourself.",
  },

  echo: {
    peaceful:
      "Stay with this feeling for a little longer. You deserve it.",
    hopeful:
      "Hope whispers before it speaks loudly.",
    okay:
      "Thank you for arriving exactly as you are.",
    overwhelmed:
      "There is no pressure here. We can move gently.",
    struggling:
      "You are safe here. Let's take today one breath at a time.",
  },
};

export default function GuideReflection({
  emotion,
  reflection,
  onContinue,
}: GuideReflectionProps) {
  const guide = useGuide();

  const key = guide.id as keyof typeof responses;
  const emotionKey =
    emotion.toLowerCase() as keyof typeof responses.sage;

  const message =
    responses[key][emotionKey] ??
    "Thank you for sharing honestly today.";

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center gap-5">

        <div className="text-6xl">
          {guide.emoji}
        </div>

        <div>

          <p className="uppercase tracking-[0.35em] text-[#8A6E4B] text-sm">
            {guide.name}
          </p>

          <h2 className="font-serif text-4xl font-bold text-[#1C2434]">
            Thank you for sharing.
          </h2>

        </div>

      </div>

      <blockquote className="rounded-2xl bg-[#F7F3EC] p-8 italic text-xl leading-9 text-gray-700">
        "{message}"
      </blockquote>

      <div className="mt-8 rounded-2xl border border-[#E8D7BF] bg-[#FFFDF8] p-6">

        <p className="text-sm uppercase tracking-[0.3em] text-[#8A6E4B]">
          Your Reflection
        </p>

        <p className="mt-3 leading-8 text-gray-700">
          {reflection}
        </p>

      </div>

      <div className="mt-10 flex justify-end">

        <button
          onClick={onContinue}
          className="rounded-full bg-[#8A6E4B] px-10 py-4 font-semibold text-white transition hover:bg-[#73593C]"
        >
          Continue Your Journey →
        </button>

      </div>

    </section>
  );
}