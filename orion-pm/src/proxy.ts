import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (process.env.DEV_AUTH_BYPASS === "true") {
    return NextResponse.next();
  }

  // apenas verifica se existe cookie de sessão
  const hasSession =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token");

  if (isDashboardRoute && !hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
