import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|favicon|site.webmanifest|apple-touch-icon.png|android-chrome).*)",
  ],
};
