import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "NEXT_PUBLIC_BASE_URL is missing.",
        },
        { status: 500 }
      );
    }

    const bookingsQuery = query(
      collection(db, "bookings"),
      where("status", "==", "confirmed"),
      where("paymentStatus", "==", "paid"),
      where("reminderSent", "==", false)
    );

    const bookingsSnap = await getDocs(bookingsQuery);

    const now = new Date();
    let remindersSent = 0;

    for (const bookingDoc of bookingsSnap.docs) {
      const booking = bookingDoc.data();

      if (!booking.sessionDate || !booking.sessionTime) {
        console.log("Missing session date/time:", bookingDoc.id);
        continue;
      }

      if (!booking.clientEmail || !booking.therapistEmail) {
        console.log("Missing emails for reminder:", bookingDoc.id);
        continue;
      }

      const sessionDateTime = new Date(
        `${booking.sessionDate}T${booking.sessionTime}`
      );

      const differenceHours =
        (sessionDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

      if (
        differenceHours <= (booking.reminderHoursBefore || 3) &&
        differenceHours > 0
      ) {
        try {
          const meetingLinkHtml = booking.meetingLink
            ? `
              <p>Meeting link:</p>
              <a href="${booking.meetingLink}">
                Join Session
              </a>
            `
            : `
              <p>Your meeting link is being prepared. Please check your MyDeepTalk dashboard before the session.</p>
            `;

          const clientResponse = await fetch(`${baseUrl}/api/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: booking.clientEmail,
              subject: "Reminder: Your MyDeepTalk session is coming up",
              html: `
                <h2>Hello ${booking.clientName || "there"},</h2>

                <p>This is a reminder that your session with
                <strong>${booking.therapistName || "your therapist"}</strong>
                starts at <strong>${booking.sessionTime}</strong>
                on <strong>${booking.sessionDate}</strong>.</p>

                ${meetingLinkHtml}

                <p>Warm regards,<br/>MyDeepTalk</p>
              `,
            }),
          });

          const therapistResponse = await fetch(`${baseUrl}/api/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: booking.therapistEmail,
              subject: "Reminder: Upcoming MyDeepTalk session",
              html: `
                <h2>Hello ${booking.therapistName || "there"},</h2>

                <p>This is a reminder that your session with
                <strong>${booking.clientName || "your client"}</strong>
                begins at <strong>${booking.sessionTime}</strong>
                on <strong>${booking.sessionDate}</strong>.</p>

                ${meetingLinkHtml}

                <p>Thank you for supporting healing through MyDeepTalk.</p>
              `,
            }),
          });

          if (!clientResponse.ok || !therapistResponse.ok) {
            console.error("Reminder email failed:", {
              bookingId: bookingDoc.id,
              clientStatus: clientResponse.status,
              therapistStatus: therapistResponse.status,
            });

            continue;
          }

          await updateDoc(doc(db, "bookings", bookingDoc.id), {
            reminderSent: true,
            reminderSentAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });

          remindersSent += 1;
          console.log("Reminder sent:", bookingDoc.id);
        } catch (error) {
          console.error(
            "Failed sending reminder for booking:",
            bookingDoc.id,
            error
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      checkedBookings: bookingsSnap.size,
      remindersSent,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Reminder job failed.",
      },
      {
        status: 500,
      }
    );
  }
}