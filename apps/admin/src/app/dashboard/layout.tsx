import { auth } from "@mm-app/auth/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function Laoyut(props: { children: ReactNode }) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    return notFound();
  }

  if (user.user.role !== "admin") {
    return notFound();
  }

  return <>{props.children}</>;
}
