import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createGoogleMeetEvent } from "@/lib/googleCalendar";

export async function GET() {
  return new Response("OK", { status: 200 });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log("IntaSend Webhook Payload:", JSON.stringify(payload, null, 2));

    const bookingId =
      payload?.api_ref ||
      payload?.invoice?.api_ref ||
      payload?.ref ||
      payload?.tracking_id;

    const paymentState =
      payload?.state ||
      payload?.invoice?.state ||
      payload?.status;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: "Missing bookingId/api_ref" },
        { status: 400 }
      );
    }

    if (paymentState !== "COMPLETE") {
      return NextResponse.json({
        success: true,
        message: "Payment not complete yet",
        paymentState,
      });
    }

    const bookingRef = doc(db, "bookings", bookingId);
    const bookingSnap = await getDoc(bookingRef);

    if (!bookingSnap.exists()) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    const booking = bookingSnap.data();

    await updateDoc(bookingRef, {
      paymentStatus: "paid",
      status: "confirmed",
      paidAt: serverTimestamp(),

      reminderSent: false,
      reminderSentAt: null,
      reminderHoursBefore: booking.reminderHoursBefore || 3,

      updatedAt: serverTimestamp(),
    });

    const paymentQuery = query(
      collection(db, "payments"),
      where("bookingId", "==", bookingId)
    );

    const paymentSnapshot = await getDocs(paymentQuery);

    for (const paymentDoc of paymentSnapshot.docs) {
      await updateDoc(doc(db, "payments", paymentDoc.id), {
        status: "completed",
        paidAt: serverTimestamp(),
        mpesaReceiptNumber:
          payload?.invoice?.mpesa_reference ||
          payload?.invoice?.provider_ref ||
          payload?.trans_id ||
          payload?.tracking_id ||
          "",
        webhookPayload: payload,
        updatedAt: serverTimestamp(),
      });
    }

    try {
      if (booking.clientEmail && booking.therapistEmail) {
        const meetEvent = await createGoogleMeetEvent({
          clientName: booking.clientName || "Client",
          clientEmail: booking.clientEmail,
          therapistName: booking.therapistName || "Therapist",
          therapistEmail: booking.therapistEmail,
          sessionDate: booking.sessionDate,
          sessionTime: booking.sessionTime,
          
        });

        await updateDoc(bookingRef, {
          meetingLink: meetEvent.meetingLink || "",
          googleEventId: meetEvent.eventId || "",
          calendarCreatedAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        console.log("Missing clientEmail or therapistEmail for Meet generation");
      }
    } catch (meetError) {
      console.error("Google Meet generation failed:", meetError);

      await updateDoc(bookingRef, {
        calendarError: "Google Meet generation failed",
        updatedAt: serverTimestamp(),
      });
    }

    return NextResponse.json({
      success: true,
      bookingId,
      paymentState,
    });
  } catch (error: any) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Webhook failed",
      },
      { status: 500 }
    );
  }
}