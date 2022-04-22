import type { NextRequest } from "next/server";
import { middlewareGate } from "@/src/common/utils/next";

export function middleware(req: NextRequest) {
  const loggedCookie = req.cookies["logged"];
  const isUserLogged = Boolean(loggedCookie) && loggedCookie === "true";
  return middlewareGate(req, isUserLogged, "/", { protectedRouteAccessAttempt: true });
}
