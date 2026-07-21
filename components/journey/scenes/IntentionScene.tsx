"use client";

import { useState } from "react";

export default function IntentionScene() {
  const [reason, setReason] = useState("");
  const [hope, setHope] = useState("");

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col justify-center px-6 py-12">

      <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-10 shadow-sm">

        <div className="text-center">

          <div className="mb-6 text-6xl">
            🧭
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Project Genesis
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            Your Intention
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every meaningful journey begins with a reason.
          </p>

          <p className="mt-4 text-gray-600 leading-7">
            Some people come searching for clarity.
            Others come to heal.
            Others simply want to understand themselves better.
          </p>

          <p className="mt-4 font-medium text-gray-800">
            There is no wrong reason.
          </p>

        </div>

        <div className="mt-12 space-y-10">

          <div>

            <label className="mb-3 block text-lg font-semibold text-gray-900">
              What brought you here today?
            </label>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Share whatever feels true for you..."
              className="w-full rounded-2xl border border-gray-300 p-5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

          </div>

          <div>

            <label className="mb-3 block text-lg font-semibold text-gray-900">
              What do you hope to discover?
            </label>

            <textarea
              rows={5}
              value={hope}
              onChange={(e) => setHope(e.target.value)}
              placeholder="Describe the future you're hoping for..."
              className="w-full rounded-2xl border border-gray-300 p-5 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

          </div>

        </div>

        <div className="mt-12 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <p className="text-sm uppercase tracking-widest text-indigo-700 font-semibold">
            Genesis Note
          </p>

          <p className="mt-3 text-gray-700 leading-7">
            Your answers become the foundation of your Genesis Journey.
            As you continue, Genesis will connect patterns, reflect on your
            progress, and help you understand yourself more deeply.
          </p>

        </div>

      </div>

    </div>
  );
}