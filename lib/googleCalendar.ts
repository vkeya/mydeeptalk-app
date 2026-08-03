import { google } from "googleapis";

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

  const startDateTime = new Date(`${sessionDate}T${sessionTime}:00+03:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `MyDeepTalk Session: ${clientName} with ${therapistName}`,
      description: "Welcome to your MyDeepTalk Therapy Session",
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
  };
}

export async function deleteGoogleCalendarEvent(eventId: string) {
  if (!eventId) return;

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