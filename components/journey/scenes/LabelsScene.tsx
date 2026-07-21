"use client";

import { useState } from "react";

const commonLabels = [
  "Strong",
  "Successful",
  "Responsible",
  "Quiet",
  "Sensitive",
  "Independent",
  "Reliable",
  "Leader",
  "Caregiver",
  "Creative",
  "Introvert",
  "Extrovert",
  "Perfectionist",
  "Survivor",
];

export default function LabelsScene() {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [limitingLabel, setLimitingLabel] = useState("");
  const [newIdentity, setNewIdentity] = useState("");

  function toggleLabel(label: string) {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">
      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">
          <div className="mb-6 text-6xl">🏷️</div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Identity Labels
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            The Words That Shape You
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Throughout life we collect labels from ourselves, our
            families and society.
          </p>

          <p className="mt-3 text-gray-600">
            Some empower us. Others quietly become limits we carry
            without questioning.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="mb-5 text-xl font-semibold">
            Which labels describe you today?
          </h2>

          <div className="flex flex-wrap gap-3">
            {commonLabels.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => toggleLabel(label)}
                className={`rounded-full px-5 py-3 transition ${
                  selectedLabels.includes(label)
                    ? "bg-orange-600 text-white"
                    : "border border-gray-300 bg-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <label className="mb-3 block text-lg font-semibold">
            Is there a label that no longer serves you?
          </label>

          <textarea
            rows={4}
            value={limitingLabel}
            onChange={(e) => setLimitingLabel(e.target.value)}
            placeholder="Describe a label you're ready to let go of..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />
        </div>

        <div className="mt-10">
          <label className="mb-3 block text-lg font-semibold">
            How would you rather describe yourself?
          </label>

          <textarea
            rows={4}
            value={newIdentity}
            onChange={(e) => setNewIdentity(e.target.value)}
            placeholder="Describe the identity you're growing into..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />
        </div>

        <div className="mt-12 rounded-2xl border border-orange-100 bg-orange-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-700">
            Genesis Reflection
          </p>

          <p className="mt-3 leading-7 text-gray-700">
            Labels describe experiences—they do not define your worth.
            You have the freedom to choose which identities you carry
            forward.
          </p>
        </div>

      </div>
    </div>
  );
}