import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { name } = req.page;

  const notApi = !req.nextUrl.pathname.includes("graphql") || !req.nextUrl.pathname.includes("rest");
  const notPublicFile = !PUBLIC_FILE.test(req.nextUrl.pathname);
  if (notPublicFile && notApi && name) {
    // Here do something
    const someCheck = true;
    if (someCheck) {
      return NextResponse.next();
    } else {
      const url = req.nextUrl.clone();
      url.pathname = "/404";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
