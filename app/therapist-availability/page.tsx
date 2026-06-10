"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type WeeklySlot = {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export default function TherapistAvailabilityPage() {
  const router = useRouter();

  const [weeklySlots, setWeeklySlots] = useState<WeeklySlot[]>(
    days.map((day) => ({
      day,
      enabled: false,
      startTime: "",
      endTime: "",
    }))
  );

  const [sessionDuration, setSessionDuration] = useState("60");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function loadAvailability() {
      const user = auth.currentUser;

      if (!user) {
        setPageLoading(false);
        return;
      }

      try {
        const ref = doc(db, "therapistAvailability", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          if (Array.isArray(data.weeklySlots)) {
            const savedSlots = days.map((day) => {
              const found = data.weeklySlots.find(
                (slot: WeeklySlot) => slot.day === day
              );

              return {
                day,
                enabled: found?.enabled || false,
                startTime: found?.startTime || "",
                endTime: found?.endTime || "",
              };
            });

            setWeeklySlots(savedSlots);
          }

          if (data.sessionDuration) {
            setSessionDuration(String(data.sessionDuration));
          }
        }
      } catch (error) {
        console.error("Error loading availability:", error);
      } finally {
        setPageLoading(false);
      }
    }

    loadAvailability();
  }, []);

  function updateSlot(
    index: number,
    field: "enabled" | "startTime" | "endTime",
    value: boolean | string
  ) {
    setWeeklySlots((prev) =>
      prev.map((slot, i) =>
        i === index
          ? {
              ...slot,
              [field]: value,
              ...(field === "enabled" && value === false
                ? { startTime: "", endTime: "" }
                : {}),
            }
          : slot
      )
    );
  }

  async function handleSaveAvailability(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    const activeSlots = weeklySlots.filter((slot) => slot.enabled);

    if (activeSlots.length === 0) {
      alert("Please select at least one available day.");
      return;
    }

    const invalidSlot = activeSlots.find(
      (slot) =>
        !slot.startTime || !slot.endTime || slot.startTime >= slot.endTime
    );

    if (invalidSlot) {
      alert(`Please check the start and end time for ${invalidSlot.day}.`);
      return;
    }

    setLoading(true);

    try {
      await setDoc(
        doc(db, "therapistAvailability", user.uid),
        {
          therapistId: user.uid,
          weeklySlots,
          sessionDuration: Number(sessionDuration),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Error saving availability.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-8">
        <p className="font-bold text-[#0F4C5C]">Loading availability...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg md:p-10">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Therapist Availability
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Set Weekly Availability
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-white md:text-lg">
            Choose the exact days and time ranges you are available. Each day
            can have a different schedule.
          </p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-lg md:p-8">
          <form onSubmit={handleSaveAvailability} className="space-y-8">
            <div className="rounded-2xl bg-[#F7F3EC] p-6">
              <label className="mb-3 block font-bold text-[#0F4C5C]">
                Session Duration
              </label>

              <select
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>

              <p className="mt-3 text-base font-semibold leading-7 text-gray-900">
                This controls how client booking slots are generated from your
                available time range.
              </p>
            </div>

            <div className="space-y-4">
              {weeklySlots.map((slot, index) => (
                <div
                  key={slot.day}
                  className="rounded-2xl border border-gray-200 bg-[#F7F3EC] p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <label className="flex items-center gap-3 text-lg font-bold text-[#0F4C5C]">
                      <input
                        type="checkbox"
                        checked={slot.enabled}
                        onChange={(e) =>
                          updateSlot(index, "enabled", e.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      {slot.day}
                    </label>

                    <div className="grid w-full gap-4 sm:grid-cols-2 md:max-w-md">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-900">
                          Start Time
                        </label>

                        <input
                          type="time"
                          value={slot.startTime}
                          disabled={!slot.enabled}
                          required={slot.enabled}
                          onChange={(e) =>
                            updateSlot(index, "startTime", e.target.value)
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white p-3 font-semibold text-gray-900 disabled:bg-gray-200 disabled:text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-900">
                          End Time
                        </label>

                        <input
                          type="time"
                          value={slot.endTime}
                          disabled={!slot.enabled}
                          required={slot.enabled}
                          onChange={(e) =>
                            updateSlot(index, "endTime", e.target.value)
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white p-3 font-semibold text-gray-900 disabled:bg-gray-200 disabled:text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {!slot.enabled && (
                    <p className="mt-4 rounded-xl bg-white p-3 text-sm font-bold text-gray-900">
                      Not available on {slot.day}.
                    </p>
                  )}

                  {slot.enabled && slot.startTime && slot.endTime && (
                    <p className="mt-4 rounded-xl bg-white p-3 text-sm font-bold text-[#0F4C5C]">
                      Available on {slot.day} from {slot.startTime} to{" "}
                      {slot.endTime}.
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white hover:bg-[#0b3945] disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Availability"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}