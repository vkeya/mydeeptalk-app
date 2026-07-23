import { db } from "@/lib/firebase";
import { collection, doc } from "firebase/firestore";

export const genesisPaths = {
  memory: (userId: string) =>
    doc(db, "users", userId, "genesis", "memory", "current"),

  knowledge: (userId: string) =>
    doc(db, "users", userId, "genesis", "knowledge", "current"),

  journeys: (userId: string) =>
    collection(db, "users", userId, "genesis", "journeys"),

  discoveries: (userId: string) =>
    collection(db, "users", userId, "genesis", "discoveries"),

  insights: (userId: string) =>
    collection(db, "users", userId, "genesis", "insights"),

  hypotheses: (userId: string) =>
    collection(db, "users", userId, "genesis", "hypotheses"),
};