"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const clearCacheRedirect = async () => {
  const tags = [
    "get-all-veggies",
    "get-all-veggie-categories",
    "get-trading-centers",
    "get-assets",
    "get-app-stats",
  ];

  for (const item of tags) {
    revalidateTag(item);
  }

  revalidatePath("/");
};
