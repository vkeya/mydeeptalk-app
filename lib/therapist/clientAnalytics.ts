export type Booking = {
  id: string;

  clientId?: string;
  clientName?: string;
  clientAlias?: string;
  clientEmail?: string;

  therapistId?: string;

  sessionDate?: string;
  sessionTime?: string;

  status?: string;
};

export type TherapistClient = {
  clientId: string;

  clientName: string;

  clientAlias?: string;

  clientEmail?: string;

  totalSessions: number;

  completedSessions: number;

  upcomingSessions: number;

  cancelledSessions: number;

  lastSession?: string;

  nextSession?: string;

  status: "active" | "inactive";
};

export function buildTherapistClients(
  bookings: Booking[]
): TherapistClient[] {
  const map = new Map<string, TherapistClient>();

  bookings.forEach((booking) => {
    const clientId = booking.clientId;

    if (!clientId) return;

    const sessionDateTime = new Date(
      `${booking.sessionDate ?? ""}T${booking.sessionTime ?? "00:00"}`
    );

    if (!map.has(clientId)) {
      map.set(clientId, {
        clientId,

        clientName: booking.clientName || "Unknown",

        clientAlias: booking.clientAlias,

        clientEmail: booking.clientEmail,

        totalSessions: 0,

        completedSessions: 0,

        upcomingSessions: 0,

        cancelledSessions: 0,

        status: "inactive",
      });
    }

    const client = map.get(clientId)!;

    client.totalSessions++;

    switch (booking.status) {
      case "completed":
        client.completedSessions++;

        if (
          booking.sessionDate &&
          (!client.lastSession ||
            booking.sessionDate > client.lastSession)
        ) {
          client.lastSession = booking.sessionDate;
        }

        break;

      case "confirmed":
        client.upcomingSessions++;

        if (
          booking.sessionDate &&
          (!client.nextSession ||
            booking.sessionDate < client.nextSession)
        ) {
          client.nextSession = booking.sessionDate;
        }

        break;

      case "cancelled":
        client.cancelledSessions++;
        break;
    }

    client.status =
      client.upcomingSessions > 0
        ? "active"
        : "inactive";
  });

  return Array.from(map.values()).sort((a, b) =>
    a.clientName.localeCompare(b.clientName)
  );
}
