export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-lg">
          <h1 className="text-5xl font-bold">
            Terms & Conditions
          </h1>

          <p className="mt-6 text-lg text-white/80">
            Effective Date: June 2026
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-10 shadow-lg">

          <h2 className="text-2xl font-bold text-[#0F4C5C]">
            Platform Terms
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            MyDeepTalk is an emotional wellness and therapist support platform.
            Professional therapy services are independently provided by licensed therapists.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Users must be at least 18 years old and are responsible for
            maintaining the security of their accounts.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Therapists are independent professionals and are not employees
            of MyDeepTalk.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            AI-generated responses are intended for self-reflection and are
            not medical, legal, or psychological advice.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            These Terms are governed by the laws of the Republic of Kenya.
          </p>

        </div>
      </div>
    </main>
  );
}