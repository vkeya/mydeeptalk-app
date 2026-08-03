"use client";

import { useRouter } from "next/navigation";
import OnboardingLayout from "./OnboardingLayout";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <OnboardingLayout step={1} totalSteps={6}>
      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Welcome to MyDeepTalk
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-muted-foreground">

          <p>
            Whatever brought you here today,
            we're glad you're here.
          </p>

          <p>
            MyDeepTalk is a place to understand yourself,
            strengthen your emotional wellbeing,
            and connect with professional support whenever you need it.
          </p>

          <p>
            There's no pressure to have everything figured out.
          </p>

          <p>
            We'll take one step at a time.
          </p>

        </div>

        <button
  onClick={() => router.push("/onboarding/promise")}
  className="
    mt-12
    w-full
    rounded-xl
    bg-[#0B5D6B]
    py-4
    text-lg
    font-semibold
    text-white
    shadow-lg
    transition-all
    duration-200
    hover:bg-[#094955]
    hover:shadow-xl
    focus:outline-none
    focus:ring-2
    focus:ring-[#0B5D6B]
    focus:ring-offset-2
  "
>
  Begin My Journey
</button>

        <p className="mt-6 text-sm text-muted-foreground">
          This usually takes less than 3 minutes.
        </p>

      </div>
    </OnboardingLayout>
  );
}