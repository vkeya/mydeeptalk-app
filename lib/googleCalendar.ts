import { google } from "googleapis";
import { fromZonedTime } from "date-fns-tz";

type MeetEventInput = {
  clientName: string;
  clientEmail: string;
  therapistName: string;
  therapistEmail: string;
  sessionDate: string;
  sessionTime: string;

  // Optional for backward compatibility
  timeZone?: string;
};

export async function createGoogleMeetEvent({
  clientName,
  clientEmail,
  therapistName,
  therapistEmail,
  sessionDate,
  sessionTime,
  timeZone = "Africa/Nairobi",
}: MeetEventInput) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  const localDateTime = `${sessionDate}T${sessionTime}:00`;

// Convert the therapist's local time into UTC
const startDateTime = fromZonedTime(localDateTime, timeZone);

// Session duration remains 60 minutes
const endDateTime = new Date(
  startDateTime.getTime() + 60 * 60 * 1000
);

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `MyDeepTalk Therapy Session`,

description: `
Welcome to your MyDeepTalk therapy session.

━━━━━━━━━━━━━━━━━━━━━━

Client:
${clientName}

Therapist:
${therapistName}

━━━━━━━━━━━━━━━━━━━━━━

Please join using the Google Meet link attached to this calendar invitation.

If you need to reschedule or cancel your session, please do so through your MyDeepTalk account.

Thank you for choosing MyDeepTalk.
`,
      start: {
  dateTime: startDateTime.toISOString(),
  timeZone,
},
      end: {
  dateTime: endDateTime.toISOString(),
  timeZone,
},
      attendees: [{ email: clientEmail }, { email: therapistEmail }],
      conferenceData: {
        createRequest: {
          requestId: `mydeeptalk-${Date.now()}`,
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  return {
  eventId: event.data.id || "",
  meetingLink: event.data.hangoutLink || "",

  htmlLink: event.data.htmlLink || "",
  status: event.data.status || "",
  organizer: event.data.organizer?.email || "",
  sequence: event.data.sequence ?? 0,
};
}

export async function deleteGoogleCalendarEvent(eventId: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  await calendar.events.delete({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    eventId,
  });
}

