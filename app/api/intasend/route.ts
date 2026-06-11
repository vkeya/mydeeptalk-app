import { NextResponse } from "next/server";

function formatMpesaPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("254") && cleaned.length === 12) {
    return cleaned;
  }

  if (cleaned.startsWith("07") && cleaned.length === 10) {
    return `254${cleaned.slice(1)}`;
  }

  if (cleaned.startsWith("7") && cleaned.length === 9) {
    return `254${cleaned}`;
  }

  return cleaned;
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

    const secretKey = process.env.INTASEND_SECRET_KEY;
    const useSandbox = process.env.INTASEND_TEST === "true";

    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: "INTASEND_SECRET_KEY is missing." },
        { status: 500 }
      );
    }

    const formattedPhoneNumber = formatMpesaPhoneNumber(phoneNumber);

    if (!formattedPhoneNumber.startsWith("254") || formattedPhoneNumber.length !== 12) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid phone number. Use format 2547XXXXXXXX.",
        },
        { status: 400 }
      );
    }

    const baseUrl = useSandbox
      ? "https://sandbox.intasend.com"
      : "https://payment.intasend.com";

    const response = await fetch(
      `${baseUrl}/api/v1/payment/mpesa-stk-push/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          phone_number: formattedPhoneNumber,
          currency: "KES",
          api_ref: bookingId,
          narrative: "MyDeepTalk Therapy Session",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("IntaSend STK error:", data);

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
    console.error("IntaSend route error:", error);

    return NextResponse.json(
      { success: false, error: error.message || "Payment request failed." },
      { status: 500 }
    );
  }
}