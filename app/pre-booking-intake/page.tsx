"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const concernOptions = [
  "Relationships",
  "Marriage & Couples",
  "Parenting",
  "Trauma & Healing",
  "Anxiety",
  "Depression",
  "Stress & Burnout",
  "Grief & Loss",
  "Addiction & Recovery",
  "Self-Esteem",
  "Emotional Regulation",
  "Life Transitions",
  "Faith-Based Support",
  "Career Issues",
  "Loneliness",
  "Other",
];

const goalOptions = [
  "Better relationships",
  "Healing from the past",
  "Improved emotional wellbeing",
  "Reduced anxiety",
  "Better communication",
  "Parenting support",
  "Personal growth",
  "Addiction recovery support",
];

export default function PreBookingIntakePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [therapyExperience, setTherapyExperience] = useState("");
  const [previousTherapyExperience, setPreviousTherapyExperience] =
    useState("");

  const [mainConcerns, setMainConcerns] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  const [relationshipStatus, setRelationshipStatus] = useState("");
  const [sessionType, setSessionType] = useState("");

  const [emotionalScores, setEmotionalScores] = useState({
    anxiety: "3",
    sadness: "3",
    stress: "3",
    loneliness: "3",
    anger: "3",
  });

  const [therapistGenderPreference, setTherapistGenderPreference] =
    useState("");
  const [therapistAgePreference, setTherapistAgePreference] = useState("");
  const [faithBasedCounseling, setFaithBasedCounseling] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [sessionMode, setSessionMode] = useState("");
  const [currencyPreference, setCurrencyPreference] = useState("KES");
  const [budgetRange, setBudgetRange] = useState("");
  const [notes, setNotes] = useState("");

  function toggleItem(
    item: string,
    currentItems: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    if (currentItems.includes(item)) {
      setItems(currentItems.filter((value) => value !== item));
    } else {
      setItems([...currentItems, item]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!therapyExperience) {
      alert("Please select whether you have done therapy before.");
      return;
    }

    if (mainConcerns.length === 0) {
      alert("Please select at least one reason for seeking therapy.");
      return;
    }

    if (!sessionType) {
      alert("Please select the type of session you are looking for.");
      return;
    }

    if (!preferredLanguage) {
      alert("Please select your preferred language.");
      return;
    }

    if (!sessionMode) {
      alert("Please select your preferred session mode.");
      return;
    }

    if (!budgetRange) {
      alert("Please select your budget range.");
      return;
    }

    setLoading(true);

    try {
      await setDoc(
        doc(db, "preBookingIntakes", user.uid),
        {
          uid: user.uid,
          email: user.email,

          therapyExperience,
          previousTherapyExperience,

          mainConcerns,
          goals,

          relationshipStatus,
          sessionType,

          emotionalScores: {
            anxiety: Number(emotionalScores.anxiety),
            sadness: Number(emotionalScores.sadness),
            stress: Number(emotionalScores.stress),
            loneliness: Number(emotionalScores.loneliness),
            anger: Number(emotionalScores.anger),
          },

          therapistPreferences: {
            gender: therapistGenderPreference,
            age: therapistAgePreference,
            faithBasedCounseling,
            language: preferredLanguage,
            sessionMode,
          },

          currencyPreference,
          budgetRange,
          notes,

          status: "completed",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      router.push("/therapists");
    } catch (error: any) {
      console.error("Pre-booking intake error:", error);
      alert(error.message || "Could not save your intake form.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide">
            Prepare For Your Session
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Help Us Understand What You Need
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 md:text-lg">
            Before you choose a therapist, answer a few questions to help us
            understand your needs, preferences, and the kind of support you are
            looking for.
          </p>
        </section>

        {/* Form */}
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Therapy Experience */}
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Therapy Experience
              </h2>

              <select
                className="mb-5 w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                value={therapyExperience}
                onChange={(e) => setTherapyExperience(e.target.value)}
              >
                <option value="">Have you attended therapy before?</option>
                <option value="First time">No, this is my first time</option>
                <option value="Currently in therapy">
                  Yes, I am currently in therapy
                </option>
                <option value="Past therapy">
                  Yes, I have done therapy in the past
                </option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>

              <select
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                value={previousTherapyExperience}
                onChange={(e) => setPreviousTherapyExperience(e.target.value)}
              >
                <option value="">If yes, how was your experience?</option>
                <option value="Very helpful">Very helpful</option>
                <option value="Somewhat helpful">Somewhat helpful</option>
                <option value="Mixed experience">Mixed experience</option>
                <option value="Not helpful">Not helpful</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Notes */}
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Notes For Your Therapist
              </h2>

              <textarea
                rows={5}
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                placeholder="Anything you would like your therapist to know before your first session?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945]"
            >
              {loading ? "Saving..." : "Continue To Therapists"}
            </button>

          </form>
        </section>
      </div>
    </main>
  );
}