"use client";

import { useState } from "react";

export default function PrivateSelfScene() {
  const [aloneSelf, setAloneSelf] = useState("");
  const [hiddenPart, setHiddenPart] = useState("");
  const [safePerson, setSafePerson] = useState("");

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">
            🌙
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
            Private Self
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            The Person Only You Know
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Some parts of us are visible to the world.
          </p>

          <p className="mt-3 text-gray-600">
            Other parts are quieter—known only to ourselves or to the
            people we trust most.
          </p>

        </div>

        <div className="mt-12 space-y-10">

          <div>

            <label className="mb-3 block text-lg font-semibold text-gray-900">
              Who are you when nobody expects anything from you?
            </label>

            <textarea
              rows={5}
              value={aloneSelf}
              onChange={(e) => setAloneSelf(e.target.value)}
              placeholder="Describe yourself without your roles or responsibilities..."
              className="w-full rounded-2xl border border-gray-300 p-5 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />

          </div>

          <div>

            <label className="mb-3 block text-lg font-semibold text-gray-900">
              Is there a part of yourself that people rarely get to see?
            </label>

            <textarea
              rows={5}
              value={hiddenPart}
              onChange={(e) => setHiddenPart(e.target.value)}
              placeholder="Share only what feels comfortable..."
              className="w-full rounded-2xl border border-gray-300 p-5 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />

          </div>

          <div>

            <label className="mb-3 block text-lg font-semibold text-gray-900">
              With whom do you feel safest being completely yourself?
            </label>

            <input
              value={safePerson}
              onChange={(e) => setSafePerson(e.target.value)}
              placeholder="A person, a group, or even 'myself'..."
              className="w-full rounded-2xl border border-gray-300 p-4 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
            />

          </div>

        </div>

        <div className="mt-12 rounded-2xl border border-violet-100 bg-violet-50 p-6">

          <p className="text-sm font-semibold uppercase tracking-widest text-violet-700">
            Genesis Reflection
          </p>

          <p className="mt-3 leading-7 text-gray-700">
            Your private self is not more "real" than your public self—
            it is simply another important part of who you are.
            Understanding both helps you live with greater authenticity.
          </p>

        </div>

      </div>

    </div>
  );
}