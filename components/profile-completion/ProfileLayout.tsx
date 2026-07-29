"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { ShieldCheck, HeartHandshake } from "lucide-react";
interface ProfileLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
}

export default function ProfileLayout({
  children,
  step,
  totalSteps,
}: ProfileLayoutProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <main className="min-h-screen bg-[#F7F3EC]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Panel */}
        <div className="relative hidden lg:block">
          <Image
            src="/images/calmness.jpg"
            alt="MyDeepTalk"
            fill
            priority
			sizes="50vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0A3945]/90 via-[#0F4C5C]/55 to-transparent" />

          <div className="absolute inset-0 flex items-center p-12">
		      <div className="max-w-xl px12 text-white">
            <p className="text-lg font-semibold tracking-[0.2em] text-[#E7C9A9] drop-shadow-md">
  MYDEEPTALK
</p>

            <h1 className="mt-4 text-6xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg">
              Your healing space
              <br />
              is almost ready.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/90">
              A few final details help us personalize your experience while
              protecting your privacy and supporting your emotional wellbeing.
            </p>
			
			<p className="mt-6 max-w-lg text-lg leading-8 text-white/90">
  A few final details help us personalize your experience while
  protecting your privacy and supporting your emotional wellbeing.
</p>

<div className="mt-10 space-y-6">
  <div className="flex items-start gap-4">
    <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
      <ShieldCheck className="h-6 w-6 text-[#E7C9A9]" />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Private & Secure
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-white/80">
        Your conversations, journals, and healing journey remain private and protected.
      </p>
    </div>
  </div>

  <div className="flex items-start gap-4">
    <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
      <HeartHandshake className="h-6 w-6 text-[#E7C9A9]" />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-white">
        Built for Healing
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-white/80">
        Every experience is designed to support reflection, growth, and emotional wellbeing.
      </p>
    </div>
  </div>
</div>
          </div>
		  </div>
        </div>
		
		

        {/* Right Panel */}
        <div className="flex items-center justify-center px-10 py-16">
          <div className="w-full max-w-4xl rounded-3xl bg-white border border-[#E8E3DA] p-12 shadow-2xl">
            

            {children}
          </div>
        </div>
      </div>
    </main>
  );
}