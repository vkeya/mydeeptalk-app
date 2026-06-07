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
        console.error(error);
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
      .reduce(
        (sum, booking) => sum + Number(booking.sessionFee || 0),
        0
      );
  }, [bookings]);

  async function markCompleted(id: string) {
    try {
      await updateDoc(doc(db, "bookings", id), {
        status: "completed",
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id
            ? { ...booking, status: "completed" }
            : booking
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
          booking.id === id
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  const upcomingSessions = bookings.filter(
    (booking) =>
      booking.status === "confirmed"
  );

  const completedSessions = bookings.filter(
    (booking) =>
      booking.status === "completed"
  );

  if (loading) {
    return (
      <main className="p-6">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold mb-6">
          Therapist Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Upcoming Sessions</p>
            <h2 className="text-3xl font-bold">
              {upcomingSessions.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Completed Sessions</p>
            <h2 className="text-3xl font-bold">
              {completedSessions.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Earnings</p>
            <h2 className="text-3xl font-bold text-green-600">
              KES {totalEarnings}
            </h2>
          </div>

        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Upcoming Sessions
        </h2>

        <div className="space-y-4 mb-10">
          {upcomingSessions.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <p>
                <strong>Client:</strong>{" "}
                {booking.clientName}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {booking.sessionDate}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {booking.sessionTime}
              </p>

              <p>
                <strong>Fee:</strong> KES{" "}
                {booking.sessionFee}
              </p>

              {booking.meetingLink && (
                <a
                  href={booking.meetingLink}
                  target="_blank"
                  className="inline-block mt-4 mr-3 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Join Session
                </a>
              )}

              <button
                onClick={() => markCompleted(booking.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-3"
              >
                Mark Completed
              </button>

              <button
                onClick={() => cancelSession(booking.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Completed Sessions
        </h2>

        <div className="space-y-4">
          {completedSessions.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <p>
                <strong>Client:</strong>{" "}
                {booking.clientName}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {booking.sessionDate}
              </p>

              <p>
                <strong>Amount Earned:</strong> KES{" "}
                {booking.sessionFee}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}