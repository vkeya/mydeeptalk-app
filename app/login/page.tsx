"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { ArrowLeft } from "lucide-react";
import { IMAGES } from "@/lib/images";

function getLoginErrorMessage(code: string) {
  switch (code) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";

    case "auth/user-not-found":
      return "No account was found with that email address.";

    case "auth/wrong-password":
      return "Incorrect email or password.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    case "auth/too-many-requests":
      return "Too many login attempts. Please wait a few minutes and try again.";

    case "auth/account-exists-with-different-credential":
      return "This email is already associated with another sign-in method.";

    default:
      return "We couldn't sign you in. Please try again.";
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  

async function redirectAfterLogin(uid: string, emailVerified: boolean) {
  if (!emailVerified) {
    router.push("/verify-email");
    return;
  }

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    router.push("/onboarding");
    return;
  }

  const userData = userSnap.data();

  if (!userData.onboardingCompleted) {
    router.push("/onboarding");
    return;
  }

  switch (userData.role) {
  case "admin":
    router.push("/admin");
    return;

  case "therapist":
    router.push("/therapist/dashboard");
    return;

  case "client":
  default:
    router.push("/dashboard");
    return;
}
}

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(
  auth,
  email,
  password
);

await redirectAfterLogin(
  userCredential.user.uid,
  userCredential.user.emailVerified
);
    } catch (error: any) {
  setMessage(getLoginErrorMessage(error.code));
} finally {
      setLoading(false);
    }
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
          alias: user.displayName
            ? user.displayName.split(" ")[0]
            : `Client-${Math.floor(1000 + Math.random() * 9000)}`,
          email: user.email,
          role: "client",
          provider: "google",
          emailVerified: true,
          ageConfirmed18: true,
          termsAccepted: true,
          privacyAccepted: true,
          termsAcceptedAt: serverTimestamp(),
          privacyAcceptedAt: serverTimestamp(),
          termsVersion: "1.0",
          privacyVersion: "1.0",
          createdAt: serverTimestamp(),
        });
      } else {
        await setDoc(
          userRef,
          {
            termsAccepted: true,
            privacyAccepted: true,
            termsAcceptedAt: serverTimestamp(),
            privacyAcceptedAt: serverTimestamp(),
            termsVersion: "1.0",
            privacyVersion: "1.0",
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
      await redirectAfterLogin(user.uid, true);
    } catch (error: any) {
  if (error.code === "auth/popup-closed-by-user") {
    return;
  }

  setMessage(getLoginErrorMessage(error.code));
} finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left — image panel */}
      <div className="relative hidden lg:block lg:w-[52%]">
        <Image
          src={IMAGES.aboutStory}
          alt="Begin your self-discovery journey"
          fill
          className="object-cover"
          priority
          sizes="52vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C5C]/85 via-[#0F4C5C]/20 to-transparent" />
        {/* Bottom brand text */}
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Emotional Wellness
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-snug text-[#E2954E]">
            Self-discovery before crisis.<br />Healing before collapse.
          </h2>
          <p className="mt-3 max-w-sm text-white leading-7">
            Begin your emotional wellness journey, reflect honestly, and connect
            with verified therapists when you are ready.
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
        <div className="mx-auto w-full max-w-sm py-14">
          <h1 className="text-3xl font-bold text-[#0F4C5C]">Welcome back</h1>
          <p className="mt-2 leading-7 text-gray-500">
            Login to continue your MyDeepTalk journey.
          </p>

          {message && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#0F4C5C] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-20 text-gray-900 placeholder:text-gray-400 transition focus:border-[#0F4C5C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4C5C]/10"
  />

  <button
    type="button"
    onClick={() => setShowPassword((v) => !v)}
    className="absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-gray-500 hover:text-[#0F4C5C]"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#0F4C5C] py-3.5 font-bold text-white transition hover:bg-[#0b3945] disabled:opacity-60"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          

          <div className="mt-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mt-4 w-full rounded-full border border-gray-200 bg-white py-3.5 font-bold text-gray-700 transition hover:border-[#0F4C5C] hover:text-[#0F4C5C] disabled:opacity-60"
          >
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm font-semibold text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-[#0F4C5C] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
