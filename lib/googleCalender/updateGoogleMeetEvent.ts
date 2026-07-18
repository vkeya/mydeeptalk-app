import { google } from "googleapis";

type UpdateMeetEventInput = {
  eventId: string;
  sessionDate: string;
  sessionTime: string;
  timeZone: string;
  sessionDuration?: number;
};

export async function updateGoogleMeetEvent({
  eventId,
}: UpdateMeetEventInput) {
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

  // Placeholder implementation.
  // The update logic will be added in the next milestone.
  return calendar.events.get({
    calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
    eventId,
  });
}