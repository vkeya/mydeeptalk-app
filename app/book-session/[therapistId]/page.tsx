"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function BookSessionPage() {
  const params = useParams();
  const router = useRouter();

  const therapistId = params.therapistId as string;

  const [therapist, setTherapist] = useState<any>(null);

  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    async function fetchTherapist() {
      try {
        const therapistRef = doc(db, "therapists", therapistId);
        const therapistSnap = await getDoc(therapistRef);

        if (therapistSnap.exists()) {
          setTherapist({
            id: therapistSnap.id,
            ...therapistSnap.data(),
          });
        }

        setPageLoading(false);
      } catch (error) {
        console.error(error);
        setPageLoading(false);
      }
    }

    if (therapistId) {
      fetchTherapist();
    }
  }, [therapistId]);

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      const bookingRef = await addDoc(collection(db, "bookings"), {
        clientId: user.uid,
		clientName: user.displayName || "",
        clientEmail: user.email || "",
		
        therapistId: therapist.id,
        therapistName: therapist.fullName,
		therapistEmail: therapist.email || "",
		
        sessionFee: therapist.sessionFee || 0,
        sessionDate,
        sessionTime,
		
        status: "pending",
        paymentStatus: "unpaid",
        meetingLink: "",
        createdAt: serverTimestamp(),
      });

      alert("Booking created successfully.");

      router.push(`/payment/${bookingRef.id}`);
    } catch (error) {
      console.error(error);
      alert("Error creating booking.");
    }

    setLoading(false);
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading therapist...
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Therapist not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-2xl">

        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">
            Book Therapy Session
          </h1>

          <p className="mt-4 text-white/80">
            Schedule a session with {therapist.fullName}.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

          <div className="rounded-2xl bg-[#F7F3EC] p-6">

            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              {therapist.fullName}
            </h2>

            <p className="mt-4 text-gray-600">
              Session Fee
            </p>

            <p className="text-3xl font-bold text-[#0F4C5C]">
              KES {therapist.sessionFee}
            </p>

          </div>

          <form
            onSubmit={handleBooking}
            className="mt-8 space-y-6"
          >

            <div>
              <label className="mb-2 block font-medium">
                Date
              </label>

              <input
                type="date"
                className="w-full rounded-2xl border p-4"
                value={sessionDate}
                onChange={(e) =>
                  setSessionDate(e.target.value)
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Time
              </label>

              <input
                type="time"
                className="w-full rounded-2xl border p-4"
                value={sessionTime}
                onChange={(e) =>
                  setSessionTime(e.target.value)
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945]"
            >
              {loading
                ? "Creating Booking..."
                : "Proceed to Payment"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}