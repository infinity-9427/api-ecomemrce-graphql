import { clerkMiddleware } from "@clerk/nextjs/server";
import type { MiddlewareConfig } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "@/i18n/routing"


const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
});

export default clerkMiddleware((request) => {
  return intlMiddleware(request);
});

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next|static|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(es|en|pr|it|fr)/:path*",
  ],
};


