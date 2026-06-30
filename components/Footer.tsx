import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0F4C5C] text-white">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/">
              <Image
                src="/images/logo-new.png"
                alt="MyDeepTalk"
                width={350}
                height={200}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-white/70">
              AI-powered emotional wellness and therapist support built in Africa.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Company</h3>
            <div className="mt-4 space-y-3">
              <Link href="/about" className="block text-white/70">About</Link>
              <Link href="/how-it-works" className="block text-white/70">How It Works</Link>
              <Link href="/contact" className="block text-white/70">Contact</Link>
              <Link href="/faq" className="block text-white/70">FAQ</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Platform</h3>
            <div className="mt-4 space-y-3">
              <Link href="/therapists" className="block text-white/70">Find a Therapist</Link>
              <Link href="/for-therapists" className="block text-white/70">For Therapists</Link>
              <Link href="/signup" className="block text-white/70">Get Started</Link>
              <Link href="/login" className="block text-white/70">Login</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Legal</h3>
            <div className="mt-4 space-y-3">
              <Link href="/privacy" className="block text-white/70">Privacy Policy</Link>
              <Link href="/terms" className="block text-white/70">Terms & Conditions</Link>
            </div>

            <p className="mt-6 text-white/70">info@mydeeptalk.com</p>
          </div>
        </div>

        <hr className="my-10 border-white/20" />

        <p className="text-center text-white/60">
          © 2026 MyDeepTalk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}