export default function EmergencyPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-lg">
        <h1 className="text-4xl font-bold text-[#C0392B]">
          Emergency Disclaimer
        </h1>

        <div className="mt-8 space-y-6 text-base font-medium leading-8 text-gray-900">
          <div className="rounded-2xl bg-red-50 p-6">
            <p className="font-bold text-[#C0392B]">
              MyDeepTalk is not an emergency service.
            </p>
          </div>

          <p>
            MyDeepTalk does not provide crisis intervention, emergency medical
            care, or emergency psychiatric services.
          </p>

          <p>
            If you are experiencing thoughts of harming yourself, harming
            others, or believe you may be in immediate danger, please:
          </p>

          <ul className="list-disc space-y-2 pl-8">
            <li>Call your local emergency number.</li>
            <li>Go to the nearest hospital or emergency room.</li>
            <li>Contact a trusted family member or friend.</li>
            <li>Seek support from a licensed mental health professional.</li>
          </ul>

          <p>
            Therapists available through MyDeepTalk are independent providers
            and may not be immediately available during emergencies.
          </p>

          <div className="rounded-2xl bg-yellow-50 p-6">
            <p className="font-bold text-[#0F4C5C]">
              If something feels too heavy to carry alone, please reach out to
              someone you trust or seek immediate professional support.
            </p>
          </div>

          <p className="font-bold text-[#0F4C5C]">
            Last Updated: June 2026
          </p>
        </div>
      </div>
    </main>
  );
}