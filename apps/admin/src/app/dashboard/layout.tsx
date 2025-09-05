import { auth } from "@mm-app/auth/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Layout(props: LayoutProps<"/dashboard">) {
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
