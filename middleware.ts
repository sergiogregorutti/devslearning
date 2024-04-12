import { NextRequest, NextResponse } from "next/server";
import {
  allowedLocales,
  defaultInternalPrefix,
  defaultLocale,
  getLocaleMetadata,
} from "./lib/language";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/en/")) {
    return NextResponse.rewrite(new URL("/en/not-found-page", request.url));
  }

  const hasValidPrefix = allowedLocales.some(
    (locale) =>
      locale !== defaultLocale &&
      request.nextUrl.pathname.startsWith(
        `/${getLocaleMetadata(locale).prefix}/`
      )
  );

  if (!hasValidPrefix) {
    request.nextUrl.pathname = `/${defaultInternalPrefix}${request.nextUrl.pathname}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  // do not localize next.js paths
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
