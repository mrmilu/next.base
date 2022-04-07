import type { NextRequest } from "next/server";
import { middlewareGate } from "@/src/common/utils/next";
import type { NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  return middlewareGate(req, true);
}
