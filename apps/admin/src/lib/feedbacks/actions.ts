"use server";

import { auth } from "@mm-app/auth/server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const refreshQueryFeedbacks = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    revalidateTag("get-assets", "max");
    revalidateTag("get-veggies", "max");
    return redirect("/");
  }

  revalidateTag("get-mobile-app-feedbacks", "max");

  return true;
};
