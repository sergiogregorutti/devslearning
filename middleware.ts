import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
import { defaultInternalPrefix } from "./lib/language";

const sections = [
  "auth/signin",
  "auth/signup",
  "auth/forgot-password",
  "auth/reset-password",
  "auth/activate-account",
  "categories",
  "admin",
];

const sectionExists = (pathname: string) => {
  let isValidSection = false;
  sections.forEach((section) => {
    if (
      pathname === "/en/" ||
      pathname === "/es/" ||
      pathname.startsWith(`/en/${section}/`) ||
      pathname.startsWith(`/es/${section}/`)
    ) {
      isValidSection = true;
    }
  });

  return isValidSection;
};

const userHasAccess = (pathname: string) => {
  let userHasAccess = true;
  let isAuth = false;
  let isAdmin = false;
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    isAuth = true;
    user = jwt.decode(token.value);

    if (user.role === "admin") {
      isAdmin = true;
    }
  }

  if (pathname.startsWith("/en/admin/") && !isAdmin) userHasAccess = false;

  return userHasAccess;
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/es/admin")) {
    return NextResponse.rewrite(new URL("/en/not-found-page", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/en/")) {
    return NextResponse.rewrite(new URL("/en/not-found-page", request.url));
  }

  // English routes
  if (!request.nextUrl.pathname.startsWith("/es/")) {
    request.nextUrl.pathname = `/${defaultInternalPrefix}${request.nextUrl.pathname}`;

    if (sectionExists(request.nextUrl.pathname)) {
      if (!userHasAccess(request.nextUrl.pathname)) {
        return NextResponse.rewrite(new URL("/en/not-found-page", request.url));
      } else {
        return NextResponse.rewrite(request.nextUrl);
      }
    } else {
      return NextResponse.rewrite(new URL("/en/not-found-page", request.url));
    }
  }

  if (sectionExists(request.nextUrl.pathname)) {
    return NextResponse.next();
  } else {
    return NextResponse.rewrite(new URL("/es/not-found-page", request.url));
  }
}

export const config = {
  // do not localize next.js paths
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
