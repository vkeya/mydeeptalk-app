"use client";

import { useState } from "react";

import { DiscoveryEngine } from "@/lib/genesis/discovery/discoveryEngine";
import { MemoryEngine } from "@/lib/genesis/memory/memoryEngine";
import { buildReflection } from "@/lib/genesis/reflection/reflectionBuilder";

export default function GenesisLabPage() {
  const [response, setResponse] = useState("");

  const [discoveries, setDiscoveries] = useState<any>(null);
  const [memory, setMemory] = useState<any>(null);
  const [reflection, setReflection] = useState<any>(null);

  const processResponse = () => {
    const discoveryEngine = new DiscoveryEngine();
    const memoryEngine = new MemoryEngine();

    const memory = memoryEngine.createMemory();

    const result = discoveryEngine.extractDiscoveries({
      experienceId: "meeting-yourself",
      sceneId: "identity",
      response,
    });

    const updatedMemory = memoryEngine.applyDiscoveries(
      memory,
      result.discoveries
    );

    const reflection = buildReflection(updatedMemory);

    setDiscoveries(result);
    setMemory(updatedMemory);
    setReflection(reflection);
  };

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-10">
      <h1 className="text-3xl font-bold">
        Project Genesis Lab
      </h1>

      <div className="space-y-4 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">
          Test Response
        </h2>

        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className="h-40 w-full rounded-xl border p-4"
          placeholder="Type a response..."
        />

        <button
          onClick={processResponse}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          Process Response
        </button>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <h3 className="mb-4 text-lg font-semibold">
            Discoveries
          </h3>

          <pre className="overflow-auto text-sm">
            {JSON.stringify(discoveries, null, 2)}
          </pre>
        </div>

        <div className="rounded-2xl border p-4">
          <h3 className="mb-4 text-lg font-semibold">
            Memory
          </h3>

          <pre className="overflow-auto text-sm">
            {JSON.stringify(memory, null, 2)}
          </pre>
        </div>

        <div className="rounded-2xl border p-4">
          <h3 className="mb-4 text-lg font-semibold">
            Reflection
          </h3>

          <pre className="overflow-auto text-sm">
            {JSON.stringify(reflection, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}