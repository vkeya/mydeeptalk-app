"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);

      setMessage(
        "Password reset email sent. Please check your inbox."
      );
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F7F3EC] flex items-center justify-center p-8">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="text-3xl font-bold text-[#0F4C5C]">
          Forgot Password
        </h1>

        <p className="mt-4 text-gray-600">
          Enter your email address and we'll send you a reset link.
        </p>

        <form
          onSubmit={handleReset}
          className="mt-8 space-y-5"
        >

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-xl border p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0F4C5C] p-4 text-white"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <div className="mt-6 rounded-xl bg-gray-100 p-4 text-sm">
            {message}
          </div>
        )}

      </div>

    </main>
  );
}