import { auth } from "@mm-app/auth/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (request.nextUrl.pathname === "/") {
    if (session) {
      return NextResponse.redirect(
        new URL("/dashboard", process.env.BETTER_AUTH_URL!),
      );
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/", process.env.BETTER_AUTH_URL!));
    }

    if (request.nextUrl.pathname === "/dashboard/not-allowed") {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
