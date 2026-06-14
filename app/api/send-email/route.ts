import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, html } = body;

    console.log("SEND EMAIL BODY:", { to, subject, hasHtml: !!html });
    console.log("RESEND FROM:", process.env.RESEND_FROM_EMAIL);
    console.log("HAS RESEND KEY:", !!process.env.RESEND_API_KEY);

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing email fields: to, subject, html are required." },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "MyDeepTalk <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("RESEND RESULT:", result);

    if (result.error) {
      console.error("RESEND ERROR:", result.error);

      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error: any) {
    console.error("SEND EMAIL CATCH ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Email failed.",
        fullError: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}