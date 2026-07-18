"use client";

import { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

type Booking = {
  id: string;
  clientName?: string;
  clientAlias?: string;
  clientEmail?: string;
  sessionDate?: string;
  sessionTime?: string;
  sessionFee?: number;
  feeCurrency?: string;
  currency?: string;
  paymentStatus?: string;
  status?: string;
  paidAt?: any;
  completedAt?: any;
  cancelledAt?: any;
  meetingLink?: string;
  reminderSent?: boolean;
  reminderSentAt?: any;
  reminderHoursBefore?: number;
};

export default function TherapistBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

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

        const data = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        })) as Booking[];

        data.sort((a, b) => {
          const aDate = new Date(`${a.sessionDate || ""}T${a.sessionTime || "00:00"}`);
          const bDate = new Date(`${b.sessionDate || ""}T${b.sessionTime || "00:00"}`);

          return aDate.getTime() - bDate.getTime();
        });

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
    () =>
      bookings.filter(
        (booking) =>
          booking.status === "confirmed" && booking.paymentStatus === "paid"
      ),
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

  const totalEarningsKes = useMemo(() => {
    return bookings
      .filter(
        (booking) =>
          booking.paymentStatus === "paid" &&
          booking.status === "completed" &&
          (booking.feeCurrency || booking.currency || "KES") === "KES"
      )
      .reduce((sum, booking) => sum + Number(booking.sessionFee || 0), 0);
  }, [bookings]);

  const totalEarningsUsd = useMemo(() => {
    return bookings
      .filter(
        (booking) =>
          booking.paymentStatus === "paid" &&
          booking.status === "completed" &&
          (booking.feeCurrency || booking.currency || "KES") === "USD"
      )
      .reduce((sum, booking) => sum + Number(booking.sessionFee || 0), 0);
  }, [bookings]);

  async function markCompleted(id: string) {
  setActionLoading(id);

  try {
    const response = await fetch("/api/bookings/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to complete session.");
    }

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: "completed",
            }
          : booking
      )
    );
  } catch (error) {
    console.error(error);
    alert("Could not mark session as completed.");
  } finally {
    setActionLoading("");
  }
}

  async function cancelSession(id: string) {
  const confirmed = confirm(
    "Are you sure you want to cancel this session?"
  );

  if (!confirmed) return;

  setActionLoading(id);

  try {
    const response = await fetch("/api/bookings/cancel", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    bookingId: id,
    cancelledBy: "therapist",
  }),
});

if (!response.ok) {
  throw new Error("Failed to cancel booking.");
}

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status: "cancelled",
              meetingLink: "",
            }
          : booking
      )
    );
  } catch (error) {
    console.error(error);
    alert("Could not cancel session.");
  } finally {
    setActionLoading("");
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
            cancellations, meeting links, reminders, and earnings.
          </p>
        </section>

        <section className="my-10 grid gap-4 md:grid-cols-6">
          <SummaryCard title="Pending" value={pendingSessions.length} />
          <SummaryCard title="Upcoming" value={upcomingSessions.length} />
          <SummaryCard title="Completed" value={completedSessions.length} />
          <SummaryCard title="Cancelled" value={cancelledSessions.length} />
          <SummaryCard title="KES Earnings" value={`KES ${totalEarningsKes}`} />
          <SummaryCard title="USD Earnings" value={`USD ${totalEarningsUsd}`} />
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
                  {booking.meetingLink ? (
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-green-700 px-5 py-3 font-bold text-white hover:bg-green-800"
                    >
                      Join Session
                    </a>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-5 py-3 font-bold text-gray-900">
                      Meeting link pending
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={actionLoading === booking.id}
                    onClick={() => markCompleted(booking.id)}
                    className="rounded-full bg-[#0F4C5C] px-5 py-3 font-bold text-white hover:bg-[#0b3945] disabled:opacity-70"
                  >
                    {actionLoading === booking.id
                      ? "Saving..."
                      : "Mark Completed"}
                  </button>

                  <button
                    type="button"
                    disabled={actionLoading === booking.id}
                    onClick={() => cancelSession(booking.id)}
                    className="rounded-full bg-red-700 px-5 py-3 font-bold text-white hover:bg-red-800 disabled:opacity-70"
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
                <p className="mt-4 rounded-2xl bg-green-100 p-4 font-bold text-green-800">
                  Completed
                </p>
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
                <p className="mt-4 rounded-2xl bg-red-100 p-4 font-bold text-red-800">
                  Cancelled
                </p>
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
  const currency = booking.feeCurrency || booking.currency || "KES";

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 text-base font-semibold text-gray-900">
          <p>
            <strong>Client:</strong> {booking.clientAlias || booking.clientName}
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
            <strong>Fee:</strong> {currency} {booking.sessionFee || 0}
          </p>
        </div>

        <div className="space-y-2 text-base font-semibold text-gray-900">
          <p>
            <strong>Payment:</strong> {booking.paymentStatus || "unpaid"}
          </p>

          <p>
            <strong>Status:</strong> {booking.status || "pending"}
          </p>

          <p>
            <strong>Reminder:</strong>{" "}
            {booking.reminderSent ? "Sent" : "Not sent yet"}
          </p>

          <p>
            <strong>Reminder Time:</strong>{" "}
            {booking.reminderHoursBefore || 3} hours before session
          </p>

          <p>
            <strong>Meeting:</strong>{" "}
            {booking.meetingLink ? "Available" : "Pending"}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
}