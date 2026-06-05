import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EC] px-8 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-12 text-white shadow-lg">
          <h1 className="text-5xl font-bold">Contact MyDeepTalk</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
            Have a question, partnership inquiry, or need support? We’d love to hear from you.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">Get in Touch</h2>

            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                <strong>Email:</strong> info@mydeeptalk.com
              </p>
              <p>
                <strong>Platform:</strong> Emotional wellness, self-discovery and therapist support.
              </p>
              <p>
                <strong>Location:</strong> Built for Africa, available online.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">Need Support?</h2>

            <p className="mt-6 leading-7 text-gray-600">
              If you are looking for emotional wellness support, you can create an account and begin your self-discovery journey or connect with a therapist.
            </p>

            <Link
              href="/signup"
              className="mt-8 inline-block rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white hover:bg-[#0b3945]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}