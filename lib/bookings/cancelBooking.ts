import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { deleteGoogleCalendarEvent } from "@/lib/googleCalendar";

export type CancelBookingInput = {
  bookingId: string;
  cancelledBy: "client" | "therapist" | "admin";
  cancellationReason?: string;
};

export async function cancelBooking({
  bookingId,
  cancelledBy,
  cancellationReason = "",
}: CancelBookingInput) {
  const bookingRef = doc(db, "bookings", bookingId);

  const bookingSnap = await getDoc(bookingRef);

  if (!bookingSnap.exists()) {
    throw new Error("Booking not found.");
  }

  const booking = bookingSnap.data();

  // Delete Google Calendar event if it exists
  if (booking.googleEventId) {
    try {
      await deleteGoogleCalendarEvent(booking.googleEventId);
    } catch (error) {
      console.error("Failed to delete Google Calendar event:", error);
    }
  }

  await updateDoc(bookingRef, {
    status: "cancelled",

    cancelledBy,
    cancellationReason,

    cancelledAt: serverTimestamp(),
    updatedAt: serverTimestamp(),

    meetingLink: "",
    googleEventId: "",
    googleCalendarLink: "",

    calendarStatus: "cancelled",
    calendarUpdatedAt: serverTimestamp(),
  });

  return {
    success: true,
  };
}