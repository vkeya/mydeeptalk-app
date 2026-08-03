interface PreferencesStepProps {
  country: string;
  timeZone: string;
  preferredLanguage: string;
  onCountryChange: (value: string) => void;
  onTimeZoneChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function PreferencesStep({
  country,
  timeZone,
  preferredLanguage,
  onCountryChange,
  onTimeZoneChange,
  onLanguageChange,
  onBack,
  onContinue,
}: PreferencesStepProps) {
  const isComplete =
    country.trim() !== "" &&
    timeZone.trim() !== "" &&
    preferredLanguage.trim() !== "";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Tell us a little about yourself
        </h1>

        <p className="mt-3 text-gray-600 leading-relaxed">
          This information helps us personalize your experience,
          connect you with the right therapists, and ensure your
          sessions and reminders happen at the right time.
        </p>
      </div>

      {/* Country */}
      <div>
        <label className="block mb-2 font-semibold">
          Country
        </label>

        <input
          type="text"
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          placeholder="Select your country"
          className="w-full rounded-lg border px-4 py-3"
        />

        <p className="mt-2 text-sm text-gray-500">
          We'll use your country to connect you with local therapists,
          show the correct currency, and tailor resources to your region.
        </p>
      </div>

      {/* Time Zone */}
      <div>
        <label className="block mb-2 font-semibold">
          Time Zone
        </label>

        <input
          type="text"
          value={timeZone}
          onChange={(e) => onTimeZoneChange(e.target.value)}
          placeholder="Select your time zone"
          className="w-full rounded-lg border px-4 py-3"
        />

        <p className="mt-2 text-sm text-gray-500">
          Your time zone helps us schedule therapy sessions and send
          reminders at the right time.
        </p>
      </div>

      {/* Preferred Language */}
      <div>
        <label className="block mb-2 font-semibold">
          Preferred Language
        </label>

        <select
          value={preferredLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="">Select your preferred language</option>
          <option value="English">English</option>
          <option value="Kiswahili">Kiswahili</option>
          <option value="Arabic">Arabic</option>
          <option value="French">French</option>
        </select>

        <p className="mt-2 text-sm text-gray-500">
          We'll use your preferred language whenever it's available
          throughout MyDeepTalk.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border px-6 py-3"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onContinue}
          disabled={!isComplete}
          className={`rounded-lg px-6 py-3 text-white ${
            isComplete
              ? "bg-primary hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}