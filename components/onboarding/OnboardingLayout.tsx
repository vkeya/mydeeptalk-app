import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";


interface OnboardingLayoutProps {
  children: ReactNode;
  step?: number;
  totalSteps?: number;
}

export default function OnboardingLayout({
  children,
  step,
  totalSteps,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-10">

        {/* Logo */}
        <div className="mb-16 flex justify-center">
          <Link href="/" className="inline-flex">
  <Image
    src="/images/logo.png"
    alt="MyDeepTalk"
    width={280}
    height={75}
    priority
    className="h-auto w-auto"
  />
</Link>
        </div>

        {/* Progress */}
{step && totalSteps && (
  <div className="mb-10">
    <div className="mb-3 text-center text-sm text-muted-foreground">
      Step {step} of {totalSteps}
    </div>

    <div className="mx-auto h-2 w-full max-w-sm rounded-full bg-gray-200">
  <div
    className="h-full rounded-full bg-[#0B5D6B]"
    style={{
      width: `${(step / totalSteps) * 100}%`,
    }}
  />
</div>
  </div>
)}
        {/* Screen Content */}
        <main className="w-full">
  <div className="mx-auto w-full max-w-2xl">
    {children}
  </div>
</main>

      </div>
    </div>
  );
}