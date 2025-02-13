import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { defaultInternalPrefix } from "./lib/language";

const sections = new Set([
  "auth/signin",
  "auth/signup",
  "auth/forgot-password",
  "auth/reset-password",
  "auth/activate-account",
  "technologies",
  "courses",
  "admin",
]);

const sectionExists = (pathname: string): boolean => {
  return (
    pathname === "/en/" ||
    pathname === "/es/" ||
    [...sections].some(
      (section) =>
        pathname.startsWith(`/en/${section}/`) ||
        pathname.startsWith(`/es/${section}/`)
    )
  );
};

const userHasAccess = (pathname: string): boolean => {
  const token = cookies().get("token")?.value;
  const user = token ? (jwt.decode(token) as { role?: string }) : null;
  const isAdmin = user?.role === "admin";

  return !(pathname.startsWith("/en/admin/") && !isAdmin);
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const url = new URL(request.url);

  // Redirect restricted admin access
  if (pathname.startsWith("/es/admin") || pathname.startsWith("/en/")) {
    return NextResponse.rewrite(new URL("/en/page-not-found", url));
  }

  // Handle default language prefix (English)
  if (!pathname.startsWith("/es/")) {
    request.nextUrl.pathname = `/${defaultInternalPrefix}${pathname}`;

    if (
      !sectionExists(request.nextUrl.pathname) ||
      !userHasAccess(request.nextUrl.pathname)
    ) {
      return NextResponse.rewrite(new URL("/en/page-not-found", url));
    }

    return NextResponse.rewrite(request.nextUrl);
  }

  // Handle Spanish routes
  return sectionExists(pathname)
    ? NextResponse.next()
    : NextResponse.rewrite(new URL("/es/page-not-found", url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
