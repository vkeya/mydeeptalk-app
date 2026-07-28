"use client";

import IntentCard from "./IntentCard";
import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import OnboardingNavigation from "./OnboardingNavigation";

export default function IntentScreen() {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  return (
    <OnboardingLayout step={3} totalSteps={6}>
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          What brings you here today?
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Choose the option that best describes what you're looking for.
        </p>

        <div className="mt-12">
         
		  <div className="mt-12 space-y-4">
  <IntentCard
    id="self-discovery"
    icon="🌱"
    title="I want to understand myself better"
    description="Explore your personality, emotions, strengths, values, and patterns through guided self-discovery."
    selected={selectedIntent === "self-discovery"}
    onSelect={setSelectedIntent}
	
	/>
	
	
	<IntentCard
  id="emotional-support"
  icon="💙"
  title="I'm feeling emotionally overwhelmed"
  description="Receive compassionate guidance to help you understand your emotions and take your next step with confidence."
  selected={selectedIntent === "emotional-support"}
  onSelect={setSelectedIntent}

  />
  
  <IntentCard
  id="professional-support"
  icon="🤝"
  title="I'm looking for professional support"
  description="Connect with a licensed therapist or mental health professional who can support your journey."
  selected={selectedIntent === "professional-support"}
  onSelect={setSelectedIntent}
/>

<IntentCard
  id="personal-growth"
  icon="🚀"
  title="I want to grow personally"
  description="Build healthier habits, develop emotional resilience, and become the person you aspire to be."
  selected={selectedIntent === "personal-growth"}
  onSelect={setSelectedIntent}
/>

<IntentCard
  id="exploring"
  icon="🌍"
  title="I'm exploring MyDeepTalk"
  description="Take a look around, learn how the platform works, and discover what resonates with you."
  selected={selectedIntent === "exploring"}
  onSelect={setSelectedIntent}
/>


</div>
        </div>
		
		<OnboardingNavigation
        back="/onboarding/promise"
        next="/onboarding/guide"
        nextDisabled={!selectedIntent}
      />
      </div>
    </OnboardingLayout>
  );
}