"use server";

import { revalidatePath, revalidateTag } from "next/cache";

const tags = ["get-trading-centers", "get-assets", "get-app-stats"];

export const clearCacheOnly = async () => {
  for (const item of tags) {
    revalidateTag(item, "max");
  }
};

export const clearCacheRedirect = async () => {
  revalidatePath("/dashboard");
  revalidatePath("/");
};
