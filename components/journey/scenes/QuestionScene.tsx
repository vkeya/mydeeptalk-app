"use client";

import { useState } from "react";
import { JourneyScene } from "@/types/journey";

interface QuestionSceneProps {
  scene: JourneyScene;
}

export default function QuestionScene({
  scene,
}: QuestionSceneProps) {
  const [descriptors, setDescriptors] = useState(["", "", ""]);
  const [coreDescriptor, setCoreDescriptor] = useState("");
  const [identityDoubt, setIdentityDoubt] = useState("");

  const updateDescriptor = (index: number, value: string) => {
    const updated = [...descriptors];
    updated[index] = value;
    setDescriptors(updated);
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">
            🪞
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Identity
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            {scene.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Forget your job.
            Forget your responsibilities.
            Forget what others expect of you.
          </p>

          <p className="mt-4 text-gray-600">
            Imagine someone meeting you for the very first time.
          </p>

        </div>

        <div className="mt-12">

          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            What three words would you hope they use to describe you?
          </h2>

          <div className="space-y-4">

            {descriptors.map((value, index) => (
              <input
                key={index}
                value={value}
                onChange={(e) =>
                  updateDescriptor(index, e.target.value)
                }
                placeholder={`Word ${index + 1}`}
                className="w-full rounded-2xl border border-gray-300 p-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            ))}

          </div>

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold text-gray-900">
            Which word feels most true today?
          </label>

          <select
            value={coreDescriptor}
            onChange={(e) => setCoreDescriptor(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 p-4"
          >
            <option value="">Choose one...</option>

            {descriptors
              .filter(Boolean)
              .map((word) => (
                <option key={word} value={word}>
                  {word}
                </option>
              ))}
          </select>

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold text-gray-900">
            Which word is hardest to believe about yourself?
          </label>

          <select
            value={identityDoubt}
            onChange={(e) => setIdentityDoubt(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 p-4"
          >
            <option value="">Choose one...</option>

            {descriptors
              .filter(Boolean)
              .map((word) => (
                <option key={word} value={word}>
                  {word}
                </option>
              ))}
          </select>

        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-700">
            Genesis Insight
          </p>

          <p className="mt-3 text-gray-700 leading-7">
            The way you describe yourself is often the first clue to the
            story you've been telling yourself. Throughout this journey,
            we'll gently explore which parts of that story feel authentic
            and which parts may deserve a second look.
          </p>

        </div>

      </div>

    </div>
  );
}