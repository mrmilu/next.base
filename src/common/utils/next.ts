/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export const middlewareGate = (req: NextRequest, next: boolean, redirectTo = "/404") => {
  const { name } = req.page;

  const notApi = !req.nextUrl.pathname.includes("graphql") || !req.nextUrl.pathname.includes("rest");
  const notPublicFile = !PUBLIC_FILE.test(req.nextUrl.pathname);
  if (notPublicFile && notApi && name) {
    if (next) {
      return NextResponse.next();
    } else {
      const url = req.nextUrl.clone();
      url.pathname = redirectTo;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};
