"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function TherapistAvailabilityPage() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAddAvailability(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "availability"), {
        therapistId: user.uid,
        date,
        startTime,
        endTime,
        isBooked: false,
        createdAt: serverTimestamp(),
      });

      alert("Availability added successfully");

      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error(error);
      alert("Error adding availability");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">Set Availability</h1>

        <form onSubmit={handleAddAvailability} className="space-y-4">
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              className="mt-1 w-full rounded border p-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Start Time</label>
            <input
              type="time"
              className="mt-1 w-full rounded border p-3"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">End Time</label>
            <input
              type="time"
              className="mt-1 w-full rounded border p-3"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black p-3 text-white"
          >
            {loading ? "Saving..." : "Add Availability"}
          </button>
        </form>
      </div>
    </div>
  );
}