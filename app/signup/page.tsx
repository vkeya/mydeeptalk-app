"use client";

import { useState } from "react";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        role,
        emailVerified: false,
        createdAt: serverTimestamp(),
      });

      setMessage(
        "Account created successfully. Please check your email and verify your account before logging in."
      );
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Create Account
        </h1>

        <p className="mt-3 text-gray-600">
          Start your MyDeepTalk journey today.
        </p>

        {message && (
          <div className="mt-6 rounded-xl bg-gray-100 p-4 text-sm text-gray-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border p-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="w-full rounded-xl border p-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Client</option>
            <option value="therapist">Therapist</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945]"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#0F4C5C]">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}