"use client";

import { useState } from "react";

const emotions = [
  "Peaceful",
  "Hopeful",
  "Confident",
  "Joyful",
  "Grateful",
  "Loved",
  "Calm",
  "Curious",
  "Excited",
  "Overwhelmed",
  "Anxious",
  "Lonely",
  "Stressed",
  "Frustrated",
  "Sad",
  "Angry",
  "Fearful",
  "Disconnected",
];

export default function EmotionScene() {
  const [selected, setSelected] = useState<string[]>([]);
  const [trigger, setTrigger] = useState("");
  const [regulation, setRegulation] = useState("");

  function toggleEmotion(emotion: string) {
    if (selected.includes(emotion)) {
      setSelected(selected.filter((e) => e !== emotion));
    } else if (selected.length < 5) {
      setSelected([...selected, emotion]);
    }
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">💙</div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Emotional Awareness
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Your Emotional Landscape
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every emotion has something to teach us.
          </p>

          <p className="mt-3 text-gray-600">
            Choose up to five emotions that have been most present in
            your life recently.
          </p>

        </div>

        <div className="mt-10 flex flex-wrap gap-3">

          {emotions.map((emotion) => (
            <button
              key={emotion}
              type="button"
              onClick={() => toggleEmotion(emotion)}
              className={`rounded-full px-5 py-3 transition ${
                selected.includes(emotion)
                  ? "bg-sky-600 text-white"
                  : "border border-gray-300 bg-white"
              }`}
            >
              {emotion}
            </button>
          ))}

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold">
            What situations usually bring out these emotions?
          </label>

          <textarea
            rows={5}
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="Describe any patterns you've noticed..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold">
            When life feels difficult, what usually helps you regain
            balance?
          </label>

          <textarea
            rows={5}
            value={regulation}
            onChange={(e) => setRegulation(e.target.value)}
            placeholder="Prayer, exercise, talking to someone, journaling..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />

        </div>

        <div className="mt-12 rounded-2xl border border-sky-100 bg-sky-50 p-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700">
            Genesis Reflection
          </p>

          <p className="mt-3 leading-7 text-gray-700">
            Emotions aren't problems to solve—they're signals to
            understand. As we continue, Genesis will look for recurring
            emotional patterns alongside your strengths and values.
          </p>

        </div>

      </div>

    </div>
  );
}