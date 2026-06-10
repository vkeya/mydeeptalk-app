"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

type Booking = {
  id: string;
  clientName?: string;
  clientEmail?: string;
  sessionDate?: string;
  sessionTime?: string;
  sessionFee?: number;
  paymentStatus?: string;
  status?: string;
  paidAt?: string;
  meetingLink?: string;
};

export default function TherapistBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "bookings"),
          where("therapistId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[];

        setBookings(data);
      } catch (error) {
        console.error("Error loading therapist bookings:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const totalEarnings = useMemo(() => {
    return bookings
      .filter(
        (booking) =>
          booking.paymentStatus === "paid" &&
          booking.status === "completed"
      )
      .reduce((sum, booking) => sum + Number(booking.sessionFee || 0), 0);
  }, [bookings]);

  async function markCompleted(id: string) {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "completed",
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: "completed" } : booking
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function cancelSession(id: string) {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "cancelled",
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: "cancelled" } : booking
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  const upcomingSessions = bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  const completedSessions = bookings.filter(
    (booking) => booking.status === "completed"
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-6 text-[#0F4C5C]">
        <p className="font-semibold">Loading therapist bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Therapist Dashboard</h1>

          <p className="mt-3 text-white/90">
            Manage your upcoming sessions, completed appointments, and earnings.
          </p>
        </div>

        <div className="my-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="font-semibold text-[#0F4C5C]">Upcoming Sessions</p>

            <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              {upcomingSessions.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="font-semibold text-[#0F4C5C]">Completed Sessions</p>

            <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              {completedSessions.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="font-semibold text-[#0F4C5C]">Total Earnings</p>

            <h2 className="mt-3 text-4xl font-bold text-green-700">
              KES {totalEarnings}
            </h2>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-[#0F4C5C]">
          Upcoming Sessions
        </h2>

        <div className="mb-10 space-y-4">
          {upcomingSessions.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="font-semibold text-gray-900">
                No upcoming sessions yet.
              </p>
            </div>
          ) : (
            upcomingSessions.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="space-y-2 text-gray-900">
                  <p>
                    <strong>Client:</strong>{" "}
                    {booking.clientName || "Client"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {booking.clientEmail || "Not provided"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.sessionDate || "Not set"}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.sessionTime || "Not set"}
                  </p>

                  <p>
                    <strong>Fee:</strong> KES {booking.sessionFee || 0}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {booking.paymentStatus || "unpaid"}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {booking.meetingLink && (
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-green-700 px-5 py-3 font-semibold text-white"
                    >
                      Join Session
                    </a>
                  )}

                  <button
                    onClick={() => markCompleted(booking.id)}
                    className="rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white hover:bg-[#0b3945]"
                  >
                    Mark Completed
                  </button>

                  <button
                    onClick={() => cancelSession(booking.id)}
                    className="rounded-full bg-red-700 px-5 py-3 font-semibold text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <h2 className="mb-4 text-3xl font-bold text-[#0F4C5C]">
          Completed Sessions
        </h2>

        <div className="space-y-4">
          {completedSessions.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="font-semibold text-gray-900">
                No completed sessions yet.
              </p>
            </div>
          ) : (
            completedSessions.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="space-y-2 text-gray-900">
                  <p>
                    <strong>Client:</strong>{" "}
                    {booking.clientName || "Client"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.sessionDate || "Not set"}
                  </p>

                  <p>
                    <strong>Amount Earned:</strong> KES{" "}
                    {booking.sessionFee || 0}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}