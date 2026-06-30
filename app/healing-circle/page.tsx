"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Users, Check, HeartHandshake } from "lucide-react";

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
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-8 text-white md:p-12">
          <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#2C7A7B]/40 blur-3xl" />
          <div className="animate-blob pointer-events-none absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-[#E2954E]/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-white">
              <Users className="h-4 w-4" /> Healing Circle
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl">
              Let community support someone&apos;s healing
            </h1>

            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white/90 md:text-lg">
              Create a shared therapy fund where friends, family, churches,
              workplaces, or communities can contribute toward someone&apos;s
              therapy journey.
            </p>
          </div>
        </section>

        <form
          onSubmit={handleCreateCircle}
          className="mt-8 rounded-xl border border-[#0F4C5C]/10 bg-white p-6 shadow-sm md:p-10"
        >
          <span className="eyebrow">Step 1</span>
          <h2 className="mt-3 text-2xl font-bold text-[#0F4C5C]">
            Choose a circle package
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {circlePackages.map((circlePackage) => {
              const selected = selectedPackage.name === circlePackage.name;
              return (
                <button
                  key={circlePackage.name}
                  type="button"
                  onClick={() => setSelectedPackage(circlePackage)}
                  className={`relative rounded-xl border-2 p-6 text-left transition duration-300 ${
                    selected
                      ? "-translate-y-1 border-[#0F4C5C] bg-[#0F4C5C]/5 shadow-lg"
                      : "border-transparent bg-white shadow-[0_10px_30px_-18px_rgba(15,76,92,0.3)] hover:-translate-y-1 hover:border-[#0F4C5C]/30"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                      selected
                        ? "bg-[#0F4C5C] text-white"
                        : "bg-[#E2954E]/12 text-[#E2954E]"
                    }`}
                  >
                    <HeartHandshake className="h-5 w-5" />
                  </span>

                  {selected && (
                    <span className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#0F4C5C] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                  )}

                  <h3 className="mt-4 text-xl font-bold text-[#0F4C5C]">
                    {circlePackage.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                    {circlePackage.description}
                  </p>

                  <p className="mt-5 text-2xl font-bold text-[#0F4C5C]">
                    KES {circlePackage.targetAmount}
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-600">
                    {circlePackage.totalSessions} session
                    {circlePackage.totalSessions > 1 ? "s" : ""}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <input
              type="text"
              placeholder="Recipient name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />

            <input
              type="email"
              placeholder="Recipient email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              required
            />
          </div>

          <textarea
            rows={5}
            placeholder="Optional message for the Healing Circle"
            value={circleMessage}
            onChange={(e) => setCircleMessage(e.target.value)}
            className="mt-5 w-full rounded-xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
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