export function bookingConfirmationEmail(
  clientName: string,
  therapistName: string,
  date: string,
  time: string
) {
  return `
  <div style="font-family:Arial,sans-serif;background:#F7F3EC;padding:30px">
    <div style="max-width:600px;margin:auto;background:white;padding:40px;border-radius:20px">

      <h1 style="color:#0F4C5C;">
        Session Request Received 💙
      </h1>

      <p>Hello ${clientName},</p>

      <p>
        Your therapy session request has been received.
      </p>

      <div style="background:#F7F3EC;padding:20px;border-radius:15px">
        <p><strong>Therapist:</strong> ${therapistName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      </div>

      <p style="margin-top:30px">
        Once payment is completed, your session will be confirmed and you'll receive your Google Meet link.
      </p>

      <p>
        Warm regards,<br/>
        <strong>MyDeepTalk Team</strong>
      </p>

    </div>
  </div>
  `;
}