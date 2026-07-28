"use client";

import OnboardingCard from "./OnboardingCard";
import OnboardingLayout from "./OnboardingLayout";
import OnboardingNavigation from "./OnboardingNavigation";

export default function PromiseScreen() {
  return (
  
  <OnboardingLayout step={2} totalSteps={6}>
  <div className="text-center">

        <h1 className="text-5xl font-bold tracking-tight">
  Our Promise to You
</h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
  Your wellbeing journey is personal. Everything we build at MyDeepTalk is
  designed to help you feel safe, understood, and in control.
</p>

        <div className="mt-16 space-y-6">
  <OnboardingCard
    icon="🔒"
    title="Privacy First"
    description="Your conversations and personal information remain confidential. We only collect information that helps personalize your experience and improve the support we provide."
  />

  <OnboardingCard
    icon="🤝"
    title="No Judgment"
    description="You are free to be honest here. MyDeepTalk is a space for reflection, growth, and support—not criticism."
  />

  <OnboardingCard
    icon="🌱"
    title="Growth at Your Pace"
    description="Healing and self-discovery are personal journeys. Move forward at a pace that feels right for you."
  />
  
  <OnboardingNavigation
  back="/onboarding"
  next="/onboarding/intent"
/>
</div>


</div>	
	</OnboardingLayout>
  );
}