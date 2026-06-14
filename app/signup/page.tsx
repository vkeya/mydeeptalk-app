"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { welcomeEmailTemplate } from "@/lib/emailTemplates";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alias, setAlias] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
	
	if (!acceptedLegal) {
      setError("Please accept the Terms and Conditions and Privacy Policy to continue.");
      return;
    }
	
	if (!alias.trim()) {
    setError("Please choose a privacy name / alias.");
    return;
    }

    try {
      setLoading(true);
      setError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
	  
	  await sendEmailVerification(user);
	  
	  await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Welcome to MyDeepTalk 💙",
          html: welcomeEmailTemplate(fullName),
        }),
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
		alias: alias.trim(),
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
    <main className="min-h-screen bg-[#F7F3EC] px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-center text-4xl font-bold text-[#0F4C5C]">
          Create Your Account
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Begin your self-discovery journey with MyDeepTalk.
        </p>

        <form
          onSubmit={handleSignup}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="mb-2 block font-semibold">
              Full Name
            </label>

            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <input
            type="text"
            placeholder="Privacy name / alias shown to therapists"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 bg-white p-4 font-semibold text-gray-900"
            required
          />

          <p className="text-sm font-semibold text-gray-700">
             This is the name therapists will see instead of your real name.
          </p>

          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border p-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              I am joining as
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-2xl border p-4"
            >
              <option value="client">Client</option>
              <option value="therapist">Therapist</option>
            </select>
          </div>
		  
		  <label className="flex items-start gap-3 rounded-2xl bg-[#F7F3EC] p-4 text-sm font-semibold leading-6 text-gray-900">
  <input
    type="checkbox"
    checked={acceptedLegal}
    onChange={(e) => setAcceptedLegal(e.target.checked)}
    className="mt-1"
  />

  <span>
    I have read and agree to the{" "}
    <Link
      href="/legal/terms-and-conditions.pdf"
      target="_blank"
      className="font-bold text-[#0F4C5C] underline"
    >
      Terms and Conditions
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

          {error && (
            <p className="text-red-600">
              {error}
            </p>
          )}

          <button
            disabled={loading || !acceptedLegal}
            className="w-full rounded-full bg-[#0F4C5C] py-4 font-semibold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#0F4C5C]"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}