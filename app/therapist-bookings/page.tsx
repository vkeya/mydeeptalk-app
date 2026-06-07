"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

type Booking = {
  id: string;
  clientId?: string;
  therapistId?: string;
  clientName?: string;
  clientEmail?: string;
  therapistName?: string;
  therapistEmail?: string;
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
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("therapistId", "==", user.uid)
        );

        const snapshot = await getDocs(bookingsQuery);

        const bookingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Booking[];

        bookingList.sort((a, b) => {
          const dateA = `${a.sessionDate || ""} ${a.sessionTime || ""}`;
          const dateB = `${b.sessionDate || ""} ${b.sessionTime || ""}`;
          return dateA.localeCompare(dateB);
        });

        setBookings(bookingList);
      } catch (error) {
        console.error("Error fetching therapist bookings:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <p>Loading therapist bookings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Therapist Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-gray-600">
              No client bookings found yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-lg bg-white p-5 shadow"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {booking.clientName || "Client"}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status === "confirmed"
                      ? "Confirmed"
                      : "Pending"}
                  </span>
                </div>

                <div className="grid gap-3 text-sm text-gray-700 md:grid-cols-2">
                  <p>
                    <strong>Client Email:</strong>{" "}
                    {booking.clientEmail || "Not available"}
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
                    <strong>Fee:</strong> KES{" "}
                    {booking.sessionFee || 0}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    <span
                      className={
                        booking.paymentStatus === "paid"
                          ? "font-semibold text-green-700"
                          : "font-semibold text-red-600"
                      }
                    >
                      {booking.paymentStatus === "paid"
                        ? "Paid"
                        : "Unpaid"}
                    </span>
                  </p>

                  <p>
                    <strong>Paid At:</strong>{" "}
                    {booking.paidAt
                      ? new Date(booking.paidAt).toLocaleString()
                      : "Not paid yet"}
                  </p>
                </div>

                <div className="mt-4 border-t pt-4">
                  {booking.meetingLink ? (
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Join Session
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Meeting link will be shared after confirmation.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}