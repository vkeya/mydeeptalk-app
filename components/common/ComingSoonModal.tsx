"use client";

import { X, Sparkles } from "lucide-react";

interface ComingSoonModalProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export default function ComingSoonModal({
  open,
  title,
  description,
  onClose,
}: ComingSoonModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F4F4]">
          <Sparkles className="h-8 w-8 text-[#0D5C63]" />
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-[#0D5C63]">
          {title}
        </h2>

        <p className="mt-5 text-center leading-7 text-slate-600">
          {description}
        </p>

        <div className="mt-8 rounded-2xl bg-[#F7FBFB] p-5 text-center">
          <p className="text-sm text-slate-600">
            We're actively building this experience and can't wait for you to
            try it.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-2xl bg-[#0D5C63] py-4 font-semibold text-white transition hover:bg-[#08474D]"
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );
}