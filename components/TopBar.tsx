import { HeartPulse, Mail, Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#0F4C5C] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 py-2 text-xs md:flex-row md:px-8 md:text-sm">
        {/* Left: platform tagline */}
        <div className="flex items-center gap-2">
          <HeartPulse className="h-4 w-4 text-[#E2954E]" />
          <span className="font-medium tracking-wide">
            Preventive Emotional Wellness Platform
          </span>
        </div>

        {/* Right: contact details */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:info@mydeeptalk.com"
            className="group flex items-center gap-2 transition hover:text-[#E2954E]"
          >
            <Mail className="h-4 w-4 text-[#E2954E]" />
            <span>info@mydeeptalk.com</span>
          </a>

          <span className="hidden h-4 w-px bg-white/25 md:block" />

          <a
            href="tel:+254700000000"
            className="group flex items-center gap-2 transition hover:text-[#E2954E]"
          >
            <Phone className="h-4 w-4 text-[#E2954E]" />
            <span>+254 700 000 000</span>
          </a>
        </div>
      </div>
    </div>
  );
}
