import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function processGiftPayment(
  giftId: string,
  payload: any
) {
  const giftRef = doc(db, "giftSessions", giftId);
  const giftSnap = await getDoc(giftRef);

  if (!giftSnap.exists()) {
    return false;
  }

  const gift = giftSnap.data();

  if (gift.paymentStatus === "paid") {
    return true;
  }

  await updateDoc(giftRef, {
    paymentStatus: "paid",
    status: "active",
    paidAt: serverTimestamp(),
    webhookPayload: payload,
    updatedAt: serverTimestamp(),
  });

  const paymentQuery = query(
    collection(db, "payments"),
    where("giftId", "==", giftId)
  );

  const paymentSnapshot = await getDocs(paymentQuery);

  for (const paymentDoc of paymentSnapshot.docs) {
    await updateDoc(doc(db, "payments", paymentDoc.id), {
      status: "completed",
      paidAt: serverTimestamp(),
      webhookPayload: payload,
      updatedAt: serverTimestamp(),
    });
  }

  return true;
}