"use server";

import { cookies } from "next/headers";

export const setCurrentTD = async (td: string) => {
  const cookieStore = await cookies();

  cookieStore.set("agritrak-current-td", td);

  return td;
};

export const getCurrentTD = async () => {
  const cookieStore = await cookies();
  const td = cookieStore.get("agritrak-current-td");

  return td?.value || null;
};
