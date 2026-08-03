"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProfileLayout from "@/components/profile-completion/ProfileLayout";

import WelcomeStep from "@/components/profile-completion/steps/WelcomeStep";
import IdentityStep from "@/components/profile-completion/steps/IdentityStep";
import LocationStep from "@/components/profile-completion/steps/LocationStep";
import PreferencesStep from "@/components/profile-completion/steps/PreferencesStep";
import CompletionStep from "@/components/profile-completion/steps/CompletionStep";

import {
  emptyUserProfile,
  UserProfile,
} from "@/types/profile";

import { profileService } from "@/lib/profile/profileService";

const TOTAL_STEPS = 5;

export default function ProfileCompletionPage() {
	
	 console.log("PROFILE COMPLETION PAGE LOADED");
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [profile, setProfile] =
    useState<UserProfile>(emptyUserProfile);

  function updateProfile(
    updates: Partial<UserProfile>
  ) {
    const updatedProfile = {
      ...profile,
      ...updates,
    };

    updatedProfile.completionPercentage =
      profileService.calculateCompletion(updatedProfile);

    setProfile(updatedProfile);
  }

  async function handleFinish() {
    try {
      const completedProfile =
        profileService.completeProfile(profile);

      await profileService.saveProfile(completedProfile);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProfileLayout
      step={step}
      totalSteps={TOTAL_STEPS}
    >
      {step === 1 && (
        <WelcomeStep
          onContinue={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <IdentityStep
          privacyName={profile.privacyName}
          onPrivacyNameChange={(value) =>
            updateProfile({
              privacyName: value,
            })
          }
          onBack={() => setStep(1)}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <LocationStep
          country={profile.country}
          timezone={profile.timezone}
          language={profile.preferredLanguage}
          onCountryChange={(value) =>
            updateProfile({
              country: value,
            })
          }
          onTimezoneChange={(value) =>
            updateProfile({
              timezone: value,
            })
          }
          onLanguageChange={(value) =>
            updateProfile({
              preferredLanguage: value,
            })
          }
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <PreferencesStep
          preferences={profile.preferences}
          onChange={(preferences) =>
            updateProfile({
              preferences,
            })
          }
          onBack={() => setStep(3)}
          onContinue={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <CompletionStep
          onBack={() => setStep(4)}
          onFinish={handleFinish}
        />
      )}
    </ProfileLayout>
  );
}