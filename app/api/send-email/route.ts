```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { to, subject, message } = body;

    const data = await resend.emails.send({
      from: "MyDeepTalk <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <div>
          <h2>MyDeepTalk</h2>

          <p>${message}</p>

          <hr />

          <p>
            Supporting emotional wellness, healing and meaningful connection.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
```
