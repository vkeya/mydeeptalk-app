"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);

      setSuccess(true);
      setMessage(
        "We have sent a secure password reset link to your email. Please check your inbox or spam folder."
      );
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.message || "Could not send password reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] px-6 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#E2954E]">
          Account Recovery
        </p>

        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Reset Your Password
        </h1>

        <p className="mt-4 text-base font-semibold leading-7 text-gray-900">
          Enter the email address linked to your MyDeepTalk account. We will
          send you a secure link to create a new password.
        </p>

        <div className="mt-6 rounded-2xl bg-[#F7F3EC] p-5 text-sm font-semibold leading-6 text-gray-900">
          <p className="font-bold text-[#0F4C5C]">What happens next?</p>
          <p className="mt-2">
            You will receive an email from Firebase/MyDeepTalk. Open the link,
            enter your new password, and then return to login.
          </p>
        </div>

        <form onSubmit={handleReset} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-bold text-[#0F4C5C]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your account email"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900 placeholder:text-gray-600 focus:border-[#0F4C5C] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#0F4C5C] p-4 font-bold text-white transition hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending Reset Link..." : "Send Secure Reset Link"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 rounded-2xl p-4 text-sm font-bold leading-6 ${
              success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-gray-900"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/login" className="font-bold text-[#0F4C5C] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}