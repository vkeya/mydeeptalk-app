"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

type JournalEntry = {
  mood?: string;
  area?: string;
  prompt?: string;
  content?: string;
  createdAt?: any;
};

export default function JournalEntryPage() {
  const params = useParams();
  const id = params.id as string;

  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [reflecting, setReflecting] = useState(false);
  const [reflection, setReflection] = useState("");
  const [crisisMessage, setCrisisMessage] = useState("");

  useEffect(() => {
    loadEntry();
  }, []);

  async function loadEntry() {
    try {
      const snapshot = await getDoc(doc(db, "journalEntries", id));

      if (snapshot.exists()) {
        setEntry(snapshot.data() as JournalEntry);
      }
    } catch (error) {
      console.error("Error loading journal entry:", error);
    } finally {
      setLoading(false);
    }
  }

  async function reflectWithAI() {
    if (!entry?.content) return;

    setReflecting(true);
    setReflection("");
    setCrisisMessage("");

    try {
      const response = await fetch("/api/deeptalk-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: entry.content,
        }),
      });

      const data = await response.json();

      if (data.crisis) {
        setCrisisMessage(data.message);
      } else {
        setReflection(data.reflection);
      }
    } catch (error) {
      console.error("DeepTalk AI error:", error);
      alert("Could not generate reflection.");
    } finally {
      setReflecting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-8">
        <p>Loading entry...</p>
      </main>
    );
  }

  if (!entry) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-8">
        <p>Journal entry not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/journal"
          className="mb-8 inline-block rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white hover:bg-[#0b3945]"
        >
          Back to Journal
        </Link>

        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-full bg-[#F7F3EC] px-5 py-2 font-semibold text-[#0F4C5C]">
              {entry.mood}
            </div>

            {entry.area && (
              <div className="rounded-full bg-[#E2954E]/20 px-5 py-2 font-semibold text-[#0F4C5C]">
                {entry.area}
              </div>
            )}
          </div>

          <h1 className="mt-8 text-3xl font-bold text-[#0F4C5C]">
            Reflection Prompt
          </h1>

          <p className="mt-4 text-xl text-gray-700">{entry.prompt}</p>

          <h2 className="mt-10 text-3xl font-bold text-[#0F4C5C]">
            My Reflection
          </h2>

          <p className="mt-5 whitespace-pre-line leading-8 text-gray-700">
            {entry.content}
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#2C7A7B]">
            DeepTalk AI Companion
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">
            Reflect With DeepTalk AI
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            DeepTalk AI helps you notice patterns, reflect more deeply, and
            prepare for healthier conversations. It does not replace therapy.
          </p>

          <button
            onClick={reflectWithAI}
            disabled={reflecting}
            className="mt-8 rounded-full bg-[#0F4C5C] px-8 py-4 font-semibold text-white hover:bg-[#0b3945] disabled:opacity-60"
          >
            {reflecting ? "Reflecting..." : "Generate AI Reflection"}
          </button>

          {crisisMessage && (
            <div className="mt-8 rounded-2xl bg-red-50 p-6 text-red-800">
              <p className="leading-8">{crisisMessage}</p>
            </div>
          )}

          {reflection && (
            <div className="mt-8 rounded-2xl bg-[#F7F3EC] p-6">
              <div className="prose max-w-none whitespace-pre-line leading-8 text-gray-700">
                {reflection}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[#0F4C5C]">Important</h3>

          <p className="mt-5 leading-8 text-gray-600">
            DeepTalk AI is designed for reflection and self-awareness. It does
            not diagnose conditions, replace therapy, or provide emergency
            support.
          </p>
        </div>
      </div>
    </main>
  );
}