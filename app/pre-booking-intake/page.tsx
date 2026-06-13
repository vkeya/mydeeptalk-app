"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const concernOptions = [
  "Relationships",
  "Marriage & Couples",
  "Parenting",
  "Parent-Child Relationships",
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
  "Understand myself better",
  "Manage stress better",
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
  const [therapistStyle, setTherapistStyle] = useState("");
  const [faithBasedCounseling, setFaithBasedCounseling] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [sessionMode, setSessionMode] = useState("");

  const [currencyPreference, setCurrencyPreference] = useState("KES");
  const [budgetRange, setBudgetRange] = useState("");

  const [urgency, setUrgency] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [comfortLevel, setComfortLevel] = useState("");
  const [supportExpectation, setSupportExpectation] = useState("");
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

    if (!urgency) {
      alert("Please select how soon you need support.");
      return;
    }

    if (!preferredTime) {
      alert("Please select your preferred session time.");
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
            style: therapistStyle,
            faithBasedCounseling,
            language: preferredLanguage,
            sessionMode,
          },

          currencyPreference,
          budgetRange,
          urgency,
          preferredTime,
          comfortLevel,
          supportExpectation,
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
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Prepare For Your Session
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Help Us Understand What You Need
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Answer a few questions so we can help you find a therapist who fits
            your needs, budget, language, goals, and preferred style of support.
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Therapy Experience
              </h2>

              <select
                className="mb-5 w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                value={therapyExperience}
                onChange={(e) => setTherapyExperience(e.target.value)}
                required
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

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                What Brings You To Therapy?
              </h2>

              <div className="grid gap-3 md:grid-cols-2">
                {concernOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-3 font-semibold text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={mainConcerns.includes(item)}
                      onChange={() =>
                        toggleItem(item, mainConcerns, setMainConcerns)
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-2 text-2xl font-bold text-[#0F4C5C]">
                Emotional Wellbeing
              </h2>

              <p className="mb-5 font-semibold text-gray-900">
                On a scale of 1 to 5, how often have you recently felt the
                following?
              </p>

              <div className="space-y-5">
                {Object.entries(emotionalScores).map(([key, value]) => (
                  <div key={key}>
                    <label className="mb-2 block font-bold capitalize text-[#0F4C5C]">
                      {key}: {value}
                    </label>

                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={value}
                      onChange={(e) =>
                        setEmotionalScores({
                          ...emotionalScores,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Session Details
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={relationshipStatus}
                  onChange={(e) => setRelationshipStatus(e.target.value)}
                >
                  <option value="">Relationship status</option>
                  <option value="Single">Single</option>
                  <option value="Dating">Dating</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Married">Married</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  required
                >
                  <option value="">Type of session needed</option>
                  <option value="Individual">Individual Therapy</option>
                  <option value="Couple">Couples Therapy</option>
                  <option value="Parent + Child">Parent + Child Therapy</option>
                  <option value="Family">Family Therapy</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Therapist Preferences
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={therapistGenderPreference}
                  onChange={(e) =>
                    setTherapistGenderPreference(e.target.value)
                  }
                >
                  <option value="">Therapist gender preference</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="No preference">No preference</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={therapistAgePreference}
                  onChange={(e) => setTherapistAgePreference(e.target.value)}
                >
                  <option value="">Therapist age preference</option>
                  <option value="Under 35">Under 35</option>
                  <option value="35-50">35 - 50</option>
                  <option value="50+">50+</option>
                  <option value="No preference">No preference</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={therapistStyle}
                  onChange={(e) => setTherapistStyle(e.target.value)}
                >
                  <option value="">Preferred therapist style</option>
                  <option value="Warm and gentle">Warm and gentle</option>
                  <option value="Direct and practical">Direct and practical</option>
                  <option value="Reflective and deep">Reflective and deep</option>
                  <option value="Structured with exercises">
                    Structured with exercises
                  </option>
                  <option value="No preference">No preference</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={faithBasedCounseling}
                  onChange={(e) => setFaithBasedCounseling(e.target.value)}
                >
                  <option value="">Faith-based counseling?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Open to either">Open to either</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  required
                >
                  <option value="">Preferred language</option>
                  <option value="English">English</option>
                  <option value="Swahili">Swahili</option>
                  <option value="French">French</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={sessionMode}
                  onChange={(e) => setSessionMode(e.target.value)}
                  required
                >
                  <option value="">Preferred session mode</option>
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                  <option value="Either">Either</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Budget & Availability
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={currencyPreference}
                  onChange={(e) => setCurrencyPreference(e.target.value)}
                  required
                >
                  <option value="KES">KES</option>
                  <option value="USD">USD</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  required
                >
                  <option value="">Budget range per session</option>
                  <option value="Under 2,000">Under 2,000</option>
                  <option value="2,000 - 5,000">2,000 - 5,000</option>
                  <option value="5,000 - 10,000">5,000 - 10,000</option>
                  <option value="10,000+">10,000+</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  required
                >
                  <option value="">How soon do you need support?</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="This week">This week</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="I am flexible">I am flexible</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                >
                  <option value="">Preferred session time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Weekend">Weekend</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Therapy Goals
              </h2>

              <div className="grid gap-3 md:grid-cols-2">
                {goalOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-3 font-semibold text-gray-900"
                  >
                    <input
                      type="checkbox"
                      checked={goals.includes(item)}
                      onChange={() => toggleItem(item, goals, setGoals)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <h2 className="mb-5 text-2xl font-bold text-[#0F4C5C]">
                Comfort & Expectations
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={comfortLevel}
                  onChange={(e) => setComfortLevel(e.target.value)}
                >
                  <option value="">How comfortable are you opening up?</option>
                  <option value="Very comfortable">Very comfortable</option>
                  <option value="Somewhat comfortable">Somewhat comfortable</option>
                  <option value="I may need time to open up">
                    I may need time to open up
                  </option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>

                <select
                  className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
                  value={supportExpectation}
                  onChange={(e) => setSupportExpectation(e.target.value)}
                >
                  <option value="">What support are you hoping for?</option>
                  <option value="Someone to listen and understand">
                    Someone to listen and understand
                  </option>
                  <option value="Practical tools and guidance">
                    Practical tools and guidance
                  </option>
                  <option value="Deep emotional healing">
                    Deep emotional healing
                  </option>
                  <option value="Relationship or family guidance">
                    Relationship or family guidance
                  </option>
                  <option value="I am not sure yet">I am not sure yet</option>
                </select>
              </div>
            </div>

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
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Saving..." : "Continue To Therapists"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}