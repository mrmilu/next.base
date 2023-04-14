import type { NextRequest } from "next/server";
import { middlewareGate } from "@/src/common/utils/next";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dummy")) {
    const loggedCookie = req.cookies.get("logged")?.value;
    const isUserLogged = Boolean(loggedCookie) && loggedCookie === "true";
    return middlewareGate(req, isUserLogged, "/", { protectedRouteAccessAttempt: true });
  }
}

export const config = {
  matcher: [
    "/dummy",
    "/dummy_ssr",
  ]
}
