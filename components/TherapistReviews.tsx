"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TherapistReviews({
  therapistId,
}: {
  therapistId: string;
}) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const q = query(
          collection(db, "reviews"),
          where("therapistId", "==", therapistId),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const list: any[] = [];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setReviews(list);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    fetchReviews();
  }, [therapistId]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0";

  if (loading) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl bg-white p-10 shadow-lg">

      <h2 className="text-3xl font-bold text-[#0F4C5C]">
        Reviews
      </h2>

      {reviews.length > 0 && (
        <div className="mt-8 rounded-3xl bg-[#F7F3EC] p-8">

          <div className="text-5xl text-[#E2954E]">
            ★★★★★
          </div>

          <h3 className="mt-4 text-3xl font-bold text-[#0F4C5C]">
            {averageRating} / 5
          </h3>

          <p className="mt-2 text-gray-600">
            Based on {reviews.length} review
            {reviews.length > 1 ? "s" : ""}
          </p>

        </div>
      )}

      {reviews.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-[#F7F3EC] p-8">
          <p className="text-gray-600">
            No reviews yet.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-6">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border p-8"
            >

              <div className="flex items-center justify-between">

                <div>

                  <div className="text-[#E2954E] text-xl">
                    {"★".repeat(review.rating)}
                  </div>

                  <h4 className="mt-3 text-lg font-bold text-[#0F4C5C]">
                    {review.clientName}
                  </h4>

                </div>

                <div className="text-sm text-gray-500">
                  {review.createdAt?.toDate
                    ? review.createdAt
                        .toDate()
                        .toLocaleDateString()
                    : ""}
                </div>

              </div>

              <p className="mt-6 leading-8 text-gray-600">
                "{review.comment}"
              </p>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}