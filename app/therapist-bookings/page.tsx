"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function TherapistBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBookings(userId: string) {
    const q = query(
      collection(db, "bookings"),
      where("therapistId", "==", userId)
    );

    const snapshot = await getDocs(q);

    const list: any[] = [];

    snapshot.forEach((docItem) => {
      list.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    setBookings(list);
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      fetchBookings(user.uid);
    });

    return () => unsubscribe();
  }, []);

  async function updateBookingStatus(id: string, status: string) {
    await updateDoc(doc(db, "bookings", id), {
      status,
    });

    const user = auth.currentUser;
    if (user) {
      fetchBookings(user.uid);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Therapist Bookings</h1>
          <p className="mt-4 text-white/80">
            Review, accept, reject and manage client sessions.
          </p>
        </div>

        {bookings.length === 0 && (
          <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
            No client bookings yet.
          </div>
        )}

        <div className="mt-8 space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-[#0F4C5C]">
                Therapy Session
              </h2>

              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  <strong>Date:</strong> {booking.sessionDate}
                </p>
                <p>
                  <strong>Time:</strong> {booking.sessionTime}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <p>
                  <strong>Payment:</strong> {booking.paymentStatus}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => updateBookingStatus(booking.id, "accepted")}
                  className="rounded-full bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateBookingStatus(booking.id, "rejected")}
                  className="rounded-full bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                >
                  Reject
                </button>

                <button
                  onClick={() => updateBookingStatus(booking.id, "completed")}
                  className="rounded-full bg-[#0F4C5C] px-5 py-3 text-white hover:bg-[#0b3945]"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}