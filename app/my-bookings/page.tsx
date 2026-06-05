"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const clientQuery = query(
          collection(db, "bookings"),
          where("clientId", "==", user.uid)
        );

        const therapistQuery = query(
          collection(db, "bookings"),
          where("therapistId", "==", user.uid)
        );

        const clientSnapshot = await getDocs(clientQuery);
        const therapistSnapshot = await getDocs(therapistQuery);

        const list: any[] = [];

        clientSnapshot.forEach((docItem) => {
          list.push({
            id: docItem.id,
            ...docItem.data(),
            viewType: "client",
          });
        });

        therapistSnapshot.forEach((docItem) => {
          list.push({
            id: docItem.id,
            ...docItem.data(),
            viewType: "therapist",
          });
        });

        setBookings(list);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#0F4C5C]">
            My Bookings
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your therapy sessions.
          </p>
        </div>

        {bookings.length === 0 && (
          <div className="rounded-3xl bg-white p-10 shadow-lg">
            No bookings yet.
          </div>
        )}

        <div className="space-y-6">

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >

              <div className="flex flex-col gap-6 md:flex-row md:justify-between">

                <div className="space-y-3">

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.sessionDate}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.sessionTime}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="font-semibold text-[#0F4C5C]">
                      {booking.status}
                    </span>
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    <span
                      className={
                        booking.paymentStatus === "paid"
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {booking.paymentStatus}
                    </span>
                  </p>

                  <p>
                    <strong>Viewing As:</strong>{" "}
                    {booking.viewType}
                  </p>

                </div>

                <div className="flex flex-col gap-4">

                  {booking.paymentStatus === "unpaid" &&
                    booking.viewType === "client" && (
                      <Link
                        href={`/payment/${booking.id}`}
                        className="rounded-full bg-[#0F4C5C] px-6 py-3 text-center font-semibold text-white hover:bg-[#0b3945]"
                      >
                        Pay Now
                      </Link>
                    )}

                  {booking.meetingLink && (
                    <a
                      href={booking.meetingLink}
                      target="_blank"
                      className="rounded-full bg-green-600 px-6 py-3 text-center font-semibold text-white"
                    >
                      Join Session
                    </a>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}