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
      payload?.ref;

    const paymentState =
      payload?.state ||
      payload?.invoice?.state ||
      payload?.status;

    console.log("Booking ID:", bookingId);
    console.log("Payment State:", paymentState);

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

    await updateDoc(bookingRef, {
      paymentStatus: "paid",
      status: "confirmed",
      paidAt: new Date().toISOString(),
    });

    const paymentQuery = query(
      collection(db, "payments"),
      where("bookingId", "==", bookingId)
    );

    const paymentSnapshot = await getDocs(paymentQuery);

    for (const paymentDoc of paymentSnapshot.docs) {
      await updateDoc(doc(db, "payments", paymentDoc.id), {
        status: "completed",
        paidAt: new Date().toISOString(),
        mpesaReceiptNumber:
          payload?.invoice?.mpesa_reference ||
          payload?.invoice?.provider_ref ||
          payload?.trans_id ||
          "",
      });
    }

    console.log("Starting Google Meet generation...");

    try {
      const bookingSnap = await getDoc(bookingRef);

      if (!bookingSnap.exists()) {
        console.log("Booking not found for Meet generation:", bookingId);
      } else {
        const booking = bookingSnap.data();

        console.log("Booking data for Meet:", booking);

        if (booking.clientEmail && booking.therapistEmail) {
          const meetEvent = await createGoogleMeetEvent({
            clientName: booking.clientName || "Client",
            clientEmail: booking.clientEmail,
            therapistName: booking.therapistName || "Therapist",
            therapistEmail: booking.therapistEmail,
            sessionDate: booking.sessionDate,
            sessionTime: booking.sessionTime,
          });

          console.log("Google Meet Event Result:", meetEvent);

          await updateDoc(bookingRef, {
            meetingLink: meetEvent.meetingLink || "",
            googleEventId: meetEvent.eventId || "",
          });
        } else {
          console.log("Missing clientEmail or therapistEmail for Meet generation");
        }
      }
    } catch (meetError) {
      console.error("Google Meet generation failed:", meetError);
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
        error: error.message,
      },
      { status: 500 }
    );
  }
}