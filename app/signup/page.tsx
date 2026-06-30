"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { welcomeEmailTemplate } from "@/lib/emailTemplates";
import { ArrowLeft } from "lucide-react";
import { IMAGES } from "@/lib/images";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!acceptedLegal) {
      setError("Please accept the Terms and Conditions and Privacy Policy to continue.");
      return;
    }
    if (role === "client" && !alias.trim()) {
      setError("Please choose a privacy name / alias.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Welcome to MyDeepTalk 💙",
          html: welcomeEmailTemplate(fullName),
        }),
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        ...(role === "client" && { alias: alias.trim() }),
        email,
        role,
        provider: "email",
        emailVerified: false,
        ageConfirmed18: true,
        termsAccepted: true,
        privacyAccepted: true,
        legalAccepted: true,
        legalAcceptedAt: serverTimestamp(),
        termsVersion: "2026-06",
        privacyVersion: "2026-06",
        createdAt: serverTimestamp(),
      });
      router.push("/verify-email");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — image panel */}
      <div className="relative hidden lg:block lg:w-[52%]">
        <Image
          src={IMAGES.journeyConnect}
          alt="Connect, reflect and grow with MyDeepTalk"
          fill
          className="object-cover"
          priority
          sizes="52vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/85 via-[#0F4C5C]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Emotional Wellness
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-snug text-[#E2954E]">
            Begin with awareness.<br />Grow through honest reflection.
          </h2>
          <p className="mt-3 max-w-sm leading-7 text-white">
            Join thousands of people already building healthier emotional lives,
            one reflection at a time.
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-white px-6 py-8 lg:px-14">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#0F4C5C]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Image
            src="/images/logo.png"
            alt="MyDeepTalk"
            width={140}
            height={48}
            priority
            className="h-auto w-28 object-contain md:w-32"
          />
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-sm py-10">
          <h1 className="text-3xl font-bold text-[#0F4C5C]">Create your account</h1>
          <p className="mt-2 leading-7 text-gray-500">
            Begin your self-discovery journey with MyDeepTalk.
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
              />
            </div>

            {role === "client" && (
              <div>
                <label className="mb-1.5 block text-sm font-bold text-gray-700">
                  Privacy Name
                </label>
                <input
                  type="text"
                  placeholder="Name shown to therapists instead of your real name"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
                />
                <p className="mt-1.5 text-xs font-semibold text-gray-400">
                  This keeps your real identity private.
                </p>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-gray-700">
                I am joining as
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
              >
                <option value="client">Client — I am seeking support</option>
                <option value="therapist">Therapist — I offer support</option>
              </select>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#F7F3EC] px-4 py-3.5 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={acceptedLegal}
                onChange={(e) => setAcceptedLegal(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/legal/terms-and-conditions.pdf"
                  target="_blank"
                  className="font-bold text-[#0F4C5C] underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/legal/privacy-policy.pdf"
                  target="_blank"
                  className="font-bold text-[#0F4C5C] underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !acceptedLegal}
              className="w-full rounded-full bg-[#0F4C5C] py-3.5 font-bold text-white transition hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-semibold text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#0F4C5C] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
