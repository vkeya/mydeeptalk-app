import { EmailLayout } from "./components";

interface ContactConfirmationEmailProps {
  name: string;
}

export function ContactConfirmationEmail({
  name,
}: ContactConfirmationEmailProps): string {
  const content = `
<h1
style="
color:#0F4C5C;
font-size:30px;
margin-bottom:24px;
"
>
We've received your message 💙
</h1>

<p style="font-size:17px;line-height:1.8;">
Hello <strong>${name}</strong>,
</p>

<p style="font-size:17px;line-height:1.8;">
Thank you for contacting MyDeepTalk.
We've received your message and a member of our team will respond as soon as possible.
</p>

<div
style="
background:#F7F3EC;
padding:24px;
border-radius:18px;
margin:30px 0;
"
>

<p style="margin:0;">
While you're waiting, you can continue exploring MyDeepTalk:
</p>

<ul style="margin-top:15px;line-height:2;">
<li>Guided Self-Discovery Journeys</li>
<li>AI Reflection Conversations</li>
<li>Private Journaling</li>
<li>Book Sessions with Verified Therapists</li>
</ul>

</div>

<p style="font-size:16px;line-height:1.8;">
Thank you for being part of the MyDeepTalk community.
</p>

<p>
Warm regards,
<br><br>
<strong>The MyDeepTalk Team</strong>
</p>
`;

  return EmailLayout({
    previewText:
      "We've received your message and will be in touch soon.",
    content,
  });
}