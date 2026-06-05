"use client";

import Link from "next/link";

export default function VerifyEmailPage() {
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

        <Link
          href="/login"
          className="mt-10 inline-block rounded-full bg-[#0F4C5C] px-8 py-4 text-white"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}