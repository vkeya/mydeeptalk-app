import { EmailLayout } from "./components";
import { EmailButton } from "./components";

interface BookingConfirmedEmailProps {
  clientName: string;
  therapistName: string;
  sessionDate: string;
  sessionTime: string;
  meetingLink: string;
}

export function BookingConfirmedEmail({
  clientName,
  therapistName,
  sessionDate,
  sessionTime,
  meetingLink,
}: BookingConfirmedEmailProps): string {
  const content = `
<h1
style="
color:#0F4C5C;
font-size:30px;
margin-bottom:24px;
"
>
Your Therapy Session is Confirmed 💙
</h1>

<p style="font-size:17px;line-height:1.8;">
Hello <strong>${clientName}</strong>,
</p>

<p style="font-size:17px;line-height:1.8;">
Your payment has been received and your therapy session has now been confirmed.
</p>

<div
style="
background:#F7F3EC;
padding:24px;
border-radius:18px;
margin:30px 0;
"
>

<p><strong>Therapist</strong><br>${therapistName}</p>

<p><strong>Date</strong><br>${sessionDate}</p>

<p><strong>Time</strong><br>${sessionTime}</p>

</div>

${EmailButton({
  label: "Join Google Meet",
  href: meetingLink,
})}

<p style="margin-top:35px;font-size:16px;line-height:1.8;">

Please join your session about
<strong>5 minutes early</strong>.

Find a quiet place where you feel comfortable,
have a stable internet connection,
and consider using headphones for the best experience.

</p>

<p style="margin-top:35px;">
We look forward to walking alongside you on your healing journey.
</p>

<p>

Warm regards,

<br><br>

<strong>The MyDeepTalk Team</strong>

</p>
`;

  return EmailLayout({
    previewText:
      "Your therapy session has been confirmed.",
    content,
  });
}