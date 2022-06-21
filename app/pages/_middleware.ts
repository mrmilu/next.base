import type { NextRequest } from "next/server";
import { middlewareGate } from "@/src/common/utils/next";

export function middleware(req: NextRequest) {
  return middlewareGate(req, true);
}
