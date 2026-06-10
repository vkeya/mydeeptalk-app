"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,

  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Link from "next/link";

type JournalEntry = {
  id: string;
  mood?: string;
  area?: string;
  prompt?: string;
  content?: string;
  createdAt?: any;
};

const moods = [
  { label: "Peaceful", emoji: "😊" },
  { label: "Hopeful", emoji: "🙂" },
  { label: "Neutral", emoji: "😐" },
  { label: "Sad", emoji: "😔" },
  { label: "Anxious", emoji: "😟" },
  { label: "Exhausted", emoji: "😴" },
  { label: "Lonely", emoji: "😞" },
];

const areas = [
  "Relationships",
  "Parenting",
  "Trauma & Healing",
  "Mental & Emotional Wellness",
  "Addiction & Recovery",
  "Self-Discovery & Purpose",
  "Men's Wellness",
  "Women's Wellness",
  "Faith & Spiritual Wellness",
  "Life Challenges & Transitions",
];

const prompts = [
  "What am I feeling right now?",
  "What emotion have I been carrying quietly?",
  "What do I need more of today?",
  "What felt heavy this week?",
  "What pattern keeps repeating in my life?",
  "What boundary do I need to protect?",
  "What would kindness toward myself look like today?",
];

export default function JournalPage() {
  const [mood, setMood] = useState("");
  const [area, setArea] = useState(areas[0]);
  const [prompt, setPrompt] = useState(prompts[0]);
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    await loadEntries(user.uid);
  });

  return () => unsubscribe();
}, []);

  async function loadEntries(userId: string) {
  setLoading(true);

  try {
    const q = query(
      collection(db, "journalEntries"),
      where("userId", "==", userId),
      
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) 
	.sort((a: any, b: any) => {
    const dateA = a.createdAt?.toDate?.() || new Date(0);
    const dateB = b.createdAt?.toDate?.() || new Date(0);
    return dateB.getTime() - dateA.getTime();
    })as JournalEntry[];

    setEntries(data);
  } catch (error) {
    console.error("Error loading journal entries:", error);
    setEntries([]);
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
      const docRef = await addDoc(collection(db, "journalEntries"), {
        userId: user.uid,
        userEmail: user.email,
        mood,
        area,
        prompt,
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
	  
	  console.log("Journal saved with ID:", docRef.id);
      alert(`Journal entry saved: ${docRef.id}`);

      setContent("");
      setMood("");
      setArea(areas[0]);
      setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);

      await loadEntries(user.uid);

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
              A private space to notice your mood, reflect honestly, and
              understand what you are carrying emotionally.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white hover:bg-[#0b3945]"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8 rounded-3xl bg-white p-6 shadow">
          <p className="text-sm leading-7 text-gray-600">
            Your journal is for reflection and self-awareness. It is not a
            diagnosis or a replacement for therapy. If something feels too heavy
            to carry alone, consider speaking with a trusted person or a
            verified therapist.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              How are you feeling today?
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                  Area of Reflection
                </label>

                <select
                  className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  {areas.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

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
                className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945] disabled:opacity-70"
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
              <p className="mt-2 text-gray-600">Loading entries...</p>
            ) : entries.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-[#F7F3EC] p-6">
                <p className="font-semibold text-[#0F4C5C]">
                  No journal entries yet.
                </p>

                <p className="mt-2 text-gray-600">
                  Your reflections will appear here after you save your first
                  entry.
                </p>
              </div>
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

                 {entry.area && (
                     <p className="mt-2 text-sm font-semibold text-[#2C7A7B]">
                       {entry.area}
                     </p>
                 )}

      <p className="mt-3 text-sm font-semibold text-gray-600">
        {entry.prompt}
      </p>

      <p className="mt-3 line-clamp-4 whitespace-pre-line text-gray-700">
        {entry.content}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/journal/${entry.id}`}
          className="rounded-full border-2 border-[#0F4C5C] bg-white px-4 py-3 text-center text-sm font-bold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
        >
          View Entry
        </Link>

        <Link
          href={`/journal/${entry.id}`}
          className="rounded-full bg-[#E2954E] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#d07f34]"
        >
          Reflect with DeepTalk AI
        </Link>
       </div>
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