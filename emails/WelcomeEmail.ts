import { EmailLayout } from "./components";

interface WelcomeEmailProps {
  fullName: string;
}

export function WelcomeEmail({
  fullName,
}: WelcomeEmailProps): string {
  const content = `
<h1
style="
color:#0F4C5C;
font-size:32px;
margin:0 0 24px 0;
font-weight:700;
"
>
Welcome to MyDeepTalk 💙
</h1>

<p
style="
font-size:18px;
line-height:1.8;
color:#374151;
margin-bottom:24px;
"
>
Hello <strong>${fullName}</strong>,
</p>

<p
style="
font-size:17px;
line-height:1.9;
color:#374151;
margin-bottom:24px;
"
>
Every meaningful journey begins with a single honest step.
Today, you've taken yours.
</p>

<p
style="
font-size:17px;
line-height:1.9;
color:#374151;
margin-bottom:24px;
"
>
MyDeepTalk is your private space to reflect, understand your emotions,
heal from life's challenges and grow into the person you are becoming.
Whether you're seeking clarity, healing, or simply a safe place to think,
we're honoured to walk alongside you.
</p>

<div
style="
background:#F7F3EC;
padding:28px;
border-radius:18px;
margin:40px 0;
"
>

<h2
style="
margin-top:0;
color:#0F4C5C;
font-size:22px;
"
>
Here's what awaits you
</h2>

<p style="margin:12px 0;font-size:16px;">
✨ Guided self-discovery journeys
</p>

<p style="margin:12px 0;font-size:16px;">
📝 Private reflection journal
</p>

<p style="margin:12px 0;font-size:16px;">
🤖 AI-guided conversations
</p>

<p style="margin:12px 0;font-size:16px;">
👩🏽‍⚕️ Connect with licensed therapists
</p>

</div>

<p
style="
font-size:17px;
line-height:1.9;
color:#374151;
"
>
Before you begin,
please check your inbox for your verification email
and activate your account.
</p>

<p
style="
margin-top:36px;
font-size:17px;
line-height:1.8;
"
>

With warmth,

<br><br>

<strong>The MyDeepTalk Team</strong>

</p>
`;

  return EmailLayout({
    previewText:
      "Your journey toward healing, self-discovery and emotional wellness begins today.",
    content,
  });
}