"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

type Booking = {
  id: string;
  clientId?: string;
  therapistId?: string;
  therapistName?: string;
  therapistEmail?: string;
  sessionDate?: string;
  sessionTime?: string;
  sessionFee?: number;
  paymentStatus?: string;
  status?: string;
  meetingLink?: string;
  paidAt?: string;
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "bookings"),
          where("clientId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[];

        setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const upcomingSessions = useMemo(
    () => bookings.filter((booking) => booking.status === "confirmed"),
    [bookings]
  );

  const completedSessions = useMemo(
    () => bookings.filter((booking) => booking.status === "completed"),
    [bookings]
  );

  const cancelledSessions = useMemo(
    () => bookings.filter((booking) => booking.status === "cancelled"),
    [bookings]
  );

  async function submitReview(booking: Booking) {
    try {
      if (!booking.clientId || !booking.therapistId) {
        alert("Missing booking details. Review cannot be submitted.");
        return;
      }

      await addDoc(collection(db, "reviews"), {
        bookingId: booking.id,
        clientId: booking.clientId,
        therapistId: booking.therapistId,
        therapistName: booking.therapistName || "",
        rating: ratings[booking.id] || 5,
        comment: comments[booking.id] || "",
        createdAt: serverTimestamp(),
      });

      alert("Review submitted successfully!");

      setComments((prev) => ({
        ...prev,
        [booking.id]: "",
      }));

      setRatings((prev) => ({
        ...prev,
        [booking.id]: 5,
      }));
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-6 text-[#0F4C5C]">
        <p className="font-semibold">Loading bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">My Sessions</h1>

          <p className="mt-3 text-white/90">
            View your upcoming, completed, and cancelled therapy sessions.
          </p>
        </div>

        <div className="my-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="font-bold text-[#0F4C5C]">Upcoming Sessions</p>

            <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              {upcomingSessions.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="font-bold text-[#0F4C5C]">Completed Sessions</p>

            <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              {completedSessions.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="font-bold text-[#0F4C5C]">Cancelled Sessions</p>

            <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">
              {cancelledSessions.length}
            </h2>
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-[#0F4C5C]">
          Upcoming Sessions
        </h2>

        <div className="mb-10 space-y-4">
          {upcomingSessions.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="font-medium text-gray-800">
                No upcoming sessions.
              </p>
            </div>
          ) : (
            upcomingSessions.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <p className="text-gray-900">
                  <strong>Therapist:</strong>{" "}
                  {booking.therapistName || "Therapist"}
                </p>

                <p className="text-gray-900">
                  <strong>Date:</strong> {booking.sessionDate || "Not set"}
                </p>

                <p className="text-gray-900">
                  <strong>Time:</strong> {booking.sessionTime || "Not set"}
                </p>

                <p className="text-gray-900">
                  <strong>Payment:</strong>{" "}
                  {booking.paymentStatus || "unpaid"}
                </p>

                {booking.meetingLink ? (
                  <a
                    href={booking.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-full bg-green-700 px-5 py-3 font-semibold text-white"
                  >
                    Join Session
                  </a>
                ) : (
                  <p className="mt-3 text-sm font-medium text-gray-800">
                    Meeting link will appear after confirmation.
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        <h2 className="mb-4 text-3xl font-bold text-[#0F4C5C]">
          Session History
        </h2>

        <div className="space-y-4">
          {completedSessions.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 shadow">
              <p className="font-medium text-gray-800">
                No completed sessions yet.
              </p>
            </div>
          ) : (
            completedSessions.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <p className="text-gray-900">
                  <strong>Therapist:</strong>{" "}
                  {booking.therapistName || "Therapist"}
                </p>

                <p className="text-gray-900">
                  <strong>Date:</strong> {booking.sessionDate || "Not set"}
                </p>

                <p className="text-gray-900">
                  <strong>Time:</strong> {booking.sessionTime || "Not set"}
                </p>

                <p className="font-bold text-green-700">Completed</p>

                <div className="mt-4 border-t pt-4">
                  <label className="mb-2 block font-bold text-[#0F4C5C]">
                    Rating
                  </label>

                  <select
                    className="mb-3 rounded border border-gray-300 bg-white p-3 text-gray-900"
                    value={ratings[booking.id] || 5}
                    onChange={(e) =>
                      setRatings({
                        ...ratings,
                        [booking.id]: Number(e.target.value),
                      })
                    }
                  >
                    <option value={5}>★★★★★ Excellent</option>
                    <option value={4}>★★★★ Good</option>
                    <option value={3}>★★★ Average</option>
                    <option value={2}>★★ Below Average</option>
                    <option value={1}>★ Poor</option>
                  </select>

                  <textarea
                    className="mb-3 w-full rounded border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-600"
                    placeholder="Share your experience..."
                    value={comments[booking.id] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [booking.id]: e.target.value,
                      })
                    }
                  />

                  <button
                    onClick={() => submitReview(booking)}
                    className="rounded-full bg-[#0F4C5C] px-5 py-3 font-semibold text-white hover:bg-[#0b3945]"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}