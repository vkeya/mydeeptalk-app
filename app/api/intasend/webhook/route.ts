
import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createGoogleMeetEvent } from "../../../../lib/googleCalendar";

export async function GET() {
  return new Response("OK", { status: 200 });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("IntaSend Webhook:", payload);

    const bookingId = payload.api_ref || payload.invoice?.api_ref;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: "Missing bookingId" },
        { status: 400 }
      );
    }

    const bookingRef = doc(db, "bookings", bookingId);

    // STEP 1: Mark payment as successful immediately
    await updateDoc(bookingRef, {
      paymentStatus: "paid",
      status: "confirmed",
    });

    // STEP 2: Update payments collection
    const paymentQuery = query(
      collection(db, "payments"),
      where("bookingId", "==", bookingId)
    );

    const paymentSnapshot = await getDocs(paymentQuery);

    for (const paymentDoc of paymentSnapshot.docs) {
      await updateDoc(doc(db, "payments", paymentDoc.id), {
        status: "completed",
        mpesaReceiptNumber:
          payload.invoice?.mpesa_reference || "",
      });
    }

    // STEP 3: Try Google Meet generation separately
    try {
      const bookingSnap = await getDoc(bookingRef);

      if (bookingSnap.exists()) {
        const booking = bookingSnap.data();

        if (
          booking.clientEmail &&
          booking.therapistEmail
        ) {
          const meetEvent = await createGoogleMeetEvent({
            clientName: booking.clientName || "Client",
            clientEmail: booking.clientEmail,
            therapistName: booking.therapistName,
            therapistEmail: booking.therapistEmail,
            sessionDate: booking.sessionDate,
            sessionTime: booking.sessionTime,
          });

          await updateDoc(bookingRef, {
            meetingLink: meetEvent.meetingLink || "",
            googleEventId: meetEvent.eventId || "",
          });
        }
      }
    } catch (meetError) {
      console.error(
        "Google Meet generation failed:",
        meetError
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

