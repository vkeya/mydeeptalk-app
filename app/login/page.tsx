"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setMessage("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: user.displayName || "Google User",
          email: user.email,
          role: "client",
          provider: "google",
          createdAt: serverTimestamp(),
        });
      }

      router.push("/dashboard");
    } catch (error: any) {
      setMessage(error.message);
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EC] p-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-[#0F4C5C]">Welcome Back</h1>

        <p className="mt-3 text-gray-600">
          Login to continue your MyDeepTalk journey.
        </p>

        {message && (
          <div className="mt-6 rounded-xl bg-red-100 p-4 text-sm text-red-700">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500 focus:border-[#0F4C5C] focus:outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 placeholder:text-gray-500 focus:border-[#0F4C5C] focus:outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-[#0F4C5C] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full rounded-xl border border-[#0F4C5C] p-4 font-semibold text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
          >
            Continue with Google
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-semibold text-[#0F4C5C]">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}