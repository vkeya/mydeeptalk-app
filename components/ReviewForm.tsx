"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function ReviewForm({
  therapistId,
}: {
  therapistId: string;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [eligible, setEligible] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkEligibility() {
      const user = auth.currentUser;

      if (!user) {
        setChecking(false);
        return;
      }

      try {
        const q = query(
          collection(db, "bookings"),
          where("clientId", "==", user.uid),
          where("therapistId", "==", therapistId),
          where("status", "==", "completed")
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setEligible(true);
        }
      } catch (error) {
        console.error(error);
      }

      setChecking(false);
    }

    checkEligibility();
  }, [therapistId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      // Prevent duplicate reviews
      const existingReviewQuery = query(
        collection(db, "reviews"),
        where("clientId", "==", user.uid),
        where("therapistId", "==", therapistId)
      );

      const existingReviewSnapshot = await getDocs(
        existingReviewQuery
      );

      if (!existingReviewSnapshot.empty) {
        alert("You have already reviewed this therapist.");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "reviews"), {
        therapistId,
        clientId: user.uid,
        clientName: user.displayName || "Anonymous",
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      setComment("");
      setRating(5);

      alert("Review submitted successfully.");
    } catch (error) {
      console.error(error);
      alert("Error submitting review.");
    }

    setLoading(false);
  }

  if (checking) {
    return <p>Checking eligibility...</p>;
  }

  if (!eligible) {
    return (
      <div className="rounded-2xl bg-[#F7F3EC] p-6">
        <p className="text-gray-600">
          Reviews can only be submitted after completing a session with this therapist.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="mb-2 block font-medium">
          Rating
        </label>

        <select
          className="w-full rounded border p-3"
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
        >
          <option value={5}>★★★★★</option>
          <option value={4}>★★★★</option>
          <option value={3}>★★★</option>
          <option value={2}>★★</option>
          <option value={1}>★</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Comment
        </label>

        <textarea
          rows={4}
          className="w-full rounded border p-3"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      <button
        disabled={loading}
        className="rounded bg-[#0F4C5C] px-6 py-3 text-white"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

    </form>
  );
}