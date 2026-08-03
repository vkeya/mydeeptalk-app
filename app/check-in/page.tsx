"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkInService } from "@/lib/checkin/CheckInService";
import { auth } from "@/lib/firebase";
import type { CheckIn } from "@/types/checkIn";

type Mood = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

const emotions = [
  "Happy",
  "Hopeful",
  "Grateful",
  "Peaceful",
  "Excited",
  "Calm",
  "Anxious",
  "Overwhelmed",
  "Sad",
  "Lonely",
  "Frustrated",
  "Angry",
  "Confused",
  "Exhausted",
  "Fearful",
  "Stressed",
];

const moods: Mood[] = [
  {
    id: "great",
    emoji: "😊",
    title: "Great",
    description: "Feeling energized and positive today.",
  },
  {
    id: "good",
    emoji: "🙂",
    title: "Good",
    description: "Things are going fairly well.",
  },
  {
    id: "okay",
    emoji: "😐",
    title: "Okay",
    description: "Neither good nor bad today.",
  },
  {
    id: "low",
    emoji: "😔",
    title: "Low",
    description: "Today feels a little difficult.",
  },
  {
    id: "struggling",
    emoji: "😢",
    title: "Struggling",
    description: "I'm finding today really hard.",
  },
];

export default function CheckInPage() {
  const router = useRouter();
  

  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [reflection, setReflection] = useState("");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  
  
  function toggleEmotion(emotion: string) {
  setSelectedEmotions((previous) =>
    previous.includes(emotion)
      ? previous.filter((e) => e !== emotion)
      : [...previous, emotion]
  );
}

function handleContinue() {
  if (step === 1) {
    if (!selectedMood) return;
    setStep(2);
    return;
  }

  if (step === 2) {
    setStep(3);
    return;
  }

  if (step === 3) {
    setStep(4);
    return;
  }

  console.log({
    mood: selectedMood,
    emotions: selectedEmotions,
    reflection,
  });

  // Save later
}



  return (
  <main className="min-h-screen bg-slate-50">
    <div className="mx-auto max-w-4xl px-6 py-10">

      <button
        onClick={() => router.push("/dashboard")}
        className="mb-8 text-sm font-medium text-[#0F4C5C] transition hover:text-[#2C7A7B]"
      >
        ← Back to Dashboard
      </button>

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2C7A7B]">
          Daily Reflection
        </p>

        <h1 className="mt-2 text-5xl font-bold text-slate-900">
          Daily Check-In
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Take a quiet moment to notice how you're feeling today.
          There are no right or wrong answers—just an opportunity
          to check in with yourself.
        </p>
      </div>

      {/* STEP 1 */}

      {step === 1 && (
        <>
          <div className="space-y-5">

            {moods.map((option) => {

              const selected = selectedMood?.id === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedMood(option)}
                  className={`w-full rounded-3xl border p-6 text-left transition-all duration-200

                  ${
                    selected
                      ? "border-[#2C7A7B] bg-[#EAF7F6] shadow-lg"
                      : "border-slate-200 bg-white hover:border-[#2C7A7B] hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-5">

                    <div className="text-4xl">
                      {option.emoji}
                    </div>

                    <div className="flex-1">

                      <div className="flex items-center justify-between">

                        <h3 className="text-2xl font-semibold text-slate-900">
                          {option.title}
                        </h3>

                        {selected && (
                          <div className="rounded-full bg-[#0F4C5C] px-3 py-1 text-xs font-semibold text-white">
                            Selected
                          </div>
                        )}

                      </div>

                      <p className="mt-2 text-slate-600">
                        {option.description}
                      </p>

                    </div>

                  </div>

                </button>
              );
            })}

          </div>

          <div className="mt-10 flex justify-end">

            <button
              disabled={!selectedMood}
              onClick={handleContinue}
              className="rounded-full bg-[#0F4C5C] px-10 py-4 font-semibold text-white shadow-lg transition hover:bg-[#2C7A7B] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue →
            </button>

          </div>
        </>
      )}
	  
	  {step === 2 && (
  <>
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-900">
        What emotions are you experiencing?
      </h2>

      <p className="mt-3 text-slate-600">
        Choose as many as feel true for you today.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {emotions.map((emotion) => {
        const selected = selectedEmotions.includes(emotion);

        return (
          <button
            key={emotion}
            onClick={() => toggleEmotion(emotion)}
            className={`rounded-2xl border px-4 py-4 font-medium transition

            ${
              selected
                ? "border-[#2C7A7B] bg-[#EAF7F6] text-[#0F4C5C]"
                : "border-slate-200 bg-white hover:border-[#2C7A7B]"
            }`}
          >
            {emotion}
          </button>
        );
      })}
    </div>

    <div className="mt-10 flex justify-between">
      <button
        onClick={() => setStep(1)}
        className="rounded-full border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100"
      >
        Back
      </button>

      <button
        onClick={handleContinue}
        className="rounded-full bg-[#0F4C5C] px-10 py-4 font-semibold text-white hover:bg-[#2C7A7B]"
      >
        Continue →
      </button>
    </div>
  </>
)}

{step === 3 && (
  <>
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-slate-900">
        Tell us a little more
      </h2>

      <p className="mt-3 text-slate-600">
        What's been on your mind today?
      </p>
    </div>

    <textarea
      value={reflection}
      onChange={(e) => setReflection(e.target.value)}
      rows={8}
      placeholder="Write anything you'd like to reflect on..."
      className="w-full rounded-3xl border border-slate-300 bg-white p-6 outline-none transition focus:border-[#2C7A7B]"
    />

    <div className="mt-10 flex justify-between">
      <button
        onClick={() => setStep(2)}
        className="rounded-full border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100"
      >
        Back
      </button>

      <button
        onClick={handleContinue}
        className="rounded-full bg-[#0F4C5C] px-10 py-4 font-semibold text-white hover:bg-[#2C7A7B]"
      >
        Continue →
      </button>
    </div>
  </>
)}

{step === 4 && (
  <>
    <div className="rounded-3xl bg-white p-10 shadow-lg">

      <h2 className="text-3xl font-bold text-slate-900">
        Thank you for checking in 💙
      </h2>

      <p className="mt-4 text-slate-600">
        Every moment of self-awareness is a step toward healing.
      </p>

      <div className="mt-8 space-y-6">

        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">
            Today's Mood
          </p>

          <p className="mt-2 text-xl font-semibold">
            {selectedMood?.emoji} {selectedMood?.title}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">
            Emotions
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {selectedEmotions.map((emotion) => (
              <span
                key={emotion}
                className="rounded-full bg-[#EAF7F6] px-4 py-2 text-sm text-[#0F4C5C]"
              >
                {emotion}
              </span>
            ))}
          </div>
        </div>

        {reflection && (
          <div>
            <p className="text-sm font-semibold uppercase text-slate-500">
              Reflection
            </p>

            <p className="mt-3 rounded-2xl bg-slate-50 p-5 leading-7 text-slate-700">
              {reflection}
            </p>
          </div>
        )}

      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={() => setStep(3)}
          className="rounded-full border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100"
        >
          Back
        </button>

       <button
  onClick={async () => {
    const user = auth.currentUser;

    if (!user || !selectedMood) {
      return;
    }

    const checkIn: CheckIn = {
      userId: user.uid,
      mood: selectedMood.title,
      emotions: selectedEmotions,
      reflection,
      currentNeed: "",
    };

    try {
      await checkInService.createCheckIn(checkIn);

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save check-in:", error);
    }
  }}
  className="rounded-full bg-[#0F4C5C] px-10 py-4 font-semibold text-white hover:bg-[#2C7A7B]"
>
  Complete Check-In
</button>
      </div>

    </div>
  </>
)}

      {/* STEP 2 */}
      {/* Keep your existing Step 2 UI */}

      {/* STEP 3 */}
      {/* Keep your existing Step 3 UI */}

      {/* STEP 4 */}
      {/* Keep your existing Step 4 UI */}

    </div>
  </main>
);
}