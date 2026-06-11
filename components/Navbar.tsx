import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="MyDeepTalk"
            width={320}
            height={150}
            priority
            className="h-24 w-auto object-contain"
          />
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 lg:flex">

          <Link
            href="/about"
            className="text-gray-600 transition hover:text-[#0F4C5C]"
          >
            About
          </Link>

          <Link
            href="/how-it-works"
            className="text-gray-600 transition hover:text-[#0F4C5C]"
          >
            How It Works
          </Link>

          <Link
            href="/therapists"
            className="text-gray-600 transition hover:text-[#0F4C5C]"
          >
            Find a Therapist
          </Link>

          <Link
            href="/for-therapists"
            className="text-gray-600 transition hover:text-[#0F4C5C]"
          >
            For Therapists
          </Link>

          <Link
            href="/contact"
            className="text-gray-600 transition hover:text-[#0F4C5C]"
          >
            Contact
          </Link>

        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="font-medium text-[#0F4C5C]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#0F4C5C] px-6 py-3 font-semibold text-white transition hover:bg-[#0b3945]"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}