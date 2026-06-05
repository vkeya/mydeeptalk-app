import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    publishable: process.env.INTASEND_PUBLISHABLE_KEY,
    secret: process.env.INTASEND_SECRET_KEY,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { amount, phoneNumber, bookingId } = body;

    if (!amount || !phoneNumber || !bookingId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!process.env.INTASEND_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: "INTASEND_SECRET_KEY is missing in .env.local" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://sandbox.intasend.com/api/v1/payment/mpesa-stk-push/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INTASEND_SECRET_KEY}`,
        },
        body: JSON.stringify({
          amount,
          phone_number: phoneNumber,
          currency: "KES",
          api_ref: bookingId,
          narrative: "MyDeepTalk Therapy Session",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}