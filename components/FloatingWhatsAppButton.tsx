import { MessageCircle } from "lucide-react";

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/254722534317"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="floating-whatsapp fixed bottom-5 right-5 z-[80] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:scale-[1.03] hover:bg-[#20bd5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-5 w-5" />
      <span>Lets Chat</span>
    </a>
  );
}
