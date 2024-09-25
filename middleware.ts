import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { middlewareGate } from "@/src/shared/utils/next";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "@/src/shared/presentation/i18n";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"]
};

export function middleware(req: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: "en"
  });
  const response = handleI18nRouting(req);

  let gateResult: NextResponse | undefined;
  if (req.nextUrl.pathname.includes("/users")) {
    const loggedCookie = req.cookies.get("logged")?.value;
    const isUserLogged = Boolean(loggedCookie) && loggedCookie === "true";
    gateResult = middlewareGate(req, isUserLogged, "/", { protectedRouteAccessAttempt: true });
  }

  if (gateResult instanceof NextResponse) {
    return gateResult;
  }

  return response;
}
