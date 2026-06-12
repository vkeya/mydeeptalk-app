"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const circlePackages = [
  {
    name: "Hope Circle",
    description: "Community support for one therapy session.",
    targetAmount: 2000,
    totalSessions: 1,
  },
  {
    name: "Healing Circle",
    description: "A shared gift of three therapy sessions.",
    targetAmount: 5500,
    totalSessions: 3,
  },
  {
    name: "Restoration Circle",
    description: "A deeper community-supported healing journey.",
    targetAmount: 9000,
    totalSessions: 5,
  },
];

export default function HealingCirclePage() {
  const router = useRouter();

  const [selectedPackage, setSelectedPackage] = useState(circlePackages[0]);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [circleMessage, setCircleMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateCircle(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    if (!recipientName || !recipientEmail) {
      alert("Please enter recipient name and email.");
      return;
    }

    setLoading(true);

    try {
      const circleRef = await addDoc(collection(db, "healingCircles"), {
        creatorId: user.uid,
        creatorEmail: user.email || "",
        creatorName: user.displayName || "",

        recipientName,
        recipientEmail: recipientEmail.toLowerCase().trim(),

        packageName: selectedPackage.name,
        packageDescription: selectedPackage.description,
        targetAmount: selectedPackage.targetAmount,
        currentAmount: 0,
        totalSessions: selectedPackage.totalSessions,
        remainingSessions: selectedPackage.totalSessions,

        currency: "KES",
        circleMessage,

        status: "open",
        giftCreated: false,
        giftSessionId: "",

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      alert("Healing Circle created successfully.");

      router.push(`/healing-circle/${circleRef.id}`);
    } catch (error: any) {
      console.error("Healing Circle error:", error);
      alert(error.message || "Could not create Healing Circle.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Healing Circle
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Let Community Support Someone&apos;s Healing
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Create a shared therapy fund where friends, family, churches,
            workplaces, or communities can contribute toward someone&apos;s
            therapy journey.
          </p>
        </section>

        <form
          onSubmit={handleCreateCircle}
          className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-10"
        >
          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Choose a Circle Package
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {circlePackages.map((circlePackage) => (
              <button
                key={circlePackage.name}
                type="button"
                onClick={() => setSelectedPackage(circlePackage)}
                className={`rounded-3xl border-2 p-6 text-left transition ${
                  selectedPackage.name === circlePackage.name
                    ? "border-[#0F4C5C] bg-[#F7F3EC]"
                    : "border-gray-200 bg-white hover:border-[#0F4C5C]"
                }`}
              >
                <h3 className="text-xl font-bold text-[#0F4C5C]">
                  {circlePackage.name}
                </h3>

                <p className="mt-3 text-sm font-semibold leading-6 text-gray-900">
                  {circlePackage.description}
                </p>

                <p className="mt-5 text-2xl font-bold text-[#0F4C5C]">
                  KES {circlePackage.targetAmount}
                </p>

                <p className="mt-1 text-sm font-bold text-gray-700">
                  {circlePackage.totalSessions} session
                  {circlePackage.totalSessions > 1 ? "s" : ""}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />

            <input
              type="email"
              placeholder="Recipient email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />
          </div>

          <textarea
            rows={5}
            placeholder="Optional message for the Healing Circle"
            value={circleMessage}
            onChange={(e) => setCircleMessage(e.target.value)}
            className="mt-5 w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Circle..." : "Create Healing Circle"}
          </button>
        </form>
      </div>
    </main>
  );
}