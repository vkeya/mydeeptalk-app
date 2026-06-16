"use client";

import Link from "next/link";
import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleResendEmail() {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      const user = auth.currentUser;

      if (!user) {
        setError(
          "Your session has expired. Please log in again to resend the verification email."
        );
        return;
      }

      await sendEmailVerification(user);

      setMessage(
        "Verification email sent successfully. Please check your inbox or spam folder."
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Could not resend verification email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] p-8">
      <div className="max-w-xl rounded-3xl bg-white p-12 text-center shadow-xl">
        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Verify Your Email
        </h1>

        <p className="mt-6 leading-8 text-gray-600">
          We have sent a verification email to your inbox. Please verify your
          email address before logging in.
        </p>

        {message && (
          <p className="mt-6 font-semibold text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-6 font-semibold text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={handleResendEmail}
          disabled={loading}
          className="mt-8 w-full rounded-full bg-[#2C7A7B] px-8 py-4 font-semibold text-white hover:bg-[#246767] disabled:opacity-60"
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-[#0F4C5C] px-8 py-4 text-white"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}