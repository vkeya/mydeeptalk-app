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
      alert("Could not mark session as completed.");
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
      alert("Could not cancel session.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-6 text-[#0F4C5C]">
        <p className="font-bold">Loading therapist bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-6">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-8 text-white shadow-lg">
          <p className="mb-3 font-bold uppercase tracking-wide text-white">
            Therapist Sessions
          </p>

          <h1 className="text-4xl font-bold text-white">
            Therapist Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-base font-semibold leading-8 text-white">
            Manage pending bookings, upcoming sessions, completed appointments,
            cancellations, and earnings.
          </p>
        </section>

        <section className="my-10 grid gap-4 md:grid-cols-5">
          <SummaryCard title="Pending" value={pendingSessions.length} />
          <SummaryCard title="Upcoming" value={upcomingSessions.length} />
          <SummaryCard title="Completed" value={completedSessions.length} />
          <SummaryCard title="Cancelled" value={cancelledSessions.length} />
          <SummaryCard title="Earnings" value={`KES ${totalEarnings}`} />
        </section>

        <SessionSection title="Pending Bookings">
          {pendingSessions.length === 0 ? (
            <EmptyState text="No pending bookings." />
          ) : (
            pendingSessions.map((booking) => (
              <SessionCard key={booking.id} booking={booking}>
                <p className="mt-4 rounded-2xl bg-yellow-100 p-4 font-bold text-gray-900">
                  This booking may still be awaiting payment or confirmation.
                </p>
              </SessionCard>
            ))
          )}
        </SessionSection>

        <SessionSection title="Upcoming Sessions">
          {upcomingSessions.length === 0 ? (
            <EmptyState text="No upcoming sessions yet." />
          ) : (
            upcomingSessions.map((booking) => (
              <SessionCard key={booking.id} booking={booking}>
                <div className="mt-5 flex flex-wrap gap-3">
                  {booking.meetingLink && (
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-green-700 px-5 py-3 font-bold text-white"
                    >
                      Join Session
                    </a>
                  )}

                  <button
                    onClick={() => markCompleted(booking.id)}
                    className="rounded-full bg-[#0F4C5C] px-5 py-3 font-bold text-white hover:bg-[#0b3945]"
                  >
                    Mark Completed
                  </button>

                  <button
                    onClick={() => cancelSession(booking.id)}
                    className="rounded-full bg-red-700 px-5 py-3 font-bold text-white"
                  >
                    Cancel
                  </button>
                </div>
              </SessionCard>
            ))
          )}
        </SessionSection>

        <SessionSection title="Completed Sessions">
          {completedSessions.length === 0 ? (
            <EmptyState text="No completed sessions yet." />
          ) : (
            completedSessions.map((booking) => (
              <SessionCard key={booking.id} booking={booking}>
                <p className="mt-4 font-bold text-green-700">Completed</p>
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

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="font-bold text-[#0F4C5C]">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-[#0F4C5C]">{value}</h2>
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
          <strong>Client:</strong> {booking.clientName || "Client"}
        </p>

        <p>
          <strong>Email:</strong> {booking.clientEmail || "Not provided"}
        </p>

        <p>
          <strong>Date:</strong> {booking.sessionDate || "Not set"}
        </p>

        <p>
          <strong>Time:</strong> {booking.sessionTime || "Not set"}
        </p>

        <p>
          <strong>Fee:</strong> KES {booking.sessionFee || 0}
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