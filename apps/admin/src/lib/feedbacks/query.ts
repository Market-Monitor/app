"use server";

import { unstable_cache } from "next/cache";
import { firestore } from "../firebase-admin";

export interface Feedback {
  email: string;
  fullname: string;
  feedback: string;
  createdAt: number;
}

export const getMobileAppFeedbacks = unstable_cache(
  async () => {
    const feedbacks = await firestore.collection("Feedbacks").get();
    return feedbacks.docs
      .map((doc) => ({
        ...doc.data(),
        createdAt: doc.data().createdAt.toMillis(),
      }))
      .sort((a, b) => b.createdAt - a.createdAt) as Feedback[];
  },
  ["get-mobile-app-feedbacks"],
  { tags: ["get-mobile-app-feedbacks"] },
);
