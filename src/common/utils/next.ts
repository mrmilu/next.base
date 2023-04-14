import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import queryString from "query-string";

export const middlewareGate = (req: NextRequest, next: boolean, redirectTo = "/404", queryParams?: Record<string, unknown>) => {
  if (next) {
    return NextResponse.next();
  } else {
    const url = req.nextUrl.clone();
    url.pathname = redirectTo;
    if (queryParams) url.search = queryString.stringify(queryParams);
    return NextResponse.redirect(url);
  }
};
