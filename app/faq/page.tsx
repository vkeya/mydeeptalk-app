export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold text-[#0F4C5C]">
          Frequently Asked Questions
        </h1>

        <div className="mt-10 space-y-10">

          {/* Clients */}

          <section>
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              For Clients
            </h2>

            <div className="mt-6 space-y-6 text-gray-900">
              <div>
                <h3 className="font-bold">How do I book a therapist?</h3>
                <p>
                  Browse therapist profiles, choose an available time and proceed with booking and payment.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Are sessions confidential?</h3>
                <p>
                  Therapists are expected to maintain professional confidentiality in accordance with applicable standards.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Can I change therapists?</h3>
                <p>
                  Yes. You are free to book with another therapist at any time.
                </p>
              </div>
            </div>
          </section>

          {/* Therapists */}

          <section>
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              For Therapists
            </h2>

            <div className="mt-6 space-y-6 text-gray-900">
              <div>
                <h3 className="font-bold">How do I become verified?</h3>
                <p>
                  Complete your profile and upload the required credentials for review.
                </p>
              </div>

              <div>
                <h3 className="font-bold">How do I set availability?</h3>
                <p>
                  Use the availability page to choose the days and hours you are available.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Can I update my profile later?</h3>
                <p>
                  Yes. Therapist profiles can be updated anytime.
                </p>
              </div>
            </div>
          </section>

          {/* AI */}

          <section>
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              DeepTalk AI
            </h2>

            <div className="mt-6 space-y-6 text-gray-900">
              <div>
                <h3 className="font-bold">Is DeepTalk AI a therapist?</h3>
                <p>
                  No. DeepTalk AI is a self-reflection tool and does not replace professional care.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Can DeepTalk AI diagnose conditions?
                </h3>
                <p>
                  No. It provides reflective support and emotional awareness only.
                </p>
              </div>

              <div>
                <h3 className="font-bold">Is my journal private?</h3>
                <p>
                  Journal entries are private and associated with your account.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy */}

          <section>
            <h2 className="text-2xl font-bold text-[#2C7A7B]">
              Privacy & Security
            </h2>

            <div className="mt-6 space-y-6 text-gray-900">
              <div>
                <h3 className="font-bold">Who can see my information?</h3>
                <p>
                  Your information is protected and used only to provide services and improve the platform.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  Is MyDeepTalk an emergency service?
                </h3>
                <p>
                  No. If you are experiencing an emergency, please contact local emergency services immediately.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}