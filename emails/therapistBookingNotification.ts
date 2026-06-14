export function therapistBookingNotification(
  therapistName: string,
  clientAlias: string,
  date: string,
  time: string
) {
  return `
  <div style="font-family:Arial,sans-serif;background:#F7F3EC;padding:30px">
    <div style="max-width:600px;margin:auto;background:white;padding:40px;border-radius:20px">

      <h1 style="color:#0F4C5C;">
        New Session Request
      </h1>

      <p>Hello ${therapistName},</p>

      <p>You have received a new booking request.</p>

      <div style="background:#F7F3EC;padding:20px;border-radius:15px">
        <p><strong>Client:</strong> ${clientAlias}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      </div>

      <p>
        Warm regards,<br/>
        <strong>MyDeepTalk Team</strong>
      </p>

    </div>
  </div>
  `;
}