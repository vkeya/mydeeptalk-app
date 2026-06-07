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

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooking() {
      try {
        if (!bookingId) {
          setError("Booking ID not found in URL.");
          setLoading(false);
          return;
        }

        const bookingRef = doc(db, "bookings", bookingId);
        const bookingSnap = await getDoc(bookingRef);

        if (bookingSnap.exists()) {
          setBooking({
            id: bookingSnap.id,
            ...bookingSnap.data(),
          });
        } else {
          setError("Booking not found in Firestore.");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error loading booking.");
      }

      setLoading(false);
    }

    fetchBooking();
  }, [bookingId]);

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!booking) {
      alert("Booking not found.");
      return;
    }

    setPaying(true);

    try {
      const response = await fetch("/api/intasend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: booking.sessionFee,
          phoneNumber,
          bookingId,
        }),
      });

      const text = await response.text();
      console.log("IntaSend response:", text);

      const result = JSON.parse(text);

      if (!result.success) {
        console.error(result.error);
        alert("Payment failed. Check console for details.");
        setPaying(false);
        return;
      }

      await addDoc(collection(db, "payments"), {
        bookingId,
        clientId: booking.clientId,
        therapistId: booking.therapistId,
        amount: booking.sessionFee || 0,
        phoneNumber,
        status: "pending",
        provider: "intasend",
        intasendResponse: result.data,
        createdAt: serverTimestamp(),
      });

      alert(
        "STK Push sent successfully. Please check your phone and enter your M-Pesa PIN."
      );

      router.push("/my-bookings");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Payment request failed.");
    }

    setPaying(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-10">
        Loading payment details...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F7F3EC] p-10">
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <h1 className="text-3xl font-bold text-red-600">
            Payment Error
          </h1>

          <p className="mt-4 text-gray-700">{error}</p>

          <p className="mt-4 text-sm text-gray-500">
            Booking ID: {bookingId}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Pay for Session</h1>

          <p className="mt-4 text-white/80">
            Complete payment to confirm your therapy session.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          <div className="rounded-2xl bg-[#F7F3EC] p-6">
            <p className="text-gray-600">Therapist</p>

            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              {booking.therapistName || "Therapist"}
            </h2>

            <p className="mt-4 text-gray-600">Date</p>

            <p className="font-semibold">{booking.sessionDate}</p>

            <p className="mt-4 text-gray-600">Time</p>

            <p className="font-semibold">{booking.sessionTime}</p>

            <p className="mt-4 text-gray-600">Amount</p>

            <p className="text-2xl font-bold text-[#0F4C5C]">
              KES {booking.sessionFee || 0}
            </p>
          </div>

          <form onSubmit={handlePayment} className="mt-8 space-y-5">
            <input
              type="tel"
              placeholder="2547XXXXXXXX"
              className="w-full rounded-2xl border p-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={paying}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945]"
            >
              {paying ? "Sending STK Push..." : "Pay with M-Pesa"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}