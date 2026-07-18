"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import type {
  TherapistClientHeader,
} from "@/types/therapist/client";

export type ClientHeaderProps = TherapistClientHeader;

export default function ClientHeader({
  id,
  name,
  alias,
  profilePhoto,
  email,
  phone,
  location,
  status,
  therapistSince,
  nextSession,
  totalSessions,
}: ClientHeaderProps) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/therapist-clients"
            className="rounded-lg border p-2 transition hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {alias || name}
            </h1>

            <p className="text-sm text-gray-500">
              Client Workspace
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {status === "active" ? "Active Client" : "Inactive"}
        </span>
      </div>

      {/* Main */}
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100">
          {profilePhoto ? (
            <Image
              src={profilePhoto}
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-gray-500">
              {name.charAt(0)}
            </div>
          )}
        </div>

        <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoItem
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={email}
          />

          <InfoItem
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={phone || "Not provided"}
          />

          <InfoItem
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={location || "Not specified"}
          />

          <InfoItem
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Therapist Since"
            value={therapistSince || "—"}
          />
        </div>
      </div>

      <div className="grid gap-4 border-t bg-gray-50 px-6 py-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-500">Total Sessions</p>

          <p className="mt-2 text-3xl font-bold">
            {totalSessions}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            Next Session
          </div>

          {nextSession ? (
            <>
              <p className="mt-2 font-semibold">
                {nextSession.date}
              </p>

              <p className="text-gray-600">
                {nextSession.time}
              </p>
            </>
          ) : (
            <p className="mt-2 text-gray-500">
              No upcoming session
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-gray-400">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {label}
        </p>

        <p className="font-medium text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}