"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { bookingConfirmationEmail } from "@/emails/bookingConfirmationEmail";
import { therapistBookingNotification } from "@/emails/therapistBookingNotification";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

type WeeklySlot = {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isPastDate(dateString: string) {
  if (!dateString) return false;

  const selectedDate = new Date(`${dateString}T00:00:00`);
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return selectedDate < today;
}

export default function BookSessionPage() {
  const params = useParams();
  const router = useRouter();

  const therapistId = params.therapistId as string;

  const [therapist, setTherapist] = useState<any>(null);
  const [availability, setAvailability] = useState<any>(null);
  const [bookedSlots, setBookedSlots] = useState<any[]>([]);
  const [therapyCredits, setTherapyCredits] = useState<any>(null);

  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [useGiftCredit, setUseGiftCredit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const todayDate = getTodayDateString();

  useEffect(() => {
    async function fetchData() {
      try {
        const therapistRef = doc(db, "therapists", therapistId);
        const therapistSnap = await getDoc(therapistRef);

        if (therapistSnap.exists()) {
          setTherapist({
            id: therapistSnap.id,
            ...therapistSnap.data(),
          });
        }

        const availabilityRef = doc(db, "therapistAvailability", therapistId);
        const availabilitySnap = await getDoc(availabilityRef);

        if (availabilitySnap.exists()) {
          setAvailability(availabilitySnap.data());
        }

        const bookingsQuery = query(
          collection(db, "bookings"),
          where("therapistId", "==", therapistId)
        );

        const bookingsSnap = await getDocs(bookingsQuery);

        const bookings = bookingsSnap.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        setBookedSlots(bookings);

        const user = auth.currentUser;

        if (user) {
          const creditsSnap = await getDoc(doc(db, "therapyCredits", user.uid));

          if (creditsSnap.exists()) {
            setTherapyCredits({
              id: creditsSnap.id,
              ...creditsSnap.data(),
            });
          }
        }
      } catch (error) {
        console.error("Error loading booking page:", error);
      } finally {
        setPageLoading(false);
      }
    }

    if (therapistId) {
      fetchData();
    }
  }, [therapistId]);

  function getSelectedDayName(dateString: string) {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  function generateTimeSlots(
    startTime: string,
    endTime: string,
    duration: number
  ) {
    const slots: string[] = [];

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = new Date();
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0, 0);

    const current = new Date(start);

    while (current < end) {
      const slot = current.toTimeString().slice(0, 5);
      slots.push(slot);
      current.setMinutes(current.getMinutes() + duration);
    }

    return slots;
  }

  function isSlotBooked(date: string, time: string) {
    return bookedSlots.some(
      (booking) =>
        booking.sessionDate === date &&
        booking.sessionTime === time &&
        booking.status !== "cancelled"
    );
  }

  const selectedDayName = getSelectedDayName(sessionDate);

  const availableSlotForSelectedDay = availability?.weeklySlots?.find(
    (slot: WeeklySlot) => slot.enabled && slot.day === selectedDayName
  );

  const generatedSlots =
    selectedDayName && availableSlotForSelectedDay
      ? generateTimeSlots(
          availableSlotForSelectedDay.startTime,
          availableSlotForSelectedDay.endTime,
          Number(availability?.sessionDuration || 60)
        )
      : [];

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!sessionDate || !sessionTime) {
      alert("Please select date and time.");
      return;
    }

    if (isPastDate(sessionDate)) {
      alert("Please select today or a future date.");
      setSessionDate("");
      setSessionTime("");
      return;
    }

    if (isSlotBooked(sessionDate, sessionTime)) {
      alert("This time slot has already been booked.");
      return;
    }

    if (useGiftCredit && (!therapyCredits || therapyCredits.remainingSessions <= 0)) {
       alert("You do not have available gifted therapy sessions.");
       setUseGiftCredit(false);
       return;
    }

    if (
       useGiftCredit &&
       therapyCredits?.giftType === "specific_therapist" &&
       therapyCredits?.therapistId &&
       therapyCredits.therapistId !== therapistId
    ) {
       alert("This gifted session can only be used with the therapist it was gifted for.");
       setUseGiftCredit(false);
       return;
    }

    setLoading(true);

    try {
	  const userSnap = await getDoc(doc(db, "users", user.uid));
      const userData = userSnap.exists() ? userSnap.data() : null;
      const clientAlias = userData?.alias || "Client";	  
      const bookingRef = await addDoc(collection(db, "bookings"), {
        clientId: user.uid,
        clientName: user.displayName || "",
		clientAlias,
        clientEmail: user.email || "",

        therapistId: therapist.id,
        therapistName: therapist.fullName,
        therapistEmail: therapist.email || "",

        sessionFee: useGiftCredit ? 0 : therapist.sessionFee || 0,
        sessionDate,
        sessionTime,
        sessionDuration: availability?.sessionDuration || 60,

        status: "pending",
        paymentStatus: useGiftCredit ? "gifted" : "unpaid",
        paymentMethod: useGiftCredit ? "gift_credit" : "normal_payment",
        giftCreditUsed: useGiftCredit,
        giftCreditId: useGiftCredit ? therapyCredits.id : "",

        meetingLink: "",
        createdAt: serverTimestamp(),
      });
	  

if (user.email) {
  await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: user.email,
      subject: "Session Request Received 💙",
      html: bookingConfirmationEmail(
        clientAlias,
        therapist.fullName || "Your therapist",
        sessionDate,
        sessionTime
      ),
    }),
  });
}

if (therapist.email) {
  await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: therapist.email,
      subject: "New Session Request",
      html: therapistBookingNotification(
        therapist.fullName || "Therapist",
        clientAlias,
        sessionDate,
        sessionTime
      ),
    }),
  });
}

      if (useGiftCredit && therapyCredits?.remainingSessions > 0) {
        await updateDoc(doc(db, "therapyCredits", user.uid), {
          remainingSessions: therapyCredits.remainingSessions - 1,
          updatedAt: serverTimestamp(),
        });

        alert("Booking created using your gifted therapy session.");
        router.push("/my-bookings");
        return;
      }

      alert("Booking created successfully.");
      router.push(`/payment/${bookingRef.id}`);
    } catch (error) {
      console.error(error);
      alert("Error creating booking.");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10 text-[#0F4C5C]">
        Loading therapist...
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] p-10 text-[#0F4C5C]">
        Therapist not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] p-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-gradient-to-r from-[#0F4C5C] to-[#2C7A7B] p-10 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Book Therapy Session</h1>

          <p className="mt-4 text-white/90">
            Schedule a session with {therapist.fullName}.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
          <div className="rounded-2xl bg-[#F7F3EC] p-6">
            <h2 className="text-2xl font-bold text-[#0F4C5C]">
              {therapist.fullName}
            </h2>

            <p className="mt-4 text-gray-700">Session Fee</p>

            <p className="text-3xl font-bold text-[#0F4C5C]">
              {useGiftCredit ? "Gifted Session" : `KES ${therapist.sessionFee || 0}`}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-xl font-bold text-[#0F4C5C]">
              Therapist Availability
            </h3>

            {!availability ? (
              <p className="mt-4 text-gray-700">
                This therapist has not set availability yet.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {availability.weeklySlots
                  ?.filter((slot: WeeklySlot) => slot.enabled)
                  .map((slot: WeeklySlot) => (
                    <div
                      key={slot.day}
                      className="rounded-xl bg-[#F7F3EC] p-4 text-gray-800"
                    >
                      <strong>{slot.day}</strong>: {slot.startTime} -{" "}
                      {slot.endTime}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <form onSubmit={handleBooking} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block font-semibold text-[#0F4C5C]">
                Choose Date
              </label>

              <input
                type="date"
                min={todayDate}
                className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900"
                value={sessionDate}
                onChange={(e) => {
                  const selectedDate = e.target.value;

                  if (isPastDate(selectedDate)) {
                    alert("You cannot select a date that has already passed.");
                    setSessionDate("");
                    setSessionTime("");
                    return;
                  }

                  setSessionDate(selectedDate);
                  setSessionTime("");
                }}
                required
              />

              {sessionDate && !availableSlotForSelectedDay && (
                <p className="mt-3 text-sm font-semibold text-red-600">
                  {therapist.fullName} is not available on {selectedDayName}.
                </p>
              )}
            </div>

            {sessionDate && availableSlotForSelectedDay && (
              <div>
                <label className="mb-3 block font-semibold text-[#0F4C5C]">
                  Available Times
                </label>

                <div className="grid gap-3 sm:grid-cols-3">
                  {generatedSlots.map((time) => {
                    const booked = isSlotBooked(sessionDate, time);

                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={booked}
                        onClick={() => setSessionTime(time)}
                        className={`rounded-full px-4 py-3 text-sm font-semibold ${
                          sessionTime === time
                            ? "bg-[#0F4C5C] text-white"
                            : booked
                            ? "bg-gray-200 text-gray-500"
                            : "bg-[#F7F3EC] text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
                        }`}
                      >
                        {booked ? `${time} Booked` : time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {therapyCredits?.remainingSessions > 0 && (
              <div className="rounded-2xl bg-[#F7F3EC] p-5">
                <p className="font-bold text-[#0F4C5C]">
                  You have {therapyCredits.remainingSessions} gifted therapy
                  session{therapyCredits.remainingSessions > 1 ? "s" : ""}{" "}
                  available ❤️
                </p>

                <label className="mt-4 flex items-center gap-3 font-semibold text-gray-900">
                  <input
                    type="checkbox"
                    checked={useGiftCredit}
                    onChange={(e) => setUseGiftCredit(e.target.checked)}
                  />
                  Use gifted session for this booking
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !availableSlotForSelectedDay || !sessionTime}
              className="w-full rounded-full bg-[#0F4C5C] p-4 font-semibold text-white hover:bg-[#0b3945] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Booking..."
                : useGiftCredit
                ? "Book With Gifted Session"
                : "Proceed to Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}