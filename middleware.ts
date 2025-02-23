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
  "about",
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

const userHasAccess = async (pathname: string): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const user = token ? (jwt.decode(token) as { role?: string }) : null;

  if (pathname.startsWith("/admin") && user?.role !== "admin") {
    return false;
  }

  return true;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = new URL(request.url);

  // Sitemap
  if (pathname.startsWith("/sitemap.xml")) {
    return NextResponse.next();
  }

  // Redirect restricted admin access
  if (pathname.startsWith("/es/admin") || pathname.startsWith("/en/")) {
    return NextResponse.rewrite(new URL("/en/page-not-found", url));
  }

  // Handle default language prefix (English)
  if (!pathname.startsWith("/es/")) {
    request.nextUrl.pathname = `/${defaultInternalPrefix}${pathname}`;

    const hasAccess = await userHasAccess(request.nextUrl.pathname);

    if (!sectionExists(request.nextUrl.pathname) || !hasAccess) {
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
