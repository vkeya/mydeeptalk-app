"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { welcomeEmailTemplate } from "@/lib/emailTemplates";
import { ArrowLeft } from "lucide-react";
import { IMAGES } from "@/lib/images";
import {
  getOnboardingData,
  clearOnboardingData,
} from "@/lib/onboarding/onboardingStorage";

function getPasswordChecks(password: string) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

function getSignupErrorMessage(code: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Please choose a stronger password.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes before trying again.";
	  
	case "auth/account-exists-with-different-credential":
      return "An account already exists with this email. Please sign in using your original method.";

    default:
      return "We couldn't create your account. Please try again.";
  }
}

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  
  const [email, setEmail] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordChecks = getPasswordChecks(password);

  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
   
	
	if (password !== confirmPassword) {
  setError("Passwords do not match.");
  return;
}

if (!passwordValid) {
  setError("Please create a stronger password.");
  return;
}

    try {
      setLoading(true);
      setError("");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
	  const onboarding = getOnboardingData();
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

  onboardingCompleted: true,
  onboarding: {
    ...onboarding,
    completedAt: serverTimestamp(),
  },

  createdAt: serverTimestamp(),
});
clearOnboardingData();
      router.push("/verify-email");
    } catch (err: any) {
  setError(getSignupErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

async function handleGoogleSignup() {
  try {
    setGoogleLoading(true);
    setError("");

    const onboarding = getOnboardingData();

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        fullName: user.displayName ?? "",
        email: user.email,
        provider: "google",
        role,
        emailVerified: true,

        onboardingCompleted: true,
        onboarding: {
          ...onboarding,
          completedAt: serverTimestamp(),
        },

        createdAt: serverTimestamp(),
      },
      { merge: true }
    );

    clearOnboardingData();

    router.push("/dashboard");
  } catch (err: any) {
  if (err.code === "auth/popup-closed-by-user") {
    return;
  }
    setError(getSignupErrorMessage(err.code));
  } finally {
    setGoogleLoading(false);
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
		  
		  <button
  type="button"
  onClick={handleGoogleSignup}
  disabled={loading || googleLoading}
  className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
>
  <Image
    src="/images/google.png"
    alt="Google"
    width={20}
    height={20}
  />

  {googleLoading ? "Signing you in..." : "Continue with Google"}
</button>

<div className="my-6 flex items-center">
  <div className="h-px flex-1 bg-gray-200" />
  <span className="mx-4 text-sm text-gray-500">
    or continue with email
  </span>
  <div className="h-px flex-1 bg-gray-200" />
</div>

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
              <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Create a strong password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 text-gray-900 placeholder:text-gray-400 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
  />

  <button
    type="button"
    onClick={() => setShowPassword((v) => !v)}
    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#0F4C5C]"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

<div className="mt-3 space-y-1 text-sm">
  <p className={passwordChecks.length ? "text-green-600" : "text-gray-500"}>
    ✓ At least 8 characters
  </p>

  <p className={passwordChecks.uppercase ? "text-green-600" : "text-gray-500"}>
    ✓ One uppercase letter
  </p>

  <p className={passwordChecks.lowercase ? "text-green-600" : "text-gray-500"}>
    ✓ One lowercase letter
  </p>

  <p className={passwordChecks.number ? "text-green-600" : "text-gray-500"}>
    ✓ One number
  </p>

  <p className={passwordChecks.special ? "text-green-600" : "text-gray-500"}>
    ✓ One special character
  </p>
</div>

<div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm your password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 text-gray-900 placeholder:text-gray-400 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword((v) => !v)}
    className="absolute inset-y-0 right-3 flex items-center text-sm font-medium text-gray-500 hover:text-[#0F4C5C]"
  >
    {showConfirmPassword ? "Hide" : "Show"}
  </button>
</div>
            </div>

            <div>
  <label className="mb-3 block text-sm font-bold text-gray-700">
    How will you use MyDeepTalk?
  </label>

  <div className="space-y-3">
    <button
      type="button"
      onClick={() => setRole("client")}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        role === "client"
          ? "border-[#0F4C5C] bg-[#F4FBFC]"
          : "border-gray-200 hover:border-[#0F4C5C]/40"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[#0F4C5C]">
            ❤️ Find Healing & Growth
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            I'm looking for self-discovery, emotional wellness, and professional support.
          </p>
        </div>

        {role === "client" && (
          <span className="text-xl text-[#0F4C5C]">✓</span>
        )}
      </div>
    </button>

    <button
      type="button"
      onClick={() => setRole("therapist")}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        role === "therapist"
          ? "border-[#0F4C5C] bg-[#F4FBFC]"
          : "border-gray-200 hover:border-[#0F4C5C]/40"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[#0F4C5C]">
            🩺 I'm a Mental Health Professional
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            I want to offer therapy and support clients through MyDeepTalk.
          </p>
        </div>

        {role === "therapist" && (
          <span className="text-xl text-[#0F4C5C]">✓</span>
        )}
      </div>
    </button>
  </div>
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
              disabled={loading || googleLoading || !acceptedLegal}
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
