"use client";

import { useState } from "react";

const commonRoles = [
  "Parent",
  "Partner",
  "Professional",
  "Leader",
  "Student",
  "Caregiver",
  "Friend",
  "Provider",
  "Sibling",
  "Child",
  "Entrepreneur",
  "Creative",
];

export default function PublicSelfScene() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [customRole, setCustomRole] = useState("");
  const [expectation, setExpectation] = useState("");

  function toggleRole(role: string) {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">
            🎭
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Public Self
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            The Person Others See
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Throughout life we wear many different roles.
          </p>

          <p className="mt-3 text-gray-600">
            None of them are wrong.
            But sometimes we become so busy meeting expectations that
            we forget the person beneath them.
          </p>

        </div>

        <div className="mt-12">

          <h2 className="mb-5 text-xl font-semibold">
            Which roles describe your life today?
          </h2>

          <div className="flex flex-wrap gap-3">

            {commonRoles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={`rounded-full px-5 py-3 transition ${
                  selectedRoles.includes(role)
                    ? "bg-indigo-600 text-white"
                    : "border border-gray-300 bg-white"
                }`}
              >
                {role}
              </button>
            ))}

          </div>

        </div>

        <div className="mt-10">

          <label className="mb-3 block font-semibold">
            Is there another role that's important to you?
          </label>

          <input
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            placeholder="Add another role..."
            className="w-full rounded-2xl border border-gray-300 p-4"
          />

        </div>

        <div className="mt-10">

          <label className="mb-3 block text-lg font-semibold">
            What do people expect from you most often?
          </label>

          <textarea
            rows={5}
            value={expectation}
            onChange={(e) => setExpectation(e.target.value)}
            placeholder="Describe the expectations you carry..."
            className="w-full rounded-2xl border border-gray-300 p-5"
          />

        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-700">
            Genesis Reflection
          </p>

          <p className="mt-3 leading-7 text-gray-700">
            Roles help us contribute to the lives of others, but they
            are only one part of who we are. In the next chapter,
            we'll explore the parts of yourself that exist even when
            nobody else is watching.
          </p>

        </div>

      </div>

    </div>
  );
}