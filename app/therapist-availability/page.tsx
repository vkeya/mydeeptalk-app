"use client";

import { useEffect, useState } from "react";
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
  const [weeklySlots, setWeeklySlots] = useState<WeeklySlot[]>(
    days.map((day) => ({
      day,
      enabled: false,
      startTime: "09:00",
      endTime: "17:00",
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
            setWeeklySlots(data.weeklySlots);
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
        i === index ? { ...slot, [field]: value } : slot
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

      alert("Availability saved successfully.");
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Error saving availability.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-8 text-[#0F4C5C]">
        Loading availability...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Set Weekly Availability</h1>

          <p className="mt-4 text-white/90">
            Choose the days and times you are usually available for client
            sessions.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSaveAvailability} className="space-y-8">
            <div>
              <label className="mb-3 block font-semibold text-[#0F4C5C]">
                Session Duration
              </label>

              <select
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </div>

            <div className="space-y-4">
              {weeklySlots.map((slot, index) => (
                <div
                  key={slot.day}
                  className="rounded-2xl border border-gray-200 bg-[#F7F3EC] p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <label className="flex items-center gap-3 font-semibold text-[#0F4C5C]">
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

                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="time"
                        value={slot.startTime}
                        disabled={!slot.enabled}
                        onChange={(e) =>
                          updateSlot(index, "startTime", e.target.value)
                        }
                        className="rounded-xl border border-gray-300 bg-white p-3 text-gray-900 disabled:opacity-50"
                      />

                      <input
                        type="time"
                        value={slot.endTime}
                        disabled={!slot.enabled}
                        onChange={(e) =>
                          updateSlot(index, "endTime", e.target.value)
                        }
                        className="rounded-xl border border-gray-300 bg-white p-3 text-gray-900 disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945] disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Availability"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}