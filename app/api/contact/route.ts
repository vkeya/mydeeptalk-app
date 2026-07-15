import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { ContactConfirmationEmail } from "@/emails";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "MyDeepTalk <noreply@send.mydeeptalk.com>",

      to: "info@mydeeptalk.com",

      replyTo: email,

      subject: `Contact Form: ${subject}`,

      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <hr>

        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
      
	await resend.emails.send({
  from:
    process.env.RESEND_FROM_EMAIL ||
    "MyDeepTalk <noreply@send.mydeeptalk.com>",

  to: email,

  subject: "We've received your message",

  html: ContactConfirmationEmail({
    name,
  }),
});  

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}