"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Link from "next/link";

type JournalEntry = {
  id: string;
  mood?: string;
  prompt?: string;
  content?: string;
  createdAt?: any;
};

const moods = [
  { label: "Great", emoji: "😊" },
  { label: "Good", emoji: "🙂" },
  { label: "Neutral", emoji: "😐" },
  { label: "Low", emoji: "😔" },
  { label: "Struggling", emoji: "😢" },
];

const prompts = [
  "What emotion have you been carrying quietly?",
  "What do you need more of today?",
  "What felt heavy this week?",
  "What is one thing you are grateful for right now?",
  "What boundary do you need to protect?",
  "What truth have you been avoiding?",
  "What would kindness toward yourself look like today?",
];

export default function JournalPage() {
  const [mood, setMood] = useState("");
  const [prompt, setPrompt] = useState(prompts[0]);
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "journalEntries"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as JournalEntry[];

      setEntries(data);
    } catch (error) {
      console.error("Error loading journal entries:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveEntry(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login to save your journal entry.");
      return;
    }

    if (!mood) {
      alert("Please select your mood.");
      return;
    }

    if (!content.trim()) {
      alert("Please write something before saving.");
      return;
    }

    setSaving(true);

    try {
      await addDoc(collection(db, "journalEntries"), {
        userId: user.uid,
        userEmail: user.email,
        mood,
        prompt,
        content,
        createdAt: serverTimestamp(),
      });

      setContent("");
      setMood("");
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

      await loadEntries();

      alert("Journal entry saved.");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      alert("Could not save journal entry.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#2C7A7B]">
              MyDeepTalk Journal
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#0F4C5C]">
              Check in with yourself
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600">
              A private space to notice your mood, reflect honestly, and track
              what you are carrying emotionally.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              How are you feeling today?
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {moods.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setMood(`${item.emoji} ${item.label}`)}
                  className={`rounded-2xl border p-4 text-center transition ${
                    mood === `${item.emoji} ${item.label}`
                      ? "border-[#0F4C5C] bg-[#F7F3EC]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="mt-2 text-sm font-medium text-gray-700">
                    {item.label}
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={saveEntry} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Reflection Prompt
                </label>

                <select
                  className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                >
                  {prompts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Your Reflection
                </label>

                <textarea
                  rows={8}
                  className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500 focus:border-[#0F4C5C] focus:outline-none"
                  placeholder="Write freely. This is your private space..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945]"
              >
                {saving ? "Saving..." : "Save Journal Entry"}
              </button>
            </form>
          </section>

          <section className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              Recent Entries
            </h2>

            {loading ? (
              <p className="mt-5 text-gray-600">Loading entries...</p>
            ) : entries.length === 0 ? (
              <p className="mt-5 text-gray-600">
                No journal entries yet. Your reflections will appear here.
              </p>
            ) : (
              <div className="mt-6 space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-2xl bg-[#F7F3EC] p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-[#0F4C5C]">
                        {entry.mood}
                      </p>

                      <p className="text-sm text-gray-500">
                        {entry.createdAt?.toDate
                          ? entry.createdAt.toDate().toLocaleString()
                          : ""}
                      </p>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-gray-600">
                      {entry.prompt}
                    </p>

                    <p className="mt-3 whitespace-pre-line text-gray-700">
                      {entry.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}