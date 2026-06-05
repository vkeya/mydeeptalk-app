export async function createGoogleMeetEvent({
  clientName,
  clientEmail,
  therapistName,
  therapistEmail,
  sessionDate,
  sessionTime,
}: {
  clientName: string;
  clientEmail: string;
  therapistName: string;
  therapistEmail: string;
  sessionDate: string;
  sessionTime: string;
}) {
  console.log("Google Meet placeholder:", {
    clientName,
    clientEmail,
    therapistName,
    therapistEmail,
    sessionDate,
    sessionTime,
  });

  return {
    eventId: "",
    meetingLink: "",
  };
}