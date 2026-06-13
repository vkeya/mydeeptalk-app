"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

type Booking = {
  id: string;
  clientId?: string;
  clientAlias?: string;
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

  const pendingSessions = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.status === "pending" || booking.paymentStatus === "unpaid"
      ),
    [bookings]
  );

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
	  
	  const userSnap = await getDoc(doc(db, "users", booking.clientId));
      const userData = userSnap.exists() ? userSnap.data() : null;

      await addDoc(collection(db, "reviews"), {
        bookingId: booking.id,
        clientId: booking.clientId,
		clientAlias: userData?.alias || "Anonymous Client",
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
        <p className="font-bold">Loading your sessions...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            MyDeepTalk Sessions
          </p>

          <h1 className="text-4xl font-bold text-white">My Sessions</h1>

          <p className="mt-3 max-w-3xl text-base font-semibold leading-8 text-white">
            View your pending, upcoming, completed, and cancelled therapy
            sessions.
          </p>
        </section>

        <section className="my-10 grid gap-4 md:grid-cols-4">
          <SummaryCard title="Pending" value={pendingSessions.length} />
          <SummaryCard title="Upcoming" value={upcomingSessions.length} />
          <SummaryCard title="Completed" value={completedSessions.length} />
          <SummaryCard title="Cancelled" value={cancelledSessions.length} />
        </section>

        <SessionSection title="Pending Sessions">
          {pendingSessions.length === 0 ? (
            <EmptyState text="No pending sessions." />
          ) : (
            pendingSessions.map((booking) => (
              <SessionCard key={booking.id} booking={booking}>
                <p className="mt-4 rounded-2xl bg-yellow-100 p-4 font-bold text-gray-900">
                  Payment or confirmation may still be pending.
                </p>
              </SessionCard>
            ))
          )}
        </SessionSection>

        <SessionSection title="Upcoming Sessions">
          {upcomingSessions.length === 0 ? (
            <EmptyState text="No upcoming sessions." />
          ) : (
            upcomingSessions.map((booking) => (
              <SessionCard key={booking.id} booking={booking}>
                {booking.meetingLink ? (
                  <a
                    href={booking.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block rounded-full bg-green-700 px-5 py-3 font-bold text-white"
                  >
                    Join Session
                  </a>
                ) : (
                  <p className="mt-4 rounded-2xl bg-[#F7F3EC] p-4 font-bold text-gray-900">
                    Meeting link will appear after confirmation.
                  </p>
                )}
              </SessionCard>
            ))
          )}
        </SessionSection>

        <SessionSection title="Session History">
          {completedSessions.length === 0 ? (
            <EmptyState text="No completed sessions yet." />
          ) : (
            completedSessions.map((booking) => (
              <SessionCard key={booking.id} booking={booking}>
                <p className="mt-4 font-bold text-green-700">Completed</p>

                <div className="mt-5 border-t border-gray-200 pt-5">
                  <label className="mb-2 block font-bold text-[#0F4C5C]">
                    Rating
                  </label>

                  <select
                    className="mb-3 w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 md:w-auto"
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
                    className="mb-3 w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-700"
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
                    className="rounded-full bg-[#0F4C5C] px-5 py-3 font-bold text-white hover:bg-[#0b3945]"
                  >
                    Submit Review
                  </button>
                </div>
              </SessionCard>
            ))
          )}
        </SessionSection>

        <SessionSection title="Cancelled Sessions">
          {cancelledSessions.length === 0 ? (
            <EmptyState text="No cancelled sessions." />
          ) : (
            cancelledSessions.map((booking) => (
              <SessionCard key={booking.id} booking={booking}>
                <p className="mt-4 font-bold text-red-700">Cancelled</p>
              </SessionCard>
            ))
          )}
        </SessionSection>
      </div>
    </main>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="font-bold text-[#0F4C5C]">{title} Sessions</p>

      <h2 className="mt-3 text-4xl font-bold text-[#0F4C5C]">{value}</h2>
    </div>
  );
}

function SessionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-3xl font-bold text-[#0F4C5C]">{title}</h2>

      <div className="space-y-4">{children}</div>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="font-bold text-gray-900">{text}</p>
    </div>
  );
}

function SessionCard({
  booking,
  children,
}: {
  booking: Booking;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="space-y-2 text-base font-semibold text-gray-900">
        <p>
          <strong>Therapist:</strong> {booking.therapistName || "Therapist"}
        </p>

        <p>
          <strong>Date:</strong> {booking.sessionDate || "Not set"}
        </p>

        <p>
          <strong>Time:</strong> {booking.sessionTime || "Not set"}
        </p>

        <p>
          <strong>Payment:</strong> {booking.paymentStatus || "unpaid"}
        </p>

        <p>
          <strong>Status:</strong> {booking.status || "pending"}
        </p>
      </div>

      {children}
    </div>
  );
}