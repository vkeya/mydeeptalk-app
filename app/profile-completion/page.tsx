"use client";
import PrivacyNameStep from "@/components/profile-completion/PrivacyNameStep";
import { useState } from "react";
import WelcomeStep from "@/components/profile-completion/WelcomeStep";
import PreferencesStep from "@/components/profile-completion/PreferencesStep";
import CompletionStep from "@/components/profile-completion/CompletionStep";

export default function ProfileCompletionPage() {
  const [step, setStep] = useState(1);
  const [privacyName, setPrivacyName] = useState("");
  const [country, setCountry] = useState("");
const [timeZone, setTimeZone] = useState("");
const [preferredLanguage, setPreferredLanguage] = useState("");
const [notifications, setNotifications] = useState({
  sessions: true,
  journal: true,
  updates: true,
});

const handleFinish = async () => {
  // TODO:
  // Save the completed profile to Firestore
  // Redirect the user to the dashboard
  console.log("Profile completed");
};

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white shadow-lg p-8">

        {/* Progress */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Step {step} of 5
          </p>

          <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step */}
        {step === 1 && (
          <WelcomeStep onContinue={() => setStep(2)} />
        )}
		
		{step === 2 && (
  <PrivacyNameStep
    value={privacyName}
    onChange={setPrivacyName}
    onBack={() => setStep(1)}
    onContinue={() => setStep(3)}
  />
)}

{step === 3 && (
  <PreferencesStep
    country={country}
    timeZone={timeZone}
    preferredLanguage={preferredLanguage}
    onCountryChange={setCountry}
    onTimeZoneChange={setTimeZone}
    onLanguageChange={setPreferredLanguage}
    onBack={() => setStep(2)}
    onContinue={() => setStep(4)}
  />
)}

{step === 4 && (
  <CompletionStep
    onBack={() => setStep(3)}
    onFinish={handleFinish}
  />
)}


        {step > 1 && (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-bold">
              Coming Soon
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}